import React, { useState } from 'react'
import { View } from 'react-native'
import Form from '../../components/more/Form'
import {getFormField} from '../../helpFunction'
import CodeBox from '../../components/more/codeBox'
import { useSelector } from 'react-redux'
import ModalBox from '../../components/UI/ModalBox'



const RegistrationPage = props => {
    const [codeBoxDetails, setCodeBoxDetails] = useState({ Ok: false })


    const data = useSelector(state => state.form.form)
    const formData = getFormField('registration', data)

    const codeIsRightHandle = () => {
        props.navigation.navigate('RegistrationPhone',{dataFormRegister : codeBoxDetails.data})
        setCodeBoxDetails({ Ok: false })
    }
    const onCloseHandle = () => {
        setCodeBoxDetails({ Ok: false })
    }

    return (
        <>
            <View>

                <Form
                    formData={formData}
                    navigation={props.navigation}
                    api='mail/registEmail'
                    nextScreen='Registration'
                    screenName='Registration'
                    buttonName='Send'
                    onSubmit={(result) => { setCodeBoxDetails(result) }}
                />
                
                <ModalBox visible={codeBoxDetails.Ok} onRequestClose={onCloseHandle}>
                    <CodeBox
                        codeIsRight={codeIsRightHandle}
                        length={4}
                        expirationTime={codeBoxDetails.expirationTime}
                        verifyCode={codeBoxDetails.code}
                        toShow
                        platformName='email' />
                </ModalBox>


            </View>
        </>

    )
}

export default RegistrationPage