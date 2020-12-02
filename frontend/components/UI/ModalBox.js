import React from 'react'
import { View, Modal,TouchableOpacity,Text, StyleSheet } from 'react-native'


const ModalBox = props => {

    return (
        <Modal {...props}>
            <View style={styles.modalContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={props.onClose} >
                        <Text style={{fontSize:20}}>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContainer} >
                    {props.children}
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex:1,
        alignSelf: 'center',
        justifyContent: 'center',
       backgroundColor:'grey'

    },
    buttonContainer: {
        padding: 5,
        marginEnd: 10,
        alignSelf: 'flex-end'
    }
})

export default ModalBox