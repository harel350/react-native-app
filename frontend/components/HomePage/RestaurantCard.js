import React from 'react'
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import BoxDetails from '../UI/BoxDetails'



const RestautantCard = props => {
    const onPressHandle = () => {
        props.navigation.navigate('Restaurant',{data : props.data})
        
    }
    return (
        <BoxDetails style={styles.container}>
            <TouchableOpacity onPress={onPressHandle}>
                <View style={{borderBottomEndRadius:20 ,overflow:'hidden'}}>
                    <Image style={styles.image} source={{uri:`http://localhost:4000/${props.data.imagePath}`}} />
                </View>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{props.data === undefined ? 'BBBקינג בורגר ' : props.data.restaurantName}</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text>{props.data.distance}KM</Text>
                        <Text>|</Text>
                        <Text style={styles.address}>{props.data.restaurantAddress}</Text>
                    </View>
                </View>


            </TouchableOpacity>
        </BoxDetails>

    )
}
const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 200,
        backgroundColor: 'grey',
        paddingTop: 0,
        paddingBottom: 0,
        

    },
    detailsContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        

    },
    textContainer: {
        alignSelf: 'center',
        marginTop: -25,
        paddingBottom: 5
        

    },
    image: {
        height: '80%',
        width: '100%',
        


    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,

        textDecorationLine: 'underline'
    },
    address: {
        flexShrink: 1
    }
})
export default RestautantCard
