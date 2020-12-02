import React, { useRef, useState, useEffect } from 'react'
import { View, Button, Alert } from 'react-native'
import {useSelector } from 'react-redux'

import PhoneInput from 'react-native-phone-number-input'



const TelephoneInput = props => {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [callingCode, setCallingCode] = useState()
    const [validNumber, setValidNumber] = useState(false)
    const whoIsLogin = useSelector(state => state.form.whoIsLogin)
    const phoneInput = useRef()
    
    useEffect(() => {
        
        setValidNumber(phoneInput.current.isValidNumber())
    }, [phoneNumber])
    const onChangeText = (text) => {
        let callingCode = phoneInput.current.getCallingCode()
        setCallingCode(callingCode)
    }
    const onSubmit = () => {
        const dataFormRegister = props.navigation.getParam('dataFormRegister')
        let phoneNumberDetails = {
            number: phoneNumber,
            callingCode: callingCode,
            ...dataFormRegister
        }

        fetch(`http://localhost:4000/form/registration_${whoIsLogin}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(phoneNumberDetails)
        })
            .then(res => res.json())
            .then((result) => {
                result.Ok ? props.navigation.navigate('Login') : Alert.alert('error')
            })
            .catch(err => console.error(err))
    }
    return (
        <View>
                <PhoneInput
                    
                    defaultValue={phoneNumber}
                    defaultCode='IL'
                    ref={phoneInput}
                    onChangeText={(text) => {setPhoneNumber(text) }}
                    onChangeFormattedText={onChangeText}
                />
            <Button disabled={!validNumber} onPress={onSubmit} title='Send' />
        </View>
    )
}


export default TelephoneInput