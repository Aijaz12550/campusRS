import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar,
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User} from '../../store/actions/index'
import { Container, Header, Content, Form, Item, Input, Label,Spinner  } from 'native-base';
import ip from '../ip'


 class Home extends Component {
    state={
        login:false,main:true,
        WIDTH:300,
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

            title: 'Company Name',
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
     console.log('~~props~~',this.props.navigation.getParam("owner"))
 }

 async _addjob(){
     let { title, salary,experience, positions, skills, jobType, qualification, res  } = this.state
     console.log("~~~chala~~~")
     let _id = this.props.navigation.getParam("owner");
     await fetch(`http://${ip}:3000/company/addjob`,{
         method:"POST",
         headers:{
             "Content-Type":'application/json',
             "authorization":`Bearer ${this.props.user.token}`
         },
         body:JSON.stringify({
          
                 job_detail:{
                    cId:_id,
                    timestamp:new Date().getTime(),
                title:title,
                required_qualification:qualification,
                experience:experience,
                skills:skills,
                positions:positions,
                job_type:jobType,
                salary:salary,
                job_responsibility:res,
            },
      
         })
     }).then(res=>res.json())
     .then(result=>{
         
         if(result.result){
             console.log('~~~r.r~~',result.result)
             fetch(`http://${ip}:3000/company/updateCompany`,{
                method:"POST",
                headers:{
                    "Content-Type":'application/json',
                    "authorization":`Bearer ${this.props.user.token}`
                },
                body:JSON.stringify({id:_id, jobId:result.result._id})
            }).then( r => r.json())
            .then( data => {
                console.log('data',data)
                this.props.navigation.navigate('Home')
            })
         }
         
     })
 }


    render(){
        let { login,main } = this.state
        return(
            <View style={{flex:1}}>
<StatusBar backgroundColor="#ef5350" barStyle="light-content" />

<View style={styles.container}>


<ScrollView style={{width:this.state.WIDTH}}>

<Form>
            <Item floatingLabel>
              <Label style={{color:'white',fontSize:14}}>Job Title</Label>
              <Input onChangeText={v=>this.setState({title:v})}  maxLength={25}/>
            </Item>

            <Item floatingLabel>
              <Label style={{color:'white',fontSize:14}}>Qualification Required</Label>
              <Input onChangeText={v=>this.setState({qualification:v})} maxLength={25} />
            </Item>

            <Item floatingLabel>
              <Label style={{color:'white',fontSize:14}}>Experience</Label>
              <Input onChangeText={v=>this.setState({experience:v})} keyboardType="number-pad" maxLength={4} />
            </Item>

            <Item floatingLabel>
              <Label style={{color:'white',fontSize:14}}>Skills Required</Label>
              <Input onChangeText={v=>this.setState({skills:v})} maxLength={10} />
            </Item>
            
            <Item floatingLabel>
              <Label style={{color:'white',fontSize:14}}>Vacant Positions</Label>
              <Input onChangeText={v=>this.setState({positions:v})} maxLength={10} />
            </Item>

            <Item floatingLabel>
              <Label style={{color:'white',fontSize:14}}>Job Type</Label>
              <Input onChangeText={v=>this.setState({jobType:v})} maxLength={10} />
            </Item>

            <Item floatingLabel>
              <Label style={{color:'white',fontSize:14}}>Salary Package</Label>
              <Input onChangeText={v=>this.setState({salary:v})} maxLength={10} />
            </Item>


            <Item floatingLabel>
              <Label style={{color:'white',fontSize:14}}>Job Responsibilty</Label>
              <Input onChangeText={v=>this.setState({res:v})} multiline={true} maxLength={100} />
            </Item>

            
          </Form>
               
          {/* <Spinner color="white" /> */}
              
          <TouchableOpacity onPress={()=>this._addjob()} style={styles.btn}>
                <Text style={styles.btnText} >Submit</Text>
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
        backgroundColor:'#ef5350',
        justifyContent:'center',
        alignItems:'center'
    },
    modal:{
        margin:0,
        flex:1
    },
    btn:{
        backgroundColor:'white',
        height:45,
        margin:20,
        borderBottomEndRadius:30,
        borderTopStartRadius:30,
        justifyContent:'center',
        maxWidth:170,
        alignSelf:'center',
        width:'100%',
        marginTop:30
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
        user : state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)