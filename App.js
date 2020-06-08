
import React, { useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Bridge from './config/bridge'
import SplashScreen from 'react-native-splash-screen'
import { Provider as PaperProvider } from 'react-native-paper';

import { Colors } from 'react-native/Libraries/NewAppScreen';


const App =()=>  {
 
  // splashscreen
useEffect( ()=> {
  SplashScreen.hide();
},[])

    return (
    <PaperProvider>
    <StatusBar backgroundColor="#ef5350" barStyle="light-content" />
<Bridge/>
    </PaperProvider>
    

  );
};


const styles = StyleSheet.create({
  
});

export default App;
