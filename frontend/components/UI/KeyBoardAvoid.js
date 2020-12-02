import React, { useState, useEffect } from 'react'
import {Dimensions, Keyboard, Animated, UIManager } from 'react-native'


const KeyBoardAvoid = props => {

    const [initalPositionY, setInitalPositionY] = useState(new Animated.Value(0))
    const [currentPageY, setCurrentPageY] = useState()


    const { target } = props
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', keyboardDidShowHandle)
        Keyboard.addListener('keyboardDidHide', keyboardDidHideHandle)
        return function cleanUp() {
            Keyboard.removeAllListeners('keyboardDidShow')
            Keyboard.removeAllListeners('keyboardDidHide')
        }
    }, [target])

    const keyboardDidShowHandle = (event) => {

        const heightScreen = Dimensions.get('window').height
        const heightKeyboard = event.endCoordinates.height

        if (target != undefined) {

            UIManager.measure(target, (x, y, width, height, pageX, pageY) => {
                let gap = ((heightScreen - heightKeyboard) - (pageY + height))
                if (gap >= 0) {
                    return;
                }
                Animated.timing(
                    initalPositionY,
                    {
                        toValue: gap - 50,
                        duration: 400,
                        useNativeDriver: true,
                    }
                ).start()
                setCurrentPageY(Math.abs(gap))

            })


        }
    }
    const keyboardDidHideHandle = (event) => {
        if (target != undefined) {

            Animated.timing(
                initalPositionY,
                {
                    toValue: currentPageY,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ).start()

        }
    }

    return (
        <Animated.View style={[{ transform: [{ translateY: initalPositionY }] }]}>
            {props.children}
        </Animated.View>
    )
}

export default KeyBoardAvoid