import React, {  useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MyButton from '../UI/MyButton'



const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false)
    const { data } = props
    console.log(data.restaurantName)
    return (
        <View>
            <View style={styles.itemContainer}>
                {props.date && <Text>{data.dateOfOrder.slice(0, 10)}</Text>}
                {props.restaurantName && <Text>{data.restaurantName}</Text>}
                {props.totalPay && <Text>{data.totalPay}</Text>}
                <MyButton styleText={styles.button} onPress={() => { setShowDetails(prevState => !prevState) }} title='פרטים >' />

            </View>
            {
                showDetails &&
                <View style={styles.detailsContainer}>
                    <View style={styles.detailsItem} >
                        <Text>שעת הזמנה :</Text>
                        <Text>{data.hourOfOrder}</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Text>שעת סיום :</Text>
                        <Text>{data.hourOfFinish}</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Text>כמות אנשים :</Text>
                        <Text>{data.sumOfPeople}</Text>
                    </View>
                    <View style={styles.detailsItem}>
                        <Text>כמה עלה : </Text>
                        <Text>{data.totalPay}</Text>
                    </View>





                </View>
            }

        </View>
    )
}
const styles = StyleSheet.create({
    itemContainer: {
       paddingBottom:20,
        flexDirection: 'row-reverse',
        justifyContent: 'space-around'
    },
    button: {
        color: '#323388'
    },
    detailsContainer: {
        borderColor: 'black',
        borderWidth: 1
    },
    detailsItem: {
        padding: 4,
        marginLeft: 15,
        marginRight: 30,
       
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    }
})

export default OrderItem