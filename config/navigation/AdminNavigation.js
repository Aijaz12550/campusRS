import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import * as Routes from '../../screens/admin/AdminIndex'

const Home = createStackNavigator({
    Home:Routes.Home,
    // AllC:Routes.AllCompanies,
    // AllU:Routes.AllUsers,
    CompanyDetail:Routes.CompanyDetail,
})

const AllC = createStackNavigator({
      AllC :Routes.AllCompanies,
      CompanyDetail:Routes.CompanyDetail,
      
})

const AllU = createStackNavigator({
    AllU:Routes.AllUsers
})

const drawer = createDrawerNavigator({
    Home:{
        screen:Home,
        
    },
    AllC,
    AllU

    

},

{
    
    contentComponent:Routes.Drawer
}

)




export default createAppContainer(drawer)


// navigationOptions: ({navigation}) => ({
        //     drawerLockMode: 'locked-closed'
        //   })