import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, 
StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar, FlatList, ListItem, RefreshControl
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User} from '../../store/actions/index'
import ip from '../ip'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHeart, faBars, faSearch, faWindowClose,faArrowAltCircleDown, faSign,faCheckCircle, faArrowAltCircleUp, faFlag,faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import Add_Cv from '../../store/actions/CvAction';

 class Home extends Component {
    state={
        login:false,main:true,
        WIDTH:300,refreshing:false, setRefreshing:false,heart:false,search:false,
        resultArray:[],v:null,more:false,detailDekhao:false,
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
     static navigationOptions =  {
      header:null
 };

 componentDidMount(){

    console.log('`````````Home--this.props.cv',this.props.cv)
    this._getAll()
    var d = 1000

    setInterval(()=>{
        this.setState({dd:18})
        d = 2000
    },d)
    setInterval(()=>{
        this.setState({dd:15})
    },2000)

    this._mycv()
 }

 async _mycv(){
     await fetch(`https://pacific-shore-10571.herokuapp.com/users/mycv`,{
         method:'GET',
         headers:{
             "Content-Type":'application/json',
             authorization:`Bearer ${this.props.user.token}`,
             id:this.props.user._id
         }
     }).then( res => res.json()).then( data => {
         console.log('ff',data)
         this.props.add_cv(data.result)
     }).catch( e => {
         console.log('eee',e)
     })
 }

 async _getAll(){
    await fetch(`https://pacific-shore-10571.herokuapp.com/company/alljobs`,{
        method:"GET",
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.user.token}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
        this.setState({comps:data.result})
        this.setState({refreshing:false})
        console.log("~~comp~~",data)
      })
    .catch(e=>{
        this.setState({refreshing:false})
        console.log('~~err~~',e)})
}

   _onRefresh = () => {
    this.setState({refreshing: true});
    this._getAll()
    setTimeout(()=>{
        this.setState({refreshing: false})
    },10000)
  }


  _search(v){
      if(!v || v == 'All'){
          this.setState({v:null})
      }
      let { comps } = this.state;
      let flag = false;
     
      for( var i = 0; i < comps.length; i++ ){

        let res = comps.filter( a => (a.title).toLowerCase().indexOf(v.toLowerCase()) != -1)

        if(res.length && v != 'All'){
            flag = true
            this.setState({resultArray:res,v:v?v:null})
        }else if(v && v != 'All'){
            this.setState({v,})
        }else{
            this.setState({v:null})
        }
        if(i == comps.length-1 && !flag && v != 'All'){
            this.setState({resultArray:[]})
        }

      }
  }

//_____________________________________________________action

async _newAction(action,jobId,test){
    await fetch(`https://pacific-shore-10571.herokuapp.com/company/newAction`,{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.user.token}`
        },
        body:JSON.stringify({
            user_id:this.props.user._id,
            job_id:jobId,
            action:action
        })

    }).then( res => res.json())
    .then( data => {
        this._getAll()
        console.log('Action Added')
    }).catch( e => {
        console.log('error~~~~~~~~',e)
    })
}


//_____________________________________________________action

async _deleteAction(action_id){

    await fetch(`https://pacific-shore-10571.herokuapp.com/company/updateAction`,{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.user.token}`
        },
        body:JSON.stringify({id:action_id,})

    }).then( res => res.json())
    .then( data => {
        this._getAll()
        console.log('Action Added')
    }).catch( e => {
        console.log('error~~~~~~~~',e)
    })
}

// -------------------------------------------------------------------------------



// _____________________________________Apply for job
  async _updateJob(aId,jobId){
      await fetch(`https://pacific-shore-10571.herokuapp.com/company/apply`,{
          method:'POST',
          headers:{
              "Content-Type":'application/json',
              authorization:`Bearer ${this.props.user.token}`
          },
          body:JSON.stringify({
              job_id:jobId,
              application_id:aId
          })

      }).then( res => res.json() )
      .then( data => {
          this._getAll()
          console.log('~~data~~',data)
      }).catch( e => {
          console.log('~~error~~',e)
      })
  }


