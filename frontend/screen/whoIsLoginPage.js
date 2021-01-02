import React, { useState } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { loadForm,loadRestaurant } from '../Store/Action/formAction'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'



const WhoIsloginPage = props => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
   /* const willFocusTest = props.navigation.addListener(
        'willFocus',
        payLoad =>{
            console.log('willFocusTest',payLoad)
        }
    )
    const didFocusTest = props.navigation.addListener(
        'didFocus',
        payLoad =>{
            console.log('didFocusTest',payLoad)
        }
    )
    const willBlurTest = props.navigation.addListener(
        'willBlur',
        payLoad =>{
            console.log('willBlur',payLoad)
        }
    )
    const didBlurTest = props.navigation.addListener(
        'didBlur',
        payLoad =>{
            console.log('didBlur',payLoad)
        }
    )*/
    const pressHandle = (whoIslogin) => {
        //Linking.openURL("waze://?{params}&navigate=yes")
        setLoading(true)
        //dispatch(loadForm(whoIslogin))
        dispatch(loadRestaurant())
        //props.navigation.openDrawer()
        
        
        //newTest.remove()
        props.navigation.navigate('Home',{test:'hello Home'})

    }
    return (
        <View style={styles.screenContainer} >

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Icon name='fast-food' color='brown' size={100} onPress={pressHandle.bind(this, 'customer')} />
                    <Text style={styles.text}>Customer</Text>
                </View>
                <View style={styles.button}>
                    <Icon name='restaurant' color='#aabbcc' size={100} onPress={pressHandle.bind(this, 'supplier')} />
                    <Text style={styles.text}> Supplier</Text>
                </View>



            </View>
           
            {loading && <ActivityIndicator size='large' />}

        </View>
    )
}
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,

        marginBottom: 100,
        justifyContent: 'center'

    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        

    },
    icon: {
        backgroundColor: 'red',
        height: 200,
        width: '60%'
    },
    button: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 20,

        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    text: {
        letterSpacing: 3,
        fontSize: 15
    }
})
export default WhoIsloginPage