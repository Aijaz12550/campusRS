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

 const {path} = Svg
 const {width} = Dimensions.get('window')
 const height = 64



 class CompanyD extends Component {
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
    this._myCompanies()
    setTimeout(()=>{
        this.setState({refreshing: false})
    },10000)
  }

    render(){
        let { login,main, companies,refreshing, setRefreshing } = this.state
 
  
        return(

            <View style={{flex:1,backgroundColor:'#ef5350'}}>




<View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>

    <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} >

        <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
            <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>History :</Text>
            <View>
 <Text style={{color:'white',fontSize:16}} >Registration Date : {this.props.item.timestamp}</Text>
 <Text style={{color:'white',fontSize:16}} >Location : {this.props.item.location}</Text>
 <Text style={{color:'white',fontSize:16}} >Total employees : {this.props.item.totalEmployees}</Text>
        <Text style={{color:'white',fontSize:16}}>Total Jobs Posted : {this.props.item.Jobs.length}</Text>
            <Text style={{color:'white',fontSize:16}}>Total Hired : 10</Text>
 <Text style={{color:'#255',fontSize:16}}>Active Jobs : {this.props.item.Jobs.length - this.props.item.closeJobs.length }</Text>
 <Text style={{color:'yellow',fontSize:16}}>Closed Jobs : {this.props.item.closeJobs.length}</Text>
        </View>


        </View>
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10,marginTop:10}}>
            <Text style={{fontSize:14,fontWeight:'bold',color:"#eee"}}>{this.props.item.description}</Text>
            <Text >Services : {this.props.item.service}</Text>
        </View>
        
    </TouchableOpacity>
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
        minHeight:100,
        maxHeight:500,
        shadowColor: '#000',
    // shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
        
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
export default connect(mapStateToProps,mapDispatchToProps)(CompanyD)