//   -------apply for job---
 async _applyJob(cId,jobId){
     if(this.props.cv){

         console.log('chhh',jobId)
         await fetch(`https://pacific-shore-10571.herokuapp.com/company/application`,{
             method:'POST',
         headers:{
             "Content-Type":'application/json',
             authorization:`Bearer ${this.props.user.token}`
         },
         body:JSON.stringify({
            applicant_id:this.props.user._id,
            company_id :cId,
            job_id:jobId,
            status:"Pending",
         })
     }).then( res => res.json()).then( aijaz => {
         console.log('---aijaz',aijaz)
         if(aijaz.result){
             this._updateJob(aijaz.result._id,jobId)
         }
     }).catch( e => {
         console.log('__error',e)
        })
    }else{
        this.props.navigation.navigate('CV')
    }
 }

    render(){
        let { login,main, companies,refreshing, setRefreshing,comps, heart, search,v,resultArray, dd, detailDekhao } = this.state
        // console.log('jjjjjjjjjjjjjj',this.props.cv)
        


  function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }
  
        return(
            <View style={{flex:1,backgroundColor:'#eee'}}>
<StatusBar backgroundColor="#ef5350" barStyle="light-content" />
{/* Header---------------------------- */}
<View style={styles.header}>
<TouchableOpacity onPress={()=>this.props.navigation.dispatch(DrawerActions.toggleDrawer())}>
    <FontAwesomeIcon size={23} color="white" icon={faBars} />
</TouchableOpacity>


{ !search && <Text style={styles.title} >Jobs Feed</Text>}
{ !search && <TouchableOpacity onPress={()=>this.setState({search:true})} >
    <FontAwesomeIcon size={22} color="white" icon={faSearch} />
</TouchableOpacity>}

{ search && <TextInput onChangeText={(v)=>this._search(v)} style={styles.sInput} placeholder="Search Jobs Here" placeholderTextColor="white" autoFocus={true} />}
{search &&<TouchableOpacity onPress={()=>this.setState({search:false,v:null})} >
    <FontAwesomeIcon size={22} color="white" icon={faWindowClose} />
</TouchableOpacity>}
</View>
{/* -------------header-end--------------------- */}


{/* ======================================================================================CHIPS------------------ */}
<FlatList

data={[{name:'All',_id:'11',color:'navy'},{name:'React Native',_id:'1',color:'#296'},{name:'React Js',_id:'2',color:'coral'},{name:'JavaScript',_id:'3'},
{name:'HTML',_id:'4',color:'gray'},{name:'CSS',_id:'5',color:'#296'},{name:'MERN Stack',_id:'6',color:'gray'},

{name:'Node js',_id:'7',color:'#296'},{name:'MEAN Stack',_id:'8',color:'#296'},]}
horizontal={true}
// contentContainerStyle={{justifyContent:'center',alignItems:'center',flex:1,maxHeight:66,backgroundColor:'lightgray'}}
style={{maxHeight:66,backgroundColor:'lightgray'}}
renderItem={({ item }) => <TouchableOpacity onPress={()=>this._search(item.name)} style={{backgroundColor:item.color?item.color:'#ffab00',padding:5,paddingRight:15,paddingLeft:15,borderRadius:5,marginLeft:10,maxHeight:30,marginTop:10}} >
<Text style={{fontSize:14,color:"white",}} >{item.name}</Text>


</TouchableOpacity>
}
keyExtractor={item => item._id}
/>

{/* ==============================chips end----------------- */}


{ !comps && <ScrollView style={{flex:1,backgroundColor:'lightgray'}}  refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      } ></ScrollView>}

<View style={styles.container}>
    {(v)?null:
                      
                       <FlatList
                               refreshControl={
                                   <RefreshControl
                                  refreshing={this.state.refreshing}
                                  onRefresh={this._onRefresh}
                                  />
                                }

        data={comps}
renderItem={({ item }) => <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} >
<View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
<Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350",}} >{item.title}</Text>
</View>

<View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
<View>
 <Text> Posted : {moment(JSON.parse(item.timestamp)).fromNow()}</Text>
<Text> Required Qualification : {item.required_qualification}</Text>
<Text> Required Experience : {item.experience}</Text>

{detailDekhao == item._id &&
<View>
<Text> Job Type : {item.job_type}</Text>
<Text> Vacancies : {item.positions}</Text>
<Text> Skills : {item.skills}</Text>
<Text> Salary : {item.salary}</Text>
</View>
}


</View>


</View>
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'space-between',marginTop:10}}>


{/* ________________________________________________________________________________________________________apply */}
{/* _____________________________________________________like */}
{item.applications.length
?
<View>
{

item.applications.map((val,key)=>{
    
    let flag = false
    if(  val.applicant_id === this.props.user._id ){
        flag = true;
        return(
            <TouchableOpacity   style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
            <View style={{alignSelf:'center'}}>
            <FontAwesomeIcon   color="#296" icon={faCheckCircle} />
            <Text style={{fontSize:8,color:"#296"}}>Applied</Text>
                </View>
        <Text style={{marginLeft:5}} >{item.applications.length}</Text>
            </TouchableOpacity>
        )
    }
   else if(key === item.applications.length - 1 && !flag) {
    //    console.log('11111111111111',item._id)
        return(
            <TouchableOpacity style={{display:'flex',flexDirection:'row',justifyContent:'center'}} onPress={()=>this._applyJob(item.cId,item._id)} >
          <View>
            <FontAwesomeIcon   icon={faCheckCircle} />
            <Text style={{fontSize:8,color:"black"}}> Apply</Text>
                </View>
        <Text style={{marginLeft:5}} >{item.applications.length}</Text>
            </TouchableOpacity>
        )
    }
    
})
    

}
</View>

:

<TouchableOpacity onPress={()=>this._applyJob(item.cId,item._id)} >
{/* <Text style={{fontSize:16,fontWeight:'bold',color:"green"}}>Apply</Text> */}
<FontAwesomeIcon  size={20} icon={faCheckCircle} />
</TouchableOpacity>
}
{/* ____________________________________________________________apply end */}

