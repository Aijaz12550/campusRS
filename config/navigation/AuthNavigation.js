import React from 'react'
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import SignIn from '../../screens/login'
import SignUp from '../../screens/signup'


const Auth = createStackNavigator({
    SignIn:{screen:SignIn},
    SignUp:{screen:SignUp},
})

const drawer = createDrawerNavigator({
    Auth:{
        screen:Auth,
        navigationOptions: ({navigation}) => ({
            drawerLockMode: 'locked-closed'
          })
    },

    // Company:{screen:Company},

},

{
    
    // contentComponent:Routes.Drawer
}

)




export default createAppContainer(drawer)