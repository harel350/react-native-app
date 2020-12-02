import React from 'react'
import getFormField from '../../helpFunction'
import Form from '../../components/more/Form'
import { useSelector } from 'react-redux'


const PasswordRecoveryPage = props => {
    const data = useSelector(state => state.form.form)
    const formData = getFormField('passwordRecovery', data)
    return (
        <Form
        
            formData={formData}
            navigation={props.navigation}
            api='mail/passwordRecovery'
            buttonName='SEND'
            nextScreen='Login'
            screenName='PasswordRecovery'
        />
    )
}

export default PasswordRecoveryPage