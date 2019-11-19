import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import * as Routes from '../../screens/admin/AdminIndex'

const Home = createStackNavigator({
    Home:Routes.Home
})

const drawer = createDrawerNavigator({
    Home:{
        screen:Home,
        // navigationOptions: ({navigation}) => ({
        //     drawerLockMode: 'locked-closed'
        //   })
    },

    

},

{
    
    contentComponent:Routes.Drawer
}

)




export default createAppContainer(drawer)