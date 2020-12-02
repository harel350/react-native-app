import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, UIManager } from 'react-native'
import ENV from '../../env.js'
import KeyBoardAvoid from '../UI/KeyBoardAvoid'
import IconForm from '../UI/IconForm'







const Input = props => {

    const [error, setError] = useState(false)
    const [targetComponent,setTarget] = useState()
    const [option, setOption] = useState([])
    const [placeholder, setPlaceholder] = useState(`please enter your's ${props.data.nameField} `)
    //return result for the input value(changeHandleAddress)
    const changeHandleAddress = async (value) => {
        props.change(props.data.nameField, value)
        const urlreq = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ENV.googleApiKey}&input=${value}&region=IL`
        const data = await fetch(urlreq)
        const result = await data.json()
        setOption(result.predictions)

    }
    //set the list after press and change the value(PressFromList)
    const PressFromList = (value) => {
        props.change(props.data.nameField, value)
        setOption([])
    }
    //Navigates between different cases of change value
    const changeHandle = (value) => {
        switch (props.data.formCode) {
            case 'address': {
                changeHandleAddress(value)
            }
            default: {
                props.change(props.data.nameField, value)
            }
        }
    }
    //check valid for new input and return message Error if not
    const validHandle = () => {
        if (!props.isError) {
            Alert.alert('ATTENTION', props.data.messageError, [{ text: 'close' }])
        }
    };

    return (
        <KeyBoardAvoid target={targetComponent} >
            <View style={styles.containerInput}>
                <IconForm iconName={props.data.iconName}  color={props.isError ? 'green' : 'red'} />
                <TextInput
                    onFocus={(e) => setTarget(e.nativeEvent.target)}
                    {...props}
                    underlineColorAndroid='black'
                    keyboardType={props.data.keyboard}
                    value={props.value}
                    placeholder={placeholder}
                    onChangeText={changeHandle}
                    onBlur={validHandle}

                />
                {
                    option.map((value) => {
                        return (
                            <Text key={value.description} onPress={() => { PressFromList(value.description) }}>
                                {value.description}
                            </Text>
                        )
                    })
                }
            </View>
        </KeyBoardAvoid>



    )

}
const styles = StyleSheet.create({
    containerInput: {
        borderWidth: 1,
        borderStartWidth: 5,
        borderEndWidth: 5,

        flexDirection: 'row',
        marginBottom: 35,
        marginHorizontal: 20,
    },
    
})

export default Input

