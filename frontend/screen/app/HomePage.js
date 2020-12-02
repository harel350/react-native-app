import React from 'react'
import { View, StyleSheet, Text, FlatList,I18nManager, Button } from 'react-native'
import OptionCard from '../../components/HomePage/OptionCard'
import RestaurantCard from '../../components/HomePage/RestaurantCard'
import { useSelector } from 'react-redux'


const HomePage = props => {
    const restaurant = useSelector(state => state.form.restaurant)
    
    return (
        <View style={{ flex: 1 }}>
            <OptionCard navigation={props.navigation} />
            <Text style={styles.text}>מסעדות מוצעות</Text>
            
            <FlatList
                horizontal
                inverted={false}
                initialNumToRender={2}
                data={restaurant}
                keyExtractor={item => (item.idRestaurant).toString()}
                renderItem={(itemData) => { return (<RestaurantCard navigation={props.navigation} data={itemData.item}  />) }}
            />
            

        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        letterSpacing: 3,
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default HomePage
