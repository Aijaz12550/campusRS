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
import { faHeart, faBars, faSearch, faWindowClose, } from '@fortawesome/free-solid-svg-icons'


 class Home extends Component {
    state={
        login:false,main:true,
        WIDTH:300,refreshing:false, setRefreshing:false,heart:false,search:false,
        resultArray:[],v:null,more:false,
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
    this._getAll()
 }
 async _getAll(){
    await fetch(`http://${ip}:3000/company/allcompanies`,{
        method:"GET",
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.user.token}`
        }
    })
    .then(res=>res.json())
    .then(data=>{
        this.setState({comps:data.result})
        console.log("~~comp~~",data)
      })
    .catch(e=>{console.log('~~err~~',e)})
}

   _onRefresh = () => {
    this.setState({refreshing: true});
    this._getAll()
    setTimeout(()=>{
        this.setState({refreshing: false})
    },10000)
  }


  _search(v){
      let { comps } = this.state;
      let flag = false;
     
      for( var i = 0; i < comps.length; i++ ){

        let res = comps.filter( a => (a.title).toLowerCase().indexOf(v.toLowerCase()) != -1)

        if(res.length){
            flag = true
            this.setState({resultArray:res,v})
        }else if(v){
            this.setState({v,})
        }else{
            this.setState({v:null})
        }
        if(i == comps.length-1 && !flag){
            this.setState({resultArray:[]})
        }

      }
  }

//_____________________________________________________action

async _action(action,jobId){
    await fetch(`http://${ip}:3000/company/action`,{
        method:'POST',
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.user.token}`
        },
        body:JSON.stringify({
            id:jobId,
            action:{
                _id:this.props.user._id,
            action:action
            }
        })

    }).then( res => res.json())
    .then( data => {
        console.log('Action Added')
    }).catch( e => {
        console.log('error~~~~~~~~',e)
    })
}
    render(){
        let { login,main, companies,refreshing, setRefreshing,comps, heart, search,v,resultArray } = this.state
        
        


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

data={[{name:'React Native',_id:'1',color:'#296'},{name:'React Js',_id:'2',color:'coral'},{name:'JavaScript',_id:'3'},
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
    {!v &&
                      
                       <FlatList
                               refreshControl={
                                   <RefreshControl
                                  refreshing={this.state.refreshing}
                                  onRefresh={this._onRefresh}
                                  />
                                }
/**
 * [{"__v": 0, "_id": "5dd53a7fb5275622f4e78ec0", "actions": [Array], "applications": [Array], "cId": "_id", "experience": "experience", 
 * "hired": [Array], "job_responsibility": "res", "job_type": "jobType", "positions": "positions", "required_qualification": "qualification", 
 * "salary": "salary", "skills": "skills", "timestamp": "String", "title": "title"}, {"__v": 0, "_id": "5dd53d5de1604709b08cd3f9", 
 * "actions": [Array], "applications": [Array], "cId": "5dd527fc5644ec224cbd2781", "experience": "2", "hired": [Array], "job_responsibility":
 *  "Response
Hg", "job_type": "Remote", "positions": "5", "required_qualification": "Graduation", "salary": "2000000", "skills": "Redux", 
"timestamp": "1574255960479", "title": "React Native Developer"}
 */
        data={comps}
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

{/* _____________________________________________________like */}
<FlatList
data={item.actions}
renderItem={({item})=>}
/>
    {heart == item._id
     ?
<TouchableOpacity >
    <FontAwesomeIcon onPress={()=>this._action(false,item._id)} size={20} color="red" icon={faHeart} />
</TouchableOpacity>
:
<TouchableOpacity onPress={()=>this._action(true,item._id)}  >
<FontAwesomeIcon  icon={faHeart} />
</TouchableOpacity>
}
// _______________________________________________________________end

<TouchableOpacity  >
<Text  style={{fontSize:16,fontWeight:'bold',color:"navy"}}> more</Text>
</TouchableOpacity>

</View>

</TouchableOpacity>
}
keyExtractor={item => item._id}
/>

   
   
   
// }
// keyExtractor={item => item._id}
// />
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
        user : state.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)