import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, 
StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar, FlatList, ListItem, RefreshControl, Image, ImageBackground
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User} from '../../store/actions/index'
import ip from '../ip'
import { Banner, Card } from 'react-native-paper'
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faBackward, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import img from './image'



 class Jobs extends Component {
    state={
        login:false,main:true,
        WIDTH:300,refreshing:false, setRefreshing:false
    }
    constructor(props){
        super(props);
        Dimensions.addEventListener('change',(dims)=>{
            this.setState({
                WIDTH:Dimensions.get('window').width > 500 ? 500 :300
            })
        })
    }

   _onRefresh = () => {
    this.setState({refreshing: true});
   
    setTimeout(()=>{
        this.setState({refreshing: false})
    },10000)
  }

    render(){
        let { login,main, companies,refreshing, setRefreshing } = this.state
 
  
        return(

            <View style={{flex:1,backgroundColor:'#ef5350',justifyContent:'center',alignItems:'center'}}>

<StatusBar backgroundColor="#ef5350" barStyle="light-content" />

<FlatList
                       refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      }

        data={this.props.jobs}
        renderItem={({ item }) => <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:"white"}}>{item.job_detail.title}</Text>
        </View>

        <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
            <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>Detail :</Text>
            <View>
                    <Text style={{color:'white'}}>Added On : {item.timestamp}</Text>
            <Text style={{color:'white'}}>Total Applicants : 10</Text>
            <Text style={{color:'white'}}>Total ShortListed : 10</Text>
            <Text style={{color:'white'}}>Total Hired : 10</Text>
                    <Text style={{color:'white'}} numberOfLines={3}>Job Responsibility : {item.job_detail.job_responsibility}</Text>
            
        </View>


        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'space-between',marginTop:10}}>
            
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostJob',{owner:item._id})}>
            <Text style={{fontSize:16,fontWeight:'bold',color:"yellow"}}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate("JobDetail",{job:item})} >
            <Text style={{fontSize:16,fontWeight:'bold',color:"navy"}}> Detail</Text>
            </TouchableOpacity>
            
        </View>

        
    </TouchableOpacity>
    }
        keyExtractor={item => item._id}
      />
                  
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
    banner:{
        backgroundColor:'#ef5350',
        flex:0.25,
        justifyContent:'space-between',
        minHeight:80
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
        backgroundColor:'#ef5350',
        margin:10,
        padding:10,
        borderRadius:5,
        borderColor:"white",
        borderWidth:1,
        minHeight:100,
        maxHeight:500,
        shadowColor: '#000',
    // shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 20,
        
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
export default connect(mapStateToProps,mapDispatchToProps)(Jobs)