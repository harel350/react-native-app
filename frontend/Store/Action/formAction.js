export const LOAD_FORM = 'LOAD_FORM'
export const LOAD_COUNTRY = 'LOAD_COUNTRY'
export const LOAD_RESTAURANT = 'LOAD_RESTAURANT'



export const loadForm = (whoIsLogin) => {
    return async dispatch => {
        const response = await fetch(`http://localhost:4000/form/${whoIsLogin}`)
        
        if (!response.ok) {
            console.error('err')
        }

        const resData = await response.json()
        console.log('this is res data : ',resData)
        dispatch({ type: LOAD_FORM, dataForm: resData,whoIsLogin })

    }
}
export const loadRestaurant= () => {
    return async dispatch => {
        const response = await fetch(`http://localhost:4000/info/restaurant`)
        
        if (!response.ok) {
            console.error('err')
        }

        const resData = await response.json()
        console.log('this is res data : ',resData)
        dispatch({ type: LOAD_RESTAURANT, dataRest: resData })

    }
}
export const loadCountry = () => {
    return async dispatch => {
        const response = await fetch('http://localhost:4000/form/loadCountry')

        if (!response.ok) {
            console.error('err')
        }

        const resData = await response.json()
        
        dispatch({ type: LOAD_COUNTRY, dataCountry: resData })

    }
}

