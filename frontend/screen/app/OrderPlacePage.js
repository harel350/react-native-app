import React, { useState, useEffect } from 'react'
import { View, TextInput, Text, StyleSheet, Button, Alert, I18nManager } from 'react-native'
import TextIcon from '../../components/UI/TextIcon'
import BoxDetails from '../../components/UI/BoxDetails'
import Autocomplete from 'react-native-dropdown-autocomplete-textinput'
import AwesomeAlert from 'react-native-awesome-alerts'

const OrderPlacePage = (props) => {
    const [restaurantDetails, setrestaurantDetails] = useState({ restaurantName: '', restaurantAddress: 'לא נבחרה מסעדה', restaurantPhone: 'לא נבחרה מסעדה' })
    const [searchList, setSearchList] = useState([])//make searchComponent
    const [openList, setOpenList] = useState(false)//make searchComponent
    const [allFinishHour, setAllFinishHour] = useState([{ finishHour: '' }])//array of the available finish hour
    
    const [allFieldFull, setAllFieldFull] = useState(false)//check valid if all the field are full
    const [orderDetails, setOrderDetails] = useState({ date: null, startHour: null, finishHour: null, sumOfPeople: null })

    const [showSummary, setShowSummary] = useState(false)
    const hourMaping = (item, index) => {
        let hourstring = parseInt(item + index * 0.5)
        if (index % 2 == 0) {

            hourstring = hourstring.toString() + ':00'
        }
        else {
            hourstring = hourstring.toString() + ':30'
        }

        return hourstring
    }
    //initial state
    const allStartHour = new Array(24).fill(12).map((item, index) => { return { startHour: hourMaping(item, index) } })
    const peopleArray = new Array(14).fill(1).map((item, index) => { return { sumOfPeople: `${item + index * 1}` } })
    const dateArray = new Array(7).fill(null).map((item, index) => { return { date: new Date(new Date().getTime() + (24 * index) * 60 * 60 * 1000).toISOString().split('T')[0] } })




    useEffect(() => {
        const DataFromPickRestaurant = props.navigation.getParam('dataOfPickRestaurant')
        if (DataFromPickRestaurant != undefined) {
            setrestaurantDetails({
                restaurantName: DataFromPickRestaurant.restaurantName,
                restaurantAddress: DataFromPickRestaurant.restaurantAddress,
                restaurantPhone: DataFromPickRestaurant.restaurantPhone,
                tableOfSeats: DataFromPickRestaurant.tableOfSeats
            })
        }

    }, [])
    useEffect(() => {
        
        setAllFieldFull(false)
        const checkAllField = Object.values(orderDetails).find(item => item == null)
        if (checkAllField === undefined) {
            setAllFieldFull(true)
        }

    }, [orderDetails])


    const selectDateHandle = (dateValue) => {
        setOrderDetails({ ...orderDetails, ...dateValue })
    }
    const selectHourHandle = (hourValue) => {
        if (Object.keys(hourValue) == 'startHour') {
            let finishHourAvailable = new Array(24).fill(12).map((item, index) => { return { finishHour: hourMaping(item, index + 1) } })
            const hourSelectedIndex = finishHourAvailable.findIndex((item) => item.finishHour == hourValue.startHour)
            finishHourAvailable = finishHourAvailable.slice(hourSelectedIndex + 1)
            setAllFinishHour(finishHourAvailable)
        }
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
        setrestaurantDetails({ ...restaurantDetails, ...restaurantName })
        setOpenList(isOpen)
    }
    const searchPressHandle = async (text) => {
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
                result.Ok ? setShowSummary(true) : setShowSummary(false)
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
        setShowSummary(false)
    }
    const optionPlaceList = (<View style={styles.listContainer}>

        {
            openList && searchList.map((restOption, index) => {
                return (<Text style={styles.textDetails} onPress={searchPressHandle.bind(this, restOption)} key={index}>{restOption.restaurantName} - {restOption.restaurantAddress}</Text>)
            })
        }
    </View>)
    const summaryMessageAlert = (<View>
            <Text>בתאריך : {orderDetails.date}</Text>
            <Text>שעת התחלה : {orderDetails.startHour}</Text>
            <Text>שעת סיום : {orderDetails.finishHour}</Text>
            <Text>כמה אנשים : {orderDetails.sumOfPeople}</Text>
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
                <TextIcon size={30} text={restaurantDetails.restaurantAddress} iconName='location-outline' typeIcon='Ionicons' />
            </BoxDetails>
            <View>
                <View style={{ flexDirection: (I18nManager.isRTL ? 'row' : 'row-reverse') }}>
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
                <View style={{ flexDirection: (I18nManager.isRTL ? 'row' : 'row-reverse') }}>
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
            <Button title="בדוק שעה" disabled={!allFieldFull} onPress={checkHourButtonHandle} />
            <AwesomeAlert
                show={showSummary}
                title='סיכום הזמנה'
                message={summaryMessageAlert}
                closeOnTouchOutside={true}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText='שנה שעות'
                confirmText='הזמן'
                onCancelPressed={() => { setShowSummary(prevState => !prevState) }}
                onConfirmPressed={orderButtonHandle}
                contentContainerStyle={styles.content}
                contentStyle={styles.contentX}
                titleStyle={styles.title}
                messageStyle={styles.messageAlert}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    content:{
        //backgroundColor:'red',
        width:250
        
    },
    contentX:{
        //backgroundColor:'black',
       
    },
    title: {
        //backgroundColor:'yellow',
        fontSize: 25
    },
    
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



/**
 * {` 
              בתאריך :  ${orderDetails.date}         
              שעת התחלה : ${orderDetails.startHour}        
              שעת סיום : ${orderDetails.finishHour}       
              כמה אנשים : ${orderDetails.sumOfPeople}`}
 */




//showValue={showValuePeople ?? false}