import React from 'react'
import { TouchableOpacity,Text, StyleSheet } from 'react-native'



const MyButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.5}  {...props}>
            <Text style={{...styles.text,...props.styleText}}>{props.title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    text : {
        textDecorationLine : 'underline',
        fontSize: 17,
    }
})

export default MyButton