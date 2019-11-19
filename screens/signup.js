import React , { Component } from 'react'
import {
View, TouchableOpacity, TextInput, StyleSheet, ScrollView, Dimensions,ProgressBarAndroid,StatusBar,Text, ToastAndroid, 
} from "react-native"
import { Picker, Icon, Toast } from 'native-base'
import ip from './ip'

class SignUp extends Component {
state={
    selected:null,
    name:null,
    email:null,
    password:null,
    loader:false
}
    static navigationOptions = {
        header: null,
        drawerLockMode: 'locked-closed',
        disableGestures: true,
        data:[],
      };
      componentDidMount(){
          this.setState({
              HEIGHT:Dimensions.get('window').height
          })
      }

      onValueChange(value) {
        this.setState({
          selected: value,selectedError:null
        });
      }

    //   form validation.....

    _name(v){
        if(v.length > 2){
            this.setState({name:v,nameError:null})
        }else{
            this.setState({nameError:'Name should be three characters long..'})
        }
    }

    _email(v){
         let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        let test = emailRegex.test(v)
        if(test){
            this.setState({email:v,emailError:null})
        }else{
            this.setState({emailError:"Please enter a correct email. like example@gmail.com"})
        }
    }

    _password(v){
        if(v.length > 5){
            this.setState({password:v,passwordError:null})
        }else{
            this.setState({passwordError:"Password should be 6 characters long."})
        }
    }

    _confirmPassword(v){
        let { password } = this.state
        if(v === password){
            this.setState({confirmPassword:v,confirmPasswordError:null})
        }else{
            this.setState({confirmPasswordError:"Password does't match."})
        }
    }

    _checkPost(){
        let { selected, name, email, password,confirmPassword } = this.state

        this.setState({loader:true})

        // error_sending
        let selectedError = selected?null:'Please select a category'
        let nameError     = name?null:'Please enter your name here.'
        let emailError    = email?null:'Please enter your email here.'
        let passwordError = password?null:'Please create a password.'
        let confirmPasswordError = confirmPassword?null:'Please confirm password.'

        this.setState({selectedError,nameError,emailError,passwordError,confirmPasswordError})


        if(selected && !selectedError && name && email && password && confirmPassword){
            
            this._signup()
        }else{
            this.setState({generalError:'Please fill the form correctly..',loader:false})
            setTimeout(()=>{
                this.setState({generalError:null})
            },5000)
        }
    }

    _signup(){
        console.log('chala')
        
        let {name,email,password,selected} = this.state
        

            fetch(`http://${ip}:3000/users/register`, {
                method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({name,email,password,type:selected})
}).then(user=>user.json())
.then(data=>{
    this.setState({loader:false})
  console.log('data~~~!!!~~~~~~!!!!~~~',data)
  if(data.result){
      ToastAndroid.showWithGravity('Congratulations You are successfully registerd.',ToastAndroid.SHORT,ToastAndroid.CENTER)
      
    //   Toast.show({ text: "Registration successful..",
    //           position: "top", type: "success"})

              setTimeout(()=>{
                  this.props.navigation.navigate('SignIn')
              },2000)
  }
  else if(data.message){
    this.setState({loader:false})
      this.setState({error:data.message})
  }
})


    }

render(){
let { selectedError,nameError,emailError,passwordError,confirmPasswordError, loader } = this.state;
    return(

<ScrollView centerContent={true} >
            <View style={[styles.container]}>
                <StatusBar backgroundColor="#ef5350" barStyle="light-content" />

            <Text style={{color:'white',fontSize:20,alignSelf:'center'}}>Sign Up</Text>

            <TextInput onChangeText={v=>this._name(v)} style={styles.input} placeholder="Name"/>
            {nameError && <Text style={styles.errorText}>{nameError}</Text>}

            <TextInput onChangeText={v=>this._email(v)} style={styles.input} placeholder="Email"/>
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}

            <TextInput onChangeText={v=>this._password(v)} style={styles.input} placeholder="Password" secureTextEntry/>
            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

            <TextInput onChangeText={v=>this._confirmPassword(v)} style={styles.input} placeholder=" Confirm Passwword" secureTextEntry />
            {confirmPasswordError && <Text  style={styles.errorText}>{confirmPasswordError}</Text>}


            <Picker
              mode="dropdown"
              iosHeader="Select your Category"
              iosIcon={<Icon name="arrow-down" />}
              style={[styles.input,{maxHeight:40,marginRight:10,borderRadius:20,borderWidth:2},(this.state.selected == "Select Category")?{color:"gray"}:{color:'black'}]}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
                <Picker.Item style={{color:'gray'}} label="Select Category" value="Select Category" />
              <Picker.Item label="Student" value="Student" />
              <Picker.Item label="Company" value="Company" />
              
            </Picker>
            {selectedError && <Text  style={styles.errorText}> {selectedError}</Text>}

               {loader && <ProgressBarAndroid  />}

            <TouchableOpacity onPress={()=>this._checkPost()} style={styles.btn}>
                <Text style={styles.btnText} >Submit</Text>
            </TouchableOpacity>

            <View style={{display:'flex',flexDirection:"row", justifyContent:'center',marginTop:40}}>
            <Text style={{color:'white',fontSize:15,alignSelf:'center',marginBottom:60}}>Already have an account? </Text>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignIn')}>
            <Text style={{color:'#ffcdd2',fontSize:18,alignSelf:'center',marginBottom:60,}}>Sign In</Text>
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
        height:40,
        marginTop:20,
        borderRadius:5,
        alignSelf:'center',
        fontSize:16,
        marginLeft:15,
        marginRight:15
    },
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
errorText:{
    color:'yellow',
    textAlign:'center'
}
})

export default SignUp;