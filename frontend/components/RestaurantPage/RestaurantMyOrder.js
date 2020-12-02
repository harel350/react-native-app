import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import OrderItem from '../more/OrderItem'

const RestaurantMyOrder = props => {
    
    
   const data = props.orderData.filter((item)=> item.restaurantName == props.restaurantName)
    return (
        <View style={styles.container} >
            <View style={styles.itemContainer}>
                <Text style={styles.headLineText}>תאריך</Text>
                <Text style={styles.headLineText}>שם מסעדה</Text>
                <Text style={styles.headLineText}>מידע נוסף</Text>
            </View>
            <FlatList
                    
                    data={data}
                    keyExtractor={item => (item.orderId).toString()}
                    renderItem={(itemData) => { return (<OrderItem navigation={props.navigation} date restaurantName data={itemData.item} />) }}
                />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#dddead',
        height:500,
        maxHeight:'80%',
        borderWidth:1,
        borderBottomColor:'black',
        //borderBottomEndRadius:'10%'
        
        
    },
    itemContainer: {
       
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    headLineText: {
        padding: 10,
        fontSize: 20,
    },
    detailsItem: {
        padding: 4,
        marginLeft: 15,
        marginRight: 30,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    }
})
export default RestaurantMyOrder

/*

          
*/