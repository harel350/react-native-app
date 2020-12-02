import React from 'react'
import TelephoneInput from '../../components/more/TelephoneInput'
import { View} from 'react-native'




const RegistrationPhonePage = props => {
    
    return (
        <View >

            <TelephoneInput navigation={props.navigation} />
            
        </View>

    )
}
export default RegistrationPhonePage

