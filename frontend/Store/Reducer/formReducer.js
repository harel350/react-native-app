const { LOAD_FORM, LOAD_COUNTRY, LOAD_RESTAURANT } = require("../Action/formAction")

const initialState = {
    form : [],
    country : [],
    restaurant : [],
    whoIsLogin: null
}

const formReducer = (state = initialState, action) =>{

    switch (action.type) {
        case LOAD_FORM:{
            
            return {
                ...state,
                form : action.dataForm,
                whoIsLogin : action.whoIsLogin
                
            }
        }
        case LOAD_RESTAURANT : {
            return {
                ...state,
                restaurant : action.dataRest
            }
        }
        case LOAD_COUNTRY:{
            return {
                ...state,
                country : action.dataCountry
                
            }
        }
    
        default:
            return{
                ...state
            }
    }
}

export default formReducer