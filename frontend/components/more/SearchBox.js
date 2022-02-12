import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, FlatList,I18nManager } from 'react-native'
import { Overlay } from 'react-native-elements'
import TextIcon from '../UI/TextIcon'

const SearchBox = (props) => {
    const { initialValue, onPressItem } = props
    const [searchValue, setSearchValue] = useState(initialValue ?? '')
    const [listOfResult, setListOfResult] = useState([])
    const [showList, setShowList] = useState(false)


    const changeTextHandle = async (text) => {
        let isOpen = false
        if (text !== '') {
            const response = await fetch(`http://localhost:4000/info/searchRestaurant/${text}`)
            let searchListArray = await response.json()
            setListOfResult(searchListArray)
            isOpen = true

        }
        setShowList(isOpen)
        setSearchValue(text)
    }
    const onOpenSearch = () => {
        changeTextHandle(searchValue)
        setShowList(true)
    }
    const onPressItemFromList = (pressItem) => {
        onPressItem(pressItem)
        setSearchValue(pressItem.restaurantName)
        setShowList(false)
    }


    return (

        <View style={{backgroundColor:'green'}}>
                <TextIcon
                    onPress={onOpenSearch}
                    iconName='search'
                    typeIcon='FontAwesome'
                    text={searchValue == '' ? 'הכנס שם מסעדה' : searchValue}
                    style={styles.HeadLineContainer}
                    styleText={styles.textHeaderLine}
                    />


            <Overlay overlayStyle={styles.searchContainer} isVisible={showList} onBackdropPress={() => setShowList(false)}>
                <View >
                    <View style={styles.inputContainer}>
                        <TextInput
                            autoFocus={showList}
                            placeholder='הכנס שם מסעדה'
                            value={searchValue}
                            onChangeText={changeTextHandle}
                        />
                    </View>

                    <FlatList
                        style={styles.listContainer}
                        data={listOfResult}
                        keyExtractor={(item, inedx) => inedx.toString()}
                        renderItem={(restOption, index) => { return (<Text style={styles.textDetails} onPress={onPressItemFromList.bind(this, restOption.item)} key={index}>{restOption.item.restaurantName} - {restOption.item.restaurantAddress}</Text>) }}
                    />
                </View>
            </Overlay>

        </View>

    )
}

const styles = StyleSheet.create({
    HeadLineContainer: {
        backgroundColor:'#b7c1b9',
        alignItems:'center',
        paddingVertical: 10,
        marginHorizontal:4,
        marginVertical:5,
        borderBottomColor: 'black',
        borderRadius:10,
        textAlign:'right'
    },
    textHeaderLine:{
     
    },
    inputContainer: {
        paddingTop: 10,
        width: '100%',
        alignSelf: 'flex-end',
        borderBottomWidth: 1,
    },
    searchContainer: {
        width: '90%',
        height: '50%',
        borderRadius: 10
    },
    listContainer: {
        width: '100%',
        height: 100


    },
    textDetails: {

        padding: 10,
        color: 'black',
        borderBottomWidth: 0.3
    },
})

export default SearchBox

/**
 *
 * <View style={styles.inputContainer}>
                <TextInput
                    placeholder='הכנס שם מסעדה'
                    value={restaurantDetails.restaurantName}
                    onChangeText={changeTextHandle}
                />
            </View>
            {optionPlaceList}
 */