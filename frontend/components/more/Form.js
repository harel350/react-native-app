import React, { useState, useEffect } from 'react'
import { View, Button, Alert, StyleSheet } from 'react-native'
import regEx from '../../regEx.js'
import Input from './Input'
import { useSelector } from 'react-redux'
import { checkID } from '../../helpFunction.js'




const Form = props => {


    useEffect(() => {
        setDataForm(stateForm())
        if (stateForm() != {} && stateForm() != undefined) { setIsLoading(true) }
    }, [props.formData])
    const whoIsLogin = useSelector(state => state.form.whoIsLogin)
    const [isLoading, setIsLoading] = useState(false)
    const [dataForm, setDataForm] = useState()
    const [submitOk, setSubmitOk] = useState(false)
    
    //Determine initial Form (stateForm())
    const stateForm = () => {
        const arrayForm = props.formData.reduce((acc, item) => {
            return {
                ...acc,
                [item.nameField]: {
                    value: '',
                    valid: false,
                }

            }
        }, {})

        return arrayForm
    }
    //check if new input is valid(validHandel())
    const validHandle = (currentValue, nameField) => {
        let isError = false;
        if(nameField === 'postalCode' && !regEx.postalCodeRegEx.test(currentValue)){
            isError=true;
        }
        if (nameField === 'privateCompanyNumber' && !checkID(currentValue)) {
            isError = true;
        }
        if (nameField === 'confirmPassword' && dataForm['password'].value !== currentValue) {

            isError = true;
        }
        if (nameField === 'email' && !regEx.emailRegEx.test(currentValue.toLowerCase())) {
            isError = true;
        }
        if (nameField === 'password' && !regEx.passwordRegEx.test(currentValue)) {
            isError = true;
        }

        return !isError
    };
    //check if all the inputs are valid, if yes turn on submit button (checkAllValid())
    const checkAllValid = (lastUpdate) => {
        for (var item in dataForm) {
            if (!dataForm[item].valid) {
                if (Object.keys(lastUpdate).toString() === item) {
                    if (!Object.values(lastUpdate)[0].valid) {
                        return false
                    }
                }
                else {
                    return false
                }
            }
        }
        return true
    }
    //set the dataForm state to the new value of input(changeTextHandel())
    const changeTextHandle = (name, value) => {

        const valid = validHandle(value, name)

        const lastUpdate = {
            [name]: {
                value,
                valid
            }
        }

        setDataForm({ ...dataForm, ...lastUpdate })
        setSubmitOk(checkAllValid(lastUpdate))
    }
    //send the data to server and return answer from there(submitHandel())
    console.log('DATA FORM:', dataForm)

    const submitHandle = () => {
        fetch(`http://localhost:4000/${props.api}/${whoIsLogin}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataForm)
        })
            .then(res => res.json())
            .then((result) => {
                result.Ok ? '' : Alert.alert(result.text)
                result.Ok ? props.navigation.navigate(props.nextScreen) : props.navigation.navigate(props.screenName)
                props.onSubmit ? props.onSubmit(result) : ''
            })
            .catch(err => console.error(err))

        setSubmitOk(false)
    }

    return (
        isLoading &&

        <View style={styles.formContainer}>

            <View>

                {
                    props.formData.map(item => {

                        return (

                            <Input
                                key={item.nameField}
                                value={dataForm[item.nameField] == undefined ? '' : dataForm[item.nameField].value}
                                data={item}
                                change={changeTextHandle}
                                isError={dataForm[item.nameField] == undefined ? '' : dataForm[item.nameField].valid}
                            />


                        )
                    })
                }

            </View>

            {!props.hideButton &&
                <View style={styles.buttonContainer}>
                    <Button title={props.buttonName || 'submit'} disabled={!submitOk} onPress={submitHandle} />
                </View>}
        </View>



    )
}
const styles = StyleSheet.create({
    formContainer: {
        marginTop: 7
    },
    buttonContainer: {
        width: '40%',
        alignSelf: 'center'
    }
})

export default Form

