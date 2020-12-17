import React,{useState,useEffect} from 'react'
import { View, StyleSheet,Linking} from 'react-native'
import TextIcon from '../UI/TextIcon'
import RestaurantButtonOption from './RestauranButtonOption'

const RestaurantGeneral = props => {
    const [generalDetails,setGeneralDetails] = useState({})
   
    useEffect(()=>{
        setGeneralDetails({...generalDetails,...{
            openingHour : props.data.restaurantOpeningHours[new Date().getDay()],
            address : props.data.restaurantAddress
        }})
    },[])
    const goToCellPhone = () => {
        Linking.openURL(`tel:${props.data.restaurantPhone}`)
    }
    const goToWeb = () => {
        Linking.openURL(props.data.restaurantWebsite)
    }
    const goToWaze = () => {
        const address =  encodeURI(`${generalDetails.address}`)
       
        Linking.openURL(`waze://?q=${address}&navigate=yes`)
    }
    
    return (
        <View>
            <View>
                <TextIcon size={30} text={generalDetails.openingHour} iconName='clock-outline' typeIcon='MaterialCommunityIcons'/>
                <TextIcon size={30} text={props.data.restaurantPhone} onPress={goToCellPhone} iconName='phone-in-talk-outline' typeIcon='MaterialCommunityIcons' />
                <TextIcon size={30} text={generalDetails.address} iconName='location-outline' typeIcon='Iconics' onPress={()=>{console.log('yes func')}} />
                <TextIcon size={30} text='נווט למסעדה' onPress={goToWaze} iconName='waze' typeIcon='MaterialCommunityIcons' />
                <TextIcon size={30} text='לאתר המסעדה' onPress={goToWeb} iconName='web' typeIcon='MaterialCommunityIcons' />
                <RestaurantButtonOption data={props.data} navigation={props.navigation}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default RestaurantGeneral