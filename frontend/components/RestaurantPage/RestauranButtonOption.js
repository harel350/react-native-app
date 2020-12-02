import React from 'react'
import { View, StyleSheet,I18nManager } from 'react-native'
import MyButton from '../UI/MyButton'
const RestaurantButtonOption = props => {
    const {takeAway,orderTable,delivery} = props.data
    console.log(takeAway,orderTable,delivery)
    return (
        <View style={styles.container}>
            <MyButton style={styles.button} onPress={()=>{props.navigation.navigate('OrderPlace',{dataOfPickRestaurant : props.data})}} disabled={!orderTable} styleText={styles.text} title='הזמן שולחן'/>
            <MyButton style={styles.button} disabled={takeAway} styleText={styles.text} title='איסוף עצמי'/>
            <MyButton style={styles.button} disabled={!delivery} styleText={styles.text} title='משלוח'/>
        </View>
    )
        }
const styles = StyleSheet.create({
    container: {
        flexDirection: (I18nManager.isRTL ? 'row' : 'row-reverse'),
        justifyContent: 'space-between',
        marginHorizontal: 20,
        
        paddingVertical: 10
    },
    button:{
        backgroundColor:'#6291fe',
        padding:20,
        borderRadius:50,
        marginHorizontal:5
    },
    text : {
        color:'white',
        textDecorationLine:'none'
    }
    
})
export default RestaurantButtonOption

