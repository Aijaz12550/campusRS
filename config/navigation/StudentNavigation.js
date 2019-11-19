import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import * as Routes from '../../screens/student/StudentIndex'


const Home = createStackNavigator({
    Home:Routes.Home
})
const MyJobs = createStackNavigator({
    MyJobs : Routes.MyJobs
})

const CV = createStackNavigator({
    CV : Routes.AddCv
})

const drawer = createDrawerNavigator({
    Home:{
        screen:Home,
       
    },
    MyJobs :{
        screen:MyJobs
    },
    CV:{
        screen:CV
    }

    
},

{
    
    contentComponent:Routes.Drawer
}

)




export default createAppContainer(drawer)