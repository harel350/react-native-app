import React from 'react'
import { View, StyleSheet } from 'react-native'



const BoxDetails = props => {
    return (
        <View {...props} style={{ ...styles.boxContainer, ...props.style }}>
            {props.children}
        </View>
    )
}
const styles = StyleSheet.create({
    boxContainer: {
        paddingBottom: 10,
        borderWidth: 1,
        borderRadius: 3,
        paddingTop: 50,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 3,
        elevation: 1,
        marginHorizontal: 2,
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20

    },
})

export default BoxDetails