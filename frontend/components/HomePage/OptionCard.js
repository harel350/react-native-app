import React from 'react'
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from 'react-native'
import homepage_delivery from '../../assets/Image/homepage_delivery.jpg'
import homepage_savePlace from '../../assets/Image/homepage_savePlace.jpg'


const OptionCard = props => {
    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {props.navigation.navigate('OrderPlace')}}>
                    <ImageBackground source={homepage_savePlace} style={styles.image}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>הזמנת מקום</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => { console.log('f') }}>
                    <ImageBackground source={homepage_delivery} style={styles.image}>
                        <View style={styles.textContainer}>
                            <Text  style={styles.text}>משלוח/איסוף</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '95%',
        marginStart: '2.5%',
        marginTop: 5,
        overflow:'hidden'
        
        
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 30,
        letterSpacing: 3,
        color: 'red',
        
    },
    image:{
        resizeMode:'cover',
        width: '100%',
         height: 150
    }
})
export default OptionCard
