import {createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import AuthReducer from './reducers/AuthReducer'
import CvReducer from './reducers/cvReducer'
const persistConfig = {
    key:'root',
    storage:AsyncStorage
}

const root_r = combineReducers({AuthReducer,CvReducer})
const persistedReducer = persistReducer(persistConfig, root_r)

const configureStore = createStore( persistedReducer )
const persistore = persistStore(configureStore)

export { configureStore, persistore}