{/* _____________________________________________________like */}
{item.actions.length
?
<View>
{

item.actions.map((val,key)=>{
    // let array = ["item.actions","ewewe","item.actions","ewewe"]
    // let test = array.splice(2,1)
    // console.log("~~~~~~ss________",array,"~~~~",key)
    let flag = false
    if(  val.user_id === this.props.user._id ){
        flag = true;
        return(
            <TouchableOpacity style={{display:'flex',flexDirection:'row'}} key={key} onPress={()=>this._deleteAction(val._id)} >
                <View>
            <FontAwesomeIcon  size={dd} color="red" icon={faHeart} />
            <Text style={{fontSize:8,color:"red"}}> liked</Text>
                </View>
        <Text style={{marginLeft:5}} >{item.actions.length}</Text>
        </TouchableOpacity>
        )
    }
   else if(key === item.actions.length - 1 && !flag) {
        return(
            <TouchableOpacity style={{display:'flex',flexDirection:'row'}} key={key} onPress={()=>this._newAction(true,item._id,false,key)} >
                <View>
            <FontAwesomeIcon   icon={faHeart} />
            <Text style={{fontSize:8,color:"black"}}> like</Text>
                </View>
        <Text style={{marginLeft:5}} >{item.actions.length}</Text>
        </TouchableOpacity>
        )
    }
    
})
    

}
</View>

:

<TouchableOpacity onPress={()=>this._newAction(true,item._id,false)}  >
    <FontAwesomeIcon  icon={faHeart} />
</TouchableOpacity>
}


{/* _______________________flag */}

<TouchableOpacity onPress={()=>this._applyJob(item._id)} >
<FontAwesomeIcon color="#296" size={16} icon={faFlagCheckered} />
<Text style={{fontSize:8,color:"green"}}>marked</Text>
</TouchableOpacity>
{/* ---------------------------end */}



{/* // _______________________________________________________________end */}
{!detailDekhao?
<TouchableOpacity onPress={()=>this.setState({detailDekhao:item._id})}  >
<FontAwesomeIcon  size={18} color='navy' icon={faArrowAltCircleDown} />
<Text  style={{fontSize:10,color:"navy"}}>more</Text>
</TouchableOpacity>
:


<TouchableOpacity onPress={()=>this.setState({detailDekhao:false})}  >
<FontAwesomeIcon  size={20} color='navy' icon={faArrowAltCircleUp} />
<Text  style={{fontSize:10,color:"navy"}}> less</Text>
</TouchableOpacity>
}

</View>

</TouchableOpacity>
}
keyExtractor={item => item._id}
/>

  
}


                  {v && <FlatList
                  ListEmptyComponent={()=><Text>No Job Found for {v}</Text>}
data={resultArray}
renderItem={({ item }) => <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
<View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
<Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350",}} >{item.title}</Text>
</View>

<View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
<View>
<Text>Posted : {item.timestamp}</Text>
<Text> Required Qualification : {item.required_qualification}</Text>
<Text> Required Experience : {item.experience}</Text>
<Text>Salary : {item.salary}</Text>
</View>


</View>
<View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'space-between',marginTop:10}}>

<TouchableOpacity >
<Text style={{fontSize:16,fontWeight:'bold',color:"green"}}>Apply</Text>
</TouchableOpacity>

{heart === item._id
?
<TouchableOpacity >
<FontAwesomeIcon color="red" icon={faHeart} />
</TouchableOpacity>
:
<TouchableOpacity onPress={()=>this.setState({heart:item._id})}>
<FontAwesomeIcon icon={faHeart} />
</TouchableOpacity>
}

<TouchableOpacity  >
<Text style={{fontSize:16,fontWeight:'bold',color:"navy"}}> more</Text>
</TouchableOpacity>

</View>


</TouchableOpacity>
}
keyExtractor={item => item._id}
/>

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
        backgroundColor:'#ef5350',
        bottom:15,
        right:15,
        padding:15,
        justifyContent:'center',
        borderRadius:30
       
    },
    addModalTxt:{
        color:"white",
        fontSize:35,
        textAlign:'center'

    },
    card:{
        backgroundColor:'white',
        margin:5,
        padding:10,
        borderRadius:5,
        borderWidth:1,
        borderColor:"white",
        minHeight:100,
        maxHeight:500,
        shadowColor: '#000',
    // shadowOffset: { width: 10, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    
    },
    header:{
        flex:0.2,
        maxHeight:60,
        minHeight:40,
        backgroundColor:"#ef5350",
        elevation:3,
        borderBottomColor:'#eee',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:15,
        paddingRight:15
    },
    sInput:{
        flex:0.9,
        backgroundColor:'#ef5350',
        elevation:15,
        height:40,
        color:'white',
        paddingLeft:10,
        paddingRight:10,
    },
    title:{
        color:'white',
        fontWeight:"bold",
        fontSize:16,
    }
})

const mapStateToProps = state =>{
    return{
        user : state.AuthReducer.user,
        cv : state.CvReducer.cv
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user)),
        add_cv:(cv)=>dispatch(Add_Cv(cv))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)