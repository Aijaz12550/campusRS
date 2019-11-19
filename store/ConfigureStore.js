import {createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import AuthReducer from './reducers/AuthReducer'
const persistConfig = {
    key:'root',
    storage:AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, AuthReducer)

const configureStore = createStore( persistedReducer )
const persistore = persistStore(configureStore)

export { configureStore, persistore}