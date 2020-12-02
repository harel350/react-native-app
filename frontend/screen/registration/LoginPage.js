import React from 'react'
import { View, StyleSheet } from 'react-native'
import Form from '../../components/more/Form'
import { useSelector } from 'react-redux'
import {getFormField} from '../../helpFunction'
import BoxDetails from '../../components/UI/BoxDetails'
import MyButton from '../../components/UI/MyButton'




const LoginPage = props => {
    
    const data = useSelector(state => state.form.form)
    const formData = getFormField('login', data)
    
    return (
        <>
            <BoxDetails style={styles.boxContainer}>
                <Form
                    formData={formData}
                    navigation={props.navigation}
                    api='form/login'
                    buttonName='LOGIN'
                    nextScreen='PasswordRecovery'
                    screenName='Login' />
                <View style={styles.buttonContainer}>
                    <MyButton title="sign - in" onPress={() => props.navigation.navigate('Registration')} />
                    <MyButton title='forget-password' onPress={() => props.navigation.navigate('PasswordRecovery')} />
                </View>
            </BoxDetails>
        </>
    )

}

const styles = StyleSheet.create({

    boxContainer: {
        width: '90%',
        marginTop: 150,
        alignSelf: 'center',

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
        marginHorizontal: 10
    }
})

export default LoginPage

/* */