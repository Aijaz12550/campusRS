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



 class AddCv extends Component {
     
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

            title: 'My Resume',
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
        let { login,main,
            personalDetail,
            educationalDetail,
            desL,
            nameError,
            desError,
            pd,
            year,month,day,
            degree,

            designation,duration,organization,index,experience,

        
        } = this.state

        
        return(
            <View style={{flex:1}}>
<StatusBar backgroundColor="#ef5350" barStyle="light-content" />
<View style={styles.container}>

{/* _____________-CARD _Personal _Detail_____________- */}
{!personalDetail &&
           <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} >
                   <ScrollView>

                   <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
                       <Text style={{fontSize:16,color:"#ef5350",fontWeight:'bold'}}>Personal Detail</Text>
                   </View>
                   <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                       <TextInput onChangeText={(v)=>this._name(v)} placeholder="Enter Full Name" style={styles.input}/>
                       {nameError && <Text style={{fontSize:11,color:'red'}} >{nameError}</Text>}

                       <TextInput onChangeText={v=>this._des(v)} placeholder="Describe Your Self.." multiline={true} maxLength={300} style={[styles.input,{maxHeight:100}]}/>
                       {desError && <Text  style={{fontSize:11,color:'red'}} >{desError}</Text>}

                       <Text style={{fontSize:15,color:"#ef5350",alignSelf:'flex-end'}}>{desL}/300</Text>

                       
                   </View>
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginTop:10}}>
                       


                       {pd ?
                       <TouchableOpacity onPress={()=>this.setState({personalDetail:true})} >
                           <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Next</Text>
                       </TouchableOpacity>
                    :
                    <View >
                    <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350",opacity:0.3}}>Next</Text>
                    </View>
                    }

                       
                   </View>

                   </ScrollView>
               </TouchableOpacity>

}

       

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
        user : state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddCv)