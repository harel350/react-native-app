import React, { useState, useRef, createRef, useEffect } from 'react'
import { View, Button, TextInput, Text, StyleSheet, KeyboardAvoidingView, Alert, I18nManager } from 'react-native'


const CodeBox = props => {
    //hold the number that user enter
    const [codeNumber, setCodeNumber] = useState(new Array(props.length).fill(''))
    //set the length of the code
    const lengthOfCode = new Array(props.length).fill(0)
    //set array of ref - that each ref pointer to other text input element
    const inputRef = useRef(lengthOfCode.map(() => createRef()));
    //make a focus to the first text input
    useEffect(() => {
        inputRef.current[0].current.focus();
    })

    console.log(props.verifyCode)

    const onChangeHandle = (index, value) => {
        const newNumber = codeNumber
        newNumber[index] = value

        if (value.length == 0) {
            index = index - 1
        }
        if (props.length - 1 == index) {
            index = -1
        }
        inputRef.current[index + 1].current.focus();

        setCodeNumber(newNumber)
    }
    //return false if time is expiration, else return true
    const expirationTimeCheck = () => {
        let createCodeTime = props.expirationTime
        let currentTime = new Date().getTime()
        let leftTime = parseInt(Math.abs(createCodeTime - currentTime) / 60000)
        console.log(leftTime)
        if (leftTime >= 5) {
            return false
        }
        return true
    }
    const onPressHandle = () => {
        let codeIsOk = props.verifyCode.toString()

        if (expirationTimeCheck()) {
            if (codeIsOk === codeNumber.join('')) {
                props.codeIsRight()
            }
            else {
                Alert.alert('Wrong code', "Your's code isn't right, please try again", [{ text: 'OK' }])

            }
        }
        else {
            Alert.alert('Time out', "Your's code isn't valid, please enter your email again and we send you a new code", [{ text: 'OK' }])
            let index = 0;
            while (index < props.length) {
                inputRef.current[index].current.clear();
                index++;

            }
        }

    }

    return (
        props.toShow &&
        <KeyboardAvoidingView behavior='height'>
            <View>
                <View style={styles.text}>
                    <Text style={{ fontSize: 24 }}>WE Send you code to your {props.platformName || ' '} please enter the code below</Text>
                </View>
                <View style={{ ...styles.textInputContainer, ...{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' } }}>
                    {
                        lengthOfCode.map((x, index) => {
                            return (
                                <TextInput
                                    selectTextOnFocus
                                    style={styles.textInput}
                                    key={index}
                                    ref={inputRef.current[index]}
                                    onChangeText={(value) => { onChangeHandle(index, value) }}
                                    keyboardType='number-pad'
                                    maxLength={1} />
                            )
                        })
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='OK' onPress={onPressHandle} />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    textInputContainer: {
        justifyContent: 'space-around',
    },
    textInput: {
        borderBottomWidth: 3
    },
    text: {
        padding: 20,
    },
    buttonContainer: {
        width: '50%',
        marginTop: 70,
        backgroundColor: 'red',
        alignSelf: 'center',
    }
})

export default CodeBox