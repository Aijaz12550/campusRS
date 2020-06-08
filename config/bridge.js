import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,ScrollView,
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
import { Add_User,Remove_User} from '../store/actions/index'
// _______________________________________............
import AdminNav from './navigation/AdminNavigation'
import CompanyNav from './navigation/CompanyNavigation'
import StudentNav from './navigation/StudentNavigation'
import AuthNav from './navigation/AuthNavigation'



 class Bridge extends Component {
    state={
        login:false,main:true
    }

     
// static getDerivedStateFromProps(props, state){
//     console.log(props,"~~props~~,,",state,"~~state~~")
//     return {
//         main:!state.main
//     }
// }




    render(){
        // this.props.r_u()
        let { login,main } = this.state
        let { user } = this.props
        let ShowThis = () =>(false ? AdminNav:(false?CompanyNav:StudentNav))
        return(
            <SafeAreaView style={{flex:1}}>
                
                {user && user.type === "Admin" && <AdminNav/>}
                {user && user.type === "Company" && <CompanyNav/> }
                {user && user.type === "Student" && <StudentNav/> }
                {!user && <AuthNav />}
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ef5350',
        justifyContent:'center'
    },
    modal:{
        margin:0,
        flex:1
    },
    btn:{
        backgroundColor:'white',
        height:60,
        margin:20,
        borderBottomEndRadius:30,
        borderTopStartRadius:30,
        justifyContent:'center',
        maxWidth:300,
        alignSelf:'center',
        width:'100%'
    },
    btnText:{
        alignSelf:'center',
        color:'#ef5350'
    },
    hd:{
        backgroundColor:'#ef5350',
        color:'white',
        // alignSelf:'center'
        textAlign:'center',
        paddingTop:30
    },
    scrl:{
        alignSelf:'center'
    }
})

const mapStateToProps = state =>{
    console.log('jhjh',state.AuthReducer.user)
    return{
        user : state.AuthReducer.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user)),
        r_u : ()=>dispatch(Remove_User())
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Bridge)