import React from 'react'
import { View, StyleSheet } from 'react-native'
import Triangle from 'react-native-triangle'
import Icon from 'react-native-vector-icons/Ionicons'



const IconForm = props => {
    const backgroundColor = {
        backgroundColor: props.color
    }
    return (
        <View style={{ ...styles.iconFormContainer, ...backgroundColor,...props.style }}>
            <Icon name={props.iconName ?? 'md-person'} size={props.size ??40} style={{ ...styles.icon, ...props.style }} />
            
               
                <View style={styles.triangle}>
                    <Triangle width={10} height={25} color={props.color} direction='right' />
                </View>
          

        </View>
    )
}
const styles = StyleSheet.create({
    iconFormContainer: {
        marginEnd: 20,
        height: 50,
        width: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    triangle: {
        position: 'absolute',
        zIndex: -1,
        alignSelf: 'center',
        marginStart: 45
    },
    icon: {
        alignSelf: 'center'
    }
})

export default IconForm

