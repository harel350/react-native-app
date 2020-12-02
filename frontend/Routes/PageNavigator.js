import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
//screen
import LoginPage from '../screen/registration/LoginPage'
import PasswordRecoveryPage from '../screen/settings/PasswordRecoveryPage'
import RegistrationPage from '../screen/registration/RegistrationPage'
import RegistrationPhonePage from '../screen/registration/RegistrationPhonePage'
import WhoIsLoginPage from '../screen/whoIsLoginPage'
import HomePage from '../screen/app/HomePage'
import RestaurantPage from '../screen/app/RestaurantPage'
import OrderPlacePage from '../screen/app/OrderPlacePage'
import TextIcon from '../components/UI/TextIcon'






const AppNavigator = createStackNavigator({
    WhoIsLogin: WhoIsLoginPage,
    OrderPlace: OrderPlacePage,
    Home: HomePage,
    Restaurant: RestaurantPage,

}, {
    defaultNavigationOptions: {


        header: (({ scene, previous, navigation }) => {
            console.log('the scene', scene)
            console.log('the previous', previous)
            console.log('the navigation', navigation)
            return (
                <TextIcon
                iconName='navicon' 
                typeIcon='FontAwesome' 
                text={scene.route.routeName} 
                size={30} 
                onPress={()=>{navigation.openDrawer()}}/>
             
            )
        }),

    }
})
const RegisterNavigator = createStackNavigator({
    Login: LoginPage,
    RegistrationPhone: RegistrationPhonePage,
    Registration: RegistrationPage,
    PasswordRecovery: PasswordRecoveryPage,
    PasswordRecovery: PasswordRecoveryPage,

}
)
const MainNavigator = createDrawerNavigator({
    App: AppNavigator,
    Register: RegisterNavigator
}, {
    initialRouteName: 'App',
    drawerType: 'front'
})

export default createAppContainer(MainNavigator)