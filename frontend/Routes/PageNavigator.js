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
import Icon from 'react-native-vector-icons/FontAwesome'
import TextIcon from '../components/UI/TextIcon'

import { View, Text } from 'react-native'





const defaultStackNavigatorOptions = {

    headerStyle: {
        headerContainer: {
            height: 65,
            borderBottomWidth: 1,
            marginHorizontal: 5,
            borderBottomColor: 'black',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        iconStyle: {
            backgroundColor: 'green'
        },
        textIconStyle: {
            flexDirection: 'row-reverse',
            marginHorizontal: 0,
            paddingHorizontal: 0,
            paddingVertical: 0,
            backgroundColor: 'green'
        },
        textIconTextStyle: {
            fontWeight: 'normal',
            fontSize: 10,
            alignSelf: 'center'
        }


    },

    header: (({ scene, previous, navigation }) => {
        const { options } = scene.descriptor
        const title = options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
                ? options.title
                : scene.route.routeName;
        const styles = scene.descriptor.options.headerStyle
        return (
            <View style={styles.headerContainer}>
                {!navigation.isFirstRouteInParent() ?
                    <TextIcon
                        style={styles.textIconStyle}
                        styleText={styles.textIconTextStyle}
                        text={previous.route.routeName}
                        typeIcon='Ionicons'
                        size={30}
                        iconName='arrow-forward-outline'
                        onPress={() => navigation.goBack()} />
                    :
                    <View />}
                <View style={{ backgroundColor: 'red' }}>
                    <Text>{title}</Text>
                </View>
                <Icon name='navicon' size={30} onPress={() => { navigation.openDrawer() }} />
            </View>

        )
    })
}

const AppNavigator = createStackNavigator({
    WhoIsLogin: WhoIsLoginPage,
    OrderPlace: OrderPlacePage,
    Home: { screen: HomePage },
    Restaurant: RestaurantPage,

}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
}

)
const RegisterNavigator = createStackNavigator({
    Login: LoginPage,
    RegistrationPhone: RegistrationPhonePage,
    Registration: RegistrationPage,
    PasswordRecovery: PasswordRecoveryPage,
    PasswordRecovery: PasswordRecoveryPage,

},
    {
        defaultNavigationOptions: defaultStackNavigatorOptions
    }
)
const MainNavigator = createDrawerNavigator({
    App: AppNavigator,
    Register: RegisterNavigator
}, {
    initialRouteName: 'App',
    drawerPosition: 'right',
    drawerType: 'front',

})

export default createAppContainer(MainNavigator)


