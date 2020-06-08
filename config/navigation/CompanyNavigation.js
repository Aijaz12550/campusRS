import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import * as Routes from '../../screens/company/CompanyIndex'



const Home = createStackNavigator({
     Home : Routes.Home,
     CompanyDetail:Routes.CompanyDetail,
     AddCompany : Routes.AddCompany,
     PostJob : Routes.PostJob,
     JobDetail:Routes.JobDetail,

})

const AddCompany = createStackNavigator({
    AddCompany : Routes.AddCompany
})

const PostJob = createStackNavigator({
    PostJob : Routes.PostJob
})
const drawer = createDrawerNavigator({
    Home:{
        screen:Home,
        
    },
    CompanyDetail:{
        screen:Routes.CompanyDetail,
    },
    AddCompany:{
        screen:AddCompany
    },
    PostJob:{
        screen:Routes.PostJob
    }

    

},

{
    
    contentComponent:Routes.Drawer
}

)




export default createAppContainer(drawer)