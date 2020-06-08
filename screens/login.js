import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Dimensions,ProgressBarAndroid,StatusBar, ActivityIndicator
} from "react-native"
import ip from './ip'
import { DrawerActions } from 'react-navigation-drawer';

import Modal from 'react-native-modal'
// redux
import { connect } from 'react-redux'
import { Add_User, Remove_User } from '../store/actions/index'

class Login extends Component {
state={
    
}
    static navigationOptions = {
        header: null,
        drawerLockMode: 'locked-closed',
        disableGestures: true,
        data:[],loader:false
      };
      componentDidMount(){
          this.setState({
              HEIGHT:Dimensions.get('window').height
          })
      }

      
    _signin(){
        console.log('chala')
        this.setState({loader:true})
        let { email,password } = this.state
        fetch(`https://pacific-shore-10571.herokuapp.com/users/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email,password })
      }).then(user=>user.json())
      .then(data=>{
        this.setState({loader:false})
          if(data.message){
              this.setState({error:data.message})
          }
          else if(data._id){
            this.setState({loader:false})
              console.log('>>>>>>>>>>>>>>',data)
              this.props.add_user(data)
            //   this.props.navigation.navigate('Home')
          }
      })
      }
      
render(){
console.log('login~~~this.props',this.props)
    return(

<ScrollView centerContent={true} >
            <View style={[styles.container]}>
                <StatusBar backgroundColor="#ef5350" barStyle="light-content" />
            

            <Text style={{color:'white',fontSize:20,alignSelf:'center'}}>Login</Text>

            <TextInput onChangeText={(v)=>this.setState({email:v})} style={styles.input} placeholder="Email"/>
            <TextInput onChangeText={(v)=>this.setState({password:v})} style={styles.input} placeholder="passwword" secureTextEntry />
            <TouchableOpacity onPress={()=>this._signin()} style={styles.btn}>
                { this.state.loader && <ActivityIndicator  />}
                { !this.state.loader && <Text style={styles.btnText} >Submit</Text>}
            </TouchableOpacity>

            <View style={{display:'flex',flexDirection:"row", justifyContent:'center',marginTop:40}}>
            <Text style={{color:'white',fontSize:15,alignSelf:'center',marginBottom:60}}>Don't have any acoount? </Text>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}>
            <Text style={{color:'#ffcdd2',fontSize:18,alignSelf:'center',marginBottom:60,}}>Sign Up</Text>
            </TouchableOpacity>
            </View>


        </View>
</ScrollView>

    )
}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ef5350',
        justifyContent:'center',
        height:Dimensions.get('window').height
    }, modal:{
        margin:0,
        flex:1
    },
    input:{
        backgroundColor:'white',
        width:300,
        height:45,
        margin:20,
        borderRadius:5,
        alignSelf:'center',
        fontSize:16,
    },
//     btn:{
// backgroundColor:'#ffcdd2',
// padding:10,
// width:150,
// alignSelf:'center',
// borderRadius:5,

//     },
//     btnText:{
//         color:'black',
//         alignSelf:'center'
//     }
btn:{
    backgroundColor:'white',
    height:40,
    margin:20,
    borderBottomEndRadius:30,
    borderTopStartRadius:30,
    justifyContent:'center',
    maxWidth:140,
    alignSelf:'center',
    width:'100%',
    marginTop:30
},
btnText:{
    alignSelf:'center',
    color:'#ef5350'
},
})
//  {"AuthReducer": {}, "CvReducer": {"cv": undefined}, "_persist": {"rehydrated": true, "version": -1}}
const mapStateToProps = state =>{
    console.log('---------------login',state)
    return{
        user : state.AuthReducer.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)