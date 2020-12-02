import React, { useState, useEffect } from 'react'
import { View, TextInput, Text } from 'react-native'
import ENV from '../../env.js'

const Address = props => {

    const [destination, setDestination] = useState('')
    const [option, setOption] = useState([])
    


    const changeHandle = async (value) => {
        setDestination(value)
        const urlreq = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${ENV.googleApiKey}&input=${value}`
        const data = await fetch(urlreq)
        const result = await data.json()
        setOption(result.predictions)
        
    }
    return (
        <View>
            <TextInput underlineColorAndroid='black' placeholder='place' value={destination} onChangeText={changeHandle}    />
            {
                option.map((value) => {
                    return (
                        <Text key={value.description} onPress={() => { setDestination(value.description) }}>
                            {value.description}
                        </Text>
                    )
                })
            }
        </View>
    );
}

export default Address