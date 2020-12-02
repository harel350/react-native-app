import React from 'react'
import PageNavigation from './Routes/PageNavigator'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import formReducer from './Store/Reducer/formReducer'



const rootReducer = combineReducers({
  form : formReducer,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  
  return (
    <Provider store={store}>
      <PageNavigation />
    </Provider>

  )
}

