import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/EvilIcons'
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'


const TextIcon = props => {
    let icon=<></>;
    if (props.typeIcon == 'Ionicons') {
        icon = <Icon1 {...props} name={props.iconName} />
    }

    if (props.typeIcon == 'FontAwesome') {
        icon = <Icon2 {...props} name={props.iconName} />
    }
    if(props.typeIcon == 'EvilIcons'){
        icon = <Icon3 {...props} name={props.iconName}/>
    }
    if(props.typeIcon == 'MaterialCommunityIcons'){
        icon = <Icon4 {...props} name={props.iconName}/>
    }

    return (
        <TouchableOpacity onPress={props.onPress ?? (() => { })} >
            <View style={styles.cotainer}>
                <Text style={styles.text}>{props.text ?? ''}</Text>
                {icon}
            </View>
        </TouchableOpacity >
    )
}
const styles = StyleSheet.create({
    cotainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    text: {
        fontWeight: 'bold',

    }
})
export default TextIcon