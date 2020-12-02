import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, StyleSheet, Button, Alert } from 'react-native'
import TextIcon from '../../components/UI/TextIcon'
import BoxDetails from '../../components/UI/BoxDetails'
import Autocomplete from 'react-native-dropdown-autocomplete-textinput'

const OrderPlacePage = (props) => {
    const [restaurantDetails, setrestaurantDetails] = useState({ restaurantName: '', restaurantAddress: 'לא נבחרה מסעדה', restaurantPhone: 'לא נבחרה מסעדה' })
    const [searchList, setSearchList] = useState([])
    const [openList, setOpenList] = useState(false)
    const [showSummary, setShowSummary] = useState(false)
    const [orderDetails, setOrderDetails] = useState({ date: null, startHour: null, finishHour: null, sumOfPeople: null })
    const hourMaping = (item, index) => {
        let hourstring =parseInt(item + index * 0.5)
        if (index % 2 == 0) {

            hourstring = hourstring.toString() + ':00'
        }
        else {
            hourstring = hourstring.toString() + ':30'
        }
       
        return hourstring
       
    }
    const allStartHour = new Array(24).fill(12).map((item, index) =>{return {startHour : hourMaping(item, index)}})
    const allFinishHour = new Array(24).fill(12).map((item, index) => { return { finishHour: hourMaping(item, index+1)} })
    const peopleArray = new Array(14).fill(1).map((item, index) => { return { sumOfPeople: `${item + index * 1}` } })
    const dateArray = new Array(7).fill(null).map((item, index) => { return { date: new Date(new Date().getTime() + (24 * index) * 60 * 60 * 1000).toISOString().split('T')[0] } })
    
    


    useEffect(() => {
        

        const DataFromPickRestaurant = props.navigation.getParam('dataOfPickRestaurant')
        if (DataFromPickRestaurant != undefined) {
            setrestaurantDetails({
                restaurantName: DataFromPickRestaurant.restaurantName,
                restaurantAddress: DataFromPickRestaurant.restaurantAddress,
                restaurantPhone: DataFromPickRestaurant.restaurantPhone,
                tableOfSeats : DataFromPickRestaurant.tableOfSeats
            })
        }

    }, [])
    useEffect(() => {
        setShowSummary(false)
        const test = Object.values(orderDetails).find(item => item == null)
        if (test === undefined) {
            setShowSummary(true)
        }

    }, [orderDetails])


    const selectDateHandle = (dateValue) => {
        setOrderDetails({ ...orderDetails, ...dateValue })
    }
    const selectHourHandle = (hourValue) => {
        setOrderDetails({ ...orderDetails, ...hourValue })
        setShowSummary(false)
    }
    const selectPeopleHandle = (peopleValue) => {
        setOrderDetails({ ...orderDetails, ...peopleValue })
        setShowSummary(false)
    }
    const changeTextHandle = async (text) => {

        let isOpen = false
        if (text != '') {

            const response = await fetch(`http://localhost:4000/info/searchRestaurant/${text}`)
            let searchListArray = await response.json()
            setSearchList(searchListArray)
            isOpen = true

        }

        let restaurantName = { restaurantName: text }
        let newInput = { ...restaurantDetails, ...restaurantName }
        setrestaurantDetails(newInput)
        setOpenList(isOpen)
    }
    const searchPressHandle = async (text) => {
        /*console.log('the press text:', text.restaurantName)
        const response = await fetch(`http://localhost:4000/orderTable/getAvailableHour/${text.restaurantName}`)
        const resData = await response.json()

        console.log(resData)*/
        setrestaurantDetails(text)
        setOpenList(false)
    }
    const checkHourButtonHandle = () => {

        fetch(`http://localhost:4000/orderTable/getAvailableHour/${restaurantDetails.restaurantName}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...orderDetails, ...{ tableData: restaurantDetails.tableOfSeats } })
        })
            .then((result) => result.json())
            .then((result) => {
                const tablePerHour = { tablePerHour: result.tablePerHour }
                setOrderDetails({ ...orderDetails, ...tablePerHour })
                result.Ok ? Alert.alert('sucess', result.text, [{ text: 'ok' }]) : Alert.alert('Attention', result.text, [{ text: 'ok' }])
            })
    }
    const orderButtonHandle = () => {

        fetch(`http://localhost:4000/orderTable/newOrder/${restaurantDetails.restaurantName}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetails)
        })
    }
    const optionPlaceList = (<View style={styles.listContainer}>
        {
            openList && searchList.map((restOption, index) => {
                return (<Text style={styles.textDetails} onPress={searchPressHandle.bind(this, restOption)} key={index}>{restOption.restaurantName} - {restOption.restaurantAddress}</Text>)
            })
        }
    </View>)


    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='הכנס שם מסעדה'
                    value={restaurantDetails.restaurantName}
                    onChangeText={changeTextHandle}
                />
            </View>
            {optionPlaceList}
            <BoxDetails style={styles.box}>
                <TextIcon size={30} text={restaurantDetails.restaurantPhone} iconName='call' typeIcon='Ionicons' />
                <TextIcon size={30} text={restaurantDetails.restaurantAddress} iconName='call' typeIcon='Ionicons' />
            </BoxDetails>
            <View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <Autocomplete
                        data={dateArray}
                        displayKey="date"
                        onSelect={selectDateHandle}
                        placeholder='תאריך'
                        floatBottom
                        isMandatory
                        textInputStyle={{ width: '48%' }}
                    />
                    <Autocomplete
                        data={peopleArray}
                        displayKey="sumOfPeople"
                        onSelect={selectPeopleHandle}
                        placeholder='כמות אנשים'
                        textInputStyle={{ width: '48%' }}
                        floatBottom
                        isMandatory
                    />
                </View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <Autocomplete
                        data={allStartHour}
                        displayKey="startHour"
                        onSelect={selectHourHandle}
                        placeholder='שעת התחלה'
                        floatBottom
                        isMandatory
                        textInputStyle={{ width: '48%' }}
                    />
                    <Autocomplete
                        data={allFinishHour}
                        displayKey="finishHour"
                        onSelect={selectHourHandle}
                        placeholder='שעת סיום'
                        floatBottom
                        isMandatory
                        textInputStyle={{ width: '48%' }}
                    />
                </View>
            </View>
            <Button title="בדוק שעה" disabled={!showSummary} onPress={checkHourButtonHandle} />
            {showSummary &&
                <View>
                    <Text>סיכום ההזמנה</Text>
                    <Text>בתאריך :  {orderDetails.date} </Text>
                    <Text>בשעה :  {orderDetails.finishHour} </Text>
                    <Text>בשעה :  {orderDetails.startHour} </Text>
                    <Text>כמות אנשים :  {orderDetails.sumOfPeople} </Text>
                    <Button title='הזמן' onPress={orderButtonHandle} />
                </View>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 10,
        width: '90%',
        alignSelf: 'flex-end',
        borderBottomWidth: 1,
    },
    box: {
        paddingTop: 20,
    },
    textDetails: {
        padding: 10
    },
    listContainer: {
        transform: [{ translateY: 60 }],
        width: '100%',
        zIndex: 2,
        backgroundColor: 'white',
        position: 'absolute',

    }
})
export default OrderPlacePage









//showValue={showValuePeople ?? false}