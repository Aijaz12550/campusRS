import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar, Slider,ActivityIndicator,Alert
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User} from '../../store/actions/index'
import { Container, Header, Content, Form, Item, Input, Label,Spinner, Textarea  } from 'native-base';
import ip from '../ip'


 class Home extends Component {
    state={
        login:false,main:true,
        WIDTH:300,loader:false
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

            title: 'Add Company',
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

//  ---------------------------------------------------------------------------

 async _addCompany(){
     this.setState({loader:true})
     let { cname,ser,des,emp,loc, } = this.state
     let timestamp = new Date().getTime()
     console.log('chala..')
     if(cname  && ser  && des  && emp && loc){
         
         await fetch(`https://pacific-shore-10571.herokuapp.com/company/addCompany`,{
             method:'POST',
             headers:{
                 "Content-Type":"application/json",
                 "authorization":`Bearer ${this.props.user.token}`
         },
         body:JSON.stringify({
             companyName :cname,
             service:ser,
             totalEmployees:emp,
            location:loc,
            description:des,
            ownerId:this.props.user._id,
            timestamp,
        })
    }).then(res=>res.json())
    .then(result=>{
        this.setState({loader:false})
        console.log('result~~~',result)
        if(result.result){
             this.props.navigation.navigate('Home')
         }
     })
     
    }else{
        this.setState({loader:false})
        Alert.alert("Please fill the form correctly.")
    }
}


    render(){
        // this.props.r_u()
        let { login,main,loader } = this.state
        return(
            <View style={{flex:1}}>
<StatusBar backgroundColor="#ef5350" barStyle="light-content" />

<View style={styles.container}>


<ScrollView style={{width:this.state.WIDTH}}>

<Form style={{backgroundColor:'#eee',marginTop:10,padding:5,paddingBottom:40,borderRadius:15,elevation:10}}>
            <Item floatingLabel style={{borderBottomColor:'red',borderBottomWidth:1}}>
              <Label style={{color:'#ef5350',fontSize:14,}}>Company Name</Label>
              <Input  onChangeText={(v)=>this.setState({cname:v})}  maxLength={25}/>
            </Item>

            <Item floatingLabel style={{borderBottomColor:'red',borderBottomWidth:1}}>
              <Label style={{color:'#ef5350',fontSize:14}}>Main Service of Company</Label>
              <Input onChangeText={(v)=>this.setState({ser:v})} maxLength={25} />
            </Item>

            <Item floatingLabel style={{borderBottomColor:'red',borderBottomWidth:1}}>
              <Label style={{color:'#ef5350',fontSize:14}}>No Of Employees Working</Label>
              <Input onChangeText={(v)=>this.setState({emp:v})} keyboardType="number-pad" maxLength={4} />
            </Item>

            <Item floatingLabel style={{borderBottomColor:'red',borderBottomWidth:1}}>
              <Label style={{color:'#ef5350',fontSize:14}}>Location (Karachi e.t.c)</Label>
              <Input onChangeText={(v)=>this.setState({loc:v})} maxLength={10} />
            </Item>
            

            <Item floatingLabel style={{borderBottomColor:'red',borderBottomWidth:1}}>
              
            <Label style={{color:'#ef5350',fontSize:14}}>Description</Label>
              <Input onChangeText={(v)=>this.setState({des:v})} multiline={true} maxLength={100} style={{maxHeight:150}} />
            </Item>
          </Form>
               
          {/* <Spinner color="white" /> */}
              
          <TouchableOpacity onPress={()=>this._addCompany()} style={styles.btn}>
              { loader ?<ActivityIndicator color="white" size={25} />:
                <Text style={styles.btnText} >Submit</Text>}
            </TouchableOpacity>
</ScrollView>
              
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
        backgroundColor:'#ef5350',
        height:45,
        margin:20,
        borderBottomEndRadius:30,
        borderTopStartRadius:30,
        justifyContent:'center',
        maxWidth:170,
        alignSelf:'center',
        width:'100%',
        marginTop:30,
        elevation:10
    },
    btnText:{
        alignSelf:'center',
        color:'white'
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
        margin:10,
        padding:10,
        borderRadius:5,
        borderWidth:10,
        borderColor:"white",
        minHeight:100,
        maxHeight:500,
        
    }
})

const mapStateToProps = state =>{
    return{
        user : state.AuthReducer.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user)),
        r_u:()=>dispatch(Remove_User())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)