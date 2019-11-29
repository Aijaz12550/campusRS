import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar,DatePickerAndroid
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User} from '../../store/actions/index'
import { Picker, Icon } from 'native-base'
import ip from '../ip'



 class My_CV extends Component {
     
    state={
        login:false,main:true,
        WIDTH:300,
        personalDetail:false,
        educationalDetail:false,
        desL:0,

        pd:false,

        year:null,month:null,day:null,

        degree:null,

        experience:[],index:0, duration:null,designation:null,organization:null,
        
        skills:null,
    }


    constructor(props){
        super(props);
        Dimensions.addEventListener('change',(dims)=>{
            this.setState({
                WIDTH:Dimensions.get('window').width > 500 ? 500 :300
            })
        })
    }

     // CUSTOMIZATION OF STACK HEADER
     static navigationOptions = ({navigation}) => {
        return{

            title: 'My CV',
                //  toggle
            headerLeft: 
            <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}
             style={{ display:'flex',flexDirection:'column',marginLeft:10,alignSelf:"center",}}>

        <Text style={{  width:30,height:3,backgroundColor:'white',alignSelf:"center", marginBottom:4.5}}></Text>
        <Text style={{  width:30,height:3,backgroundColor:'white',alignSelf:"center", marginBottom:4.5}}></Text>
        <Text style={{  width:30,height:3,backgroundColor:'white',alignSelf:"center", marginBottom:4.5}}></Text>
         </TouchableOpacity>,
    //   toggle end

        headerStyle: {
            backgroundColor:'#ef5350'
            // backgroundColor: '#946638',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            color:'white'
        },
    }
 };

 componentDidMount(){
     console.log('~~props~~',this.props)
 }

 onValueChange(value) {
    this.setState({
      selected: value,selectedError:null
    });
  }


    render(){
        let { name, skills, year, degree, des, experience,  } = this.props.cv

        /**
         * {"__v": 0, "_id": "5dd4134a15baa6343c26fb4b", "degree": "Bachelor", "des": "Gdhdhdhdddhdj", 
         * "experience": [{"_id": "5dde8d292a3d8f2c1ce4b5f6", "designation": "Hdhdh", "duration": "Hxhx", 
         * "organization": "Gdhf"}], "name": "Agsg", "skills": "Gxhddu
", "year": "2019"}
         */
console.log("-------------",this.props.cv)
        
        return(
            <View style={{flex:1}}>
<StatusBar backgroundColor="#ef5350" barStyle="light-content" />
<View style={styles.container}>


<View style={{justifyContent:"center",borderRadius:15}}> 


    <View style={{flexDirection:'row',backgroundColor:'#eee',borderRadius:10,borderBottomColor:'gray',borderBottomWidth:1}}>
    <Text style={{padding:5}}> Name :  </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296'}}> {name} </Text>
    </View>


    <View style={{flexDirection:'row',backgroundColor:'#eee',borderRadius:10,borderBottomColor:'gray',borderBottomWidth:1}}>
    <Text style={{padding:5}}> Skills :  </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296'}}> {skills} </Text>
    </View>


    <View style={{flexDirection:'row',backgroundColor:'#eee',borderRadius:10,borderBottomColor:'gray',borderBottomWidth:1}}>
    <Text style={{padding:5}}> Highest Degree  : </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296'}}> {degree} </Text>
    </View>


    <View style={{flexDirection:'row',backgroundColor:'#eee',borderRadius:10,borderBottomColor:'gray',borderBottomWidth:1}}>
    <Text style={{padding:5}}> Degree Completion Year  :  </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296'}}> {year} </Text>
    </View>


    <View style={{backgroundColor:'#eee',borderRadius:10,borderBottomColor:'gray',borderBottomWidth:1}}>
    <Text style={{padding:5}}> Experience  :  </Text>

    <View style={{backgroundColor:'#eee',borderRadius:10,marginBottom:5,flexDirection:'row'}}>
     <Text style={{padding:5,paddingLeft:5,color:'#296',fontWeight:'bold',width:50}}> S.No </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296',fontWeight:'bold',width:100}}> Designation </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296',fontWeight:'bold',width:80}}> Duration </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296',fontWeight:'bold',width:100}}> Organization </Text>
    </View>

{ experience && experience.map( ( val, key )=>{
    return(

    <View style={{backgroundColor:'#eee',borderRadius:10,marginBottom:5,flexDirection:'row'}}>
    <Text style={{padding:5,paddingLeft:5,color:'#000',width:50}}> {key + 1} . </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#000',width:100}}> {val.designation} </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#000',width:90}}> {val.duration} </Text>
    <Text style={{padding:5,paddingLeft:5,color:'#000',width:90}}> {val.organization}</Text>
    </View>
    )
})}

    </View>


</View>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('CV')} style={{marginTop:40,backgroundColor:'#ef5350',padding:10,width:200,alignItems:'center',borderBottomEndRadius:30,
    borderTopStartRadius:30,}}>
    <Text style={{color:'white'}} >Edit</Text>
</TouchableOpacity>
</View>

            </View>
           
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'lightgray',
        justifyContent:'center',
        alignItems:'center'
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
    },
    addModal:{
        height:50,
        width:50,
        position:'absolute',
        backgroundColor:'white',
        bottom:15,
        right:15,
        padding:15,
        justifyContent:'center',
        borderRadius:30
       
    },
    addModalTxt:{
        color:"#ef5350",
        fontSize:35,
        textAlign:'center'

    },
    card:{
        backgroundColor:'white',
        margin:5,
        padding:10,
        borderRadius:5,
        borderWidth:10,
        borderColor:"white",
        minHeight:100,
        maxHeight:500,
        shadowColor: '#000',
    // shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
        
    },
    input:{
        backgroundColor:'white',
        width:"100%",
        minHeight:40,
        margin:5,
        borderRadius:5,
        alignSelf:'center',
        fontSize:14,
        borderBottomColor:'#ef5350',
        borderBottomWidth:1
    },
})

const mapStateToProps = state =>{
    return{
        user : state.AuthReducer.user,
        cv : state.CvReducer.cv,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(My_CV)