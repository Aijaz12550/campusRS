/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// Redux...
// Redux...
import { Provider } from 'react-redux'
import { configureStore, persistore } from './store/ConfigureStore'
import { PersistGate } from 'redux-persist/integration/react'



// const store = configureStore
const RNRedux = () => (
    <Provider store={configureStore}>
        <PersistGate loading={null} persistor={persistore}>
    <App/>
        </PersistGate>
    </Provider>
    )

AppRegistry.registerComponent(appName, () => RNRedux );
