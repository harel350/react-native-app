import React, { useState, useCallback, useEffect } from 'react'
import { View, StyleSheet, ImageBackground,I18nManager } from 'react-native'
import RestaurantGeneral from '../../components/RestaurantPage/RestaurantGeneral'
import RestaurantMyOrder from '../../components/RestaurantPage/RestaurantMyOrder'
import RestaurantFeedback from '../../components/RestaurantPage/RestaurantFeedback'
import MyButton from '../../components/UI/MyButton'

const RestaurantPage = props => {
    const [chooseOption, setChooseOption] = useState('general')
    const [myOrderData, setMyOrderData] = useState([])
    const data = props.navigation.getParam('data')
    let showOptionPress
    if (chooseOption == 'general') {
        showOptionPress = <RestaurantGeneral navigation={props.navigation} data={data} />
    }
    if (chooseOption == 'myOrder') {
        showOptionPress = <RestaurantMyOrder navigation={props.navigation} restaurantName={data.restaurantName} orderData={myOrderData} />
    }
    if (chooseOption == 'feedback') {
        showOptionPress = <RestaurantFeedback />
    }
    const chooseOptionHandle = useCallback(async (choosePress) => {
        setChooseOption(choosePress)
        if (choosePress == 'myOrder') {
            const response = await fetch('http://localhost:4000/info/myOrder')
            const resData = await response.json()
            setMyOrderData(resData)
        }

    }, [])


    return (
        <View>
            <ImageBackground source={{ uri: `http://localhost:4000/${data.imagePath}` }} style={styles.image} />

            <View>
                <View style={styles.optionContainer}>
                    <MyButton  onPress={chooseOptionHandle.bind(this, 'general')} title='כללי' />
                    <MyButton  onPress={chooseOptionHandle.bind(this, 'myOrder')} title='ההזמנות שלי' />
                    <MyButton  onPress={chooseOptionHandle.bind(this, 'feedback')} title='חוות דעה' />
                </View>
                {showOptionPress}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    optionContainer: {
        
        flexDirection:(I18nManager.isRTL ? 'row' : 'row-reverse'),
        justifyContent: 'space-between',
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        
    },
    image: {
        width: '100%',
        height: 170
    }
})
export default RestaurantPage
