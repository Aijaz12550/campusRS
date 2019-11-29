import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, 
StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar, FlatList, ListItem, RefreshControl, Image, ImageBackground
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'

import { Add_User, Remove_User } from '../../../store/actions/index'
import ip from '../../ip'
import { Banner, Card } from 'react-native-paper'
import { FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faBackward, faArrowLeft, faArrowAltCircleDown } from "@fortawesome/free-solid-svg-icons"
import img from '../image'



 class ShortList extends Component {
    state={
        login:false,main:true,
        WIDTH:300,refreshing:false, setRefreshing:false,ndata:[],dek:false
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
    this._alc()
    setTimeout(()=>{
        this.setState({refreshing: false})
    },10000)
  }


  async _alc(){
      fetch(`https://pacific-shore-10571.herokuapp.com/company/getApplication`,{
          method:'GET',
          headers:{
              "Content-Type":'application/json',
              authorization:`Bearer ${this.props.user.token}`,
              id:this.props.id,
              status:'Short List'
          }
      }).then( res => res.json() ).then( data => {
          console.log('ppppppppppp',data.result[0])
          this.setState({ndata:data.result,dek:true,refreshing: false})
      }).catch( e => {
          console.log('ppp ee  ,==',e)
      })
  }

//   ---------------update status

 async _updateStatus(id,status){

     await fetch(`https://pacific-shore-10571.herokuapp.com/company/updateApplication`,{
         method:'POST',
         headers:{
             "Content-Type":'application/json',
             authorization:`Bearer ${this.props.user.token}`
         },
         body:JSON.stringify({id,status})
     }).then( res => res.json() ).then( data => {
        this._alc()
         console.log('rr',data)
     }).catch( e => {
         console.log('error',e)
     })
 }

  /**
   * [{"__v": 0, "_id": "5ddf835c1d70ba3128d889c9", "applicant_id": {"__v": 2, "_id": "5dd4134a15baa6343c26fb4b", 
   * "cv": {"degree": "Intermediate", "des": "Description of", "experience": [Array], "name": "Aijaz", "skills": 
   * "React", "year": "2019"}, "email": "student@gmail.com", "myjobs": [], "name": "Aijaz", 
   * "password": "$2a$10$P.wKfxsy9FTvvIoVC0yaWe56fqUQ8VqgbfAfjBYu8bxMzMC8XLZge", "savedJobs": [], 
   * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQ0MTM0YTE1YmFhNjM0M2MyNmZiNGIiLCJpYXQiOjE1NzQ5MjkxNjR9.cSNF6BXphXtlOkE3S6YDB6AZyaJsWkdKar35LQsDsCc", 
   * "type": "Student"},
   *  "company_id": "5dd56914a940d71d28eb5588", "job_id": "5ddd3a755e7cb6237872ea53", "status": "Pending"}]
   */

  componentDidMount(){
      this._alc()
  }

    render(){
        let { login,main, companies,refreshing, setRefreshing, ndata, dek } = this.state

  
        return(

            <View style={{flex:1,backgroundColor:'lightgray'}}>

{ !ndata.length &&  <ScrollView style={{flex:1,height:200}} 
contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
 refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      } >
                          {!ndata.length && dek && <Text>No Application Found</Text>}
                          </ScrollView>}

<View style={{flex:1,justifyContent:'flex-start',alignItems:'center'}}>
<FlatList
 refreshControl={
    <RefreshControl
      refreshing={this.state.refreshing}
      onRefresh={this._onRefresh}
    />
  }
data={ndata}
renderItem={({item})=>
    <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} >
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:"white"}}> {item.applicant_id.name} </Text>
        </View>
        <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
            <Text style={{fontSize:16,fontWeight:'bold',color:'white'}}>Last degree : {item.applicant_id.cv.degree}</Text>
            <View>
          <Text style={{color:'white',fontSize:16}} >skills : {item.applicant_id.cv.skills}</Text>
          <Text style={{color:'white',fontSize:16}} >Degree Completion Year : {item.applicant_id.cv.year}</Text>
          <Text style={{color:'white',fontSize:16}} >Description : {item.applicant_id.cv.des}</Text>

          <View style={{}}>
    <Text style={{padding:5,color:'#eee',fontWeight:'bold',marginTop:10}}>Experience  :  </Text>

    <View style={{backgroundColor:'#eee',marginBottom:5,flexDirection:'row'}}>
     <Text style={{padding:5,paddingLeft:5,color:'#296',fontWeight:'bold',width:40,fontSize:12}}> S.No </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296',fontWeight:'bold',width:80,fontSize:12}}> Designation </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296',fontWeight:'bold',width:80,fontSize:12}}> Duration </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#296',fontWeight:'bold',width:100,fontSize:12}}> Organization </Text>
    </View>

{ item.applicant_id.cv.experience && item.applicant_id.cv.experience.map( ( val, key )=>{
    return(

    <View style={{backgroundColor:'#eee',marginBottom:5,flexDirection:'row'}}>
    <Text style={{padding:5,paddingLeft:5,color:'#000',width:40,fontSize:12}}> {key + 1} . </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#000',width:80,fontSize:12}}> {val.designation} </Text>
     <Text style={{padding:5,paddingLeft:5,color:'#000',width:90,fontSize:12}}> {val.duration} </Text>
    <Text style={{padding:5,paddingLeft:5,color:'#000',width:90,fontSize:12}}> {val.organization}</Text>
    </View>
    )
})}

    </View>

 
        </View>

        {/* <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'space-between'}}>
            

            <TouchableOpacity  >
            <FontAwesomeIcon color="white" icon={faArrowAltCircleDown} />
            </TouchableOpacity>
            
        </View> */}

        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'space-between',marginTop:10}}>
            
            <TouchableOpacity onPress={()=>this._updateStatus(item._id,"Rejected")} >
            <Text style={{fontSize:16,fontWeight:'bold',color:"yellow"}}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this._updateStatus(item._id,"Selected")} >
            <Text style={{fontSize:16,fontWeight:'bold',color:"navy"}}> Select</Text>
            {/* <Text style={{fontSize:16,fontWeight:'bold',color:"navy"}}> {item._id}</Text> */}
            </TouchableOpacity>
            
        </View>

        
    </TouchableOpacity>
}
keyExtractor={item => item._id}
/>
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
        backgroundColor:'#ffab00',
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
        user : state.AuthReducer.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShortList)