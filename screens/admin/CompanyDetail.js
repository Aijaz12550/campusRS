import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar, ImageBackground, Animated, PanResponder, FlatList
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User} from '../../store/actions/index'
import ip from '../ip'
import img from '../company/image'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRemoveFormat, faBox , faBoxOpen, faList, faBuilding, faUsers,faPersonBooth } from '@fortawesome/free-solid-svg-icons'





 class Home extends Component {
    state={
        login:false,main:true,
        WIDTH:300,companyCount:0,textToRender:'',modal:false, id :null
    }
    constructor(props){
        super(props);
        this.position= new Animated.ValueXY()
        this.pos = new Animated.ValueXY()
        Dimensions.addEventListener('change',(dims)=>{
            this.setState({
                WIDTH:Dimensions.get('window').width > 500 ? 500 :300
            })
        })
    }


     // CUSTOMIZATION OF STACK HEADER
     static navigationOptions = ({navigation}) => {
        return{

            title: 'Company Detail',
                //  toggle
            headerLeft: 
            <TouchableOpacity 
             onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}
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

 componentWillMount(){
     this.PanResponder = PanResponder.create({
         onStartShouldSetPanResponder:(evt,gestureState)=>true,
         onPanResponderMove:(evt,gestureState)=>{
             console.log('event',evt)
          this.position.setValue({
              x : gestureState.dx,
              y:gestureState.dy
          })
         },
         onPanResponderRelease:(evt,gestureState)=>{
                // if(gestureState.dx < -110){
                //     this.setState({modal:true,textToRender:'Are you sure to Delete All companies.'})
                //     this.position.setValue({
                //         x:0,y:0
                //     })
                // }
                this.position.setValue({
                    x:0,y:0
                })
         }
         
     })

     this.Pan = PanResponder.create({
        onStartShouldSetPanResponder:(evt,gestureState)=>true,
        onPanResponderMove:(evt,gestureState)=>{
            console.log('pan',gestureState.dx,"y>>",gestureState.dy,evt)
         this.pos.setValue({
             x : gestureState.dx,
             y:gestureState.dy
         })
        },
        onPanResponderRelease:(evt,gestureState)=>{
            //    if(gestureState.dx > 110){
            //        this.setState({modal:true})
            //        this.pos.setValue({
            //            x:0,y:0
            //        })
            //    }
        }
        
    })
 }

 componentDidMount(){
     console.log('~~company detail ====',this.props.navigation.getParam('id'))
     let id = this.props.navigation.getParam('id')
     this._companydetail(id)

    
 }


 async _companydetail(id){
     await fetch(`http://${ip}:3000/company/companyDetail/${id}`,{
         method:'GET',
         headers:{
             "Content-Type":'application/json',
             authorization:`Bearer ${this.props.user.token}`
         },
     }).then( res => res.json()).then( data => {
         console.log('company_jobs---------',data)
         this.setState({companies:data.result})
     }).catch( e=>{
         console.log('ee',e)
     })
 }

 
 async _deletejob(id){
    await fetch(`http://${ip}:3000/company/deletejob/${id}`,{
        method:'DELETE',
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.user.token}`
        }
    }).then( res => res.json()).then( data => {
        this.setState({
            id:null,
            modal:false
        })
        console.log('delete_company',data)
        
    }).catch( e=>{
        console.log('ee',e)
    })
}


    render(){
        let { login,main,companyCount,userCount, modal, textToRender, companies, id,WIDTH } = this.state
        return(
            <View style={{flex:1}}>
                <StatusBar backgroundColor="#ef5350" barStyle="light-content" />
{/* 
<ImageBackground source={{uri:img}} style={[styles.banner]} >

</ImageBackground> */}
<View style={styles.container}>

    <FlatList
    data={companies?companies.activeJobs:[]}
    renderItem={({item})=> <Animated.View 
        {...this.PanResponder.panHandlers}
        style={[{transform:this.position.getTranslateTransform()},styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10,flexDirection:'column'}}>
                    <FontAwesomeIcon icon={faPersonBooth} size={25} color="#296" />
    <Text style={{fontSize:16,fontWeight:'bold',color:"#296"}}>{item.title}</Text>
                </View>

                <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                   
                    <Text style={{marginTop:8}} >Required Qualification : {item.required_qualification} </Text>
                    <Text style={{marginTop:8}} >Required Experience : {item.experience} </Text>
                    <Text style={{marginTop:8}} >Required Skills : {item.skills} </Text>
                    <Text style={{marginTop:8}} >Job Type : {item.job_type} </Text>
                    <Text style={{marginTop:8}} >Vacant Positions : {item.positions} </Text>
                   
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'space-between',marginTop:10}}>
                    
                <TouchableOpacity onPress={()=>this.setState({modal:true,textToRender:`Are you sure to delete this job?`,id:item._id})}>
                    <FontAwesomeIcon icon={faBoxOpen} size={25} color="red" />
                    <Text style={{fontSize:9,color:"red"}}>Delete </Text>
                    </TouchableOpacity>

                    
                </View>

                
            </Animated.View>
            }
            keyExtractor={item=>item._id}
    />


{/* ---------------------------------model to confirm delete---------------- */}
              <Modal 
              style={{justifyContent:'center',padding:10,}}
               isVisible={modal}
               backdropColor="#ef5350"
               backdropOpacity={0.3}
               animationIn='slideInLeft' 
               animationInTiming={400} 
               swipeDirection={['left','right']} 
               onSwipeComplete={()=>this.setState({modal:false})}
               >
                  <View style={{backgroundColor:'#eee',flex:0.2,justifyContent:'space-around',borderRadius:10}} >

                  <View style={{justifyContent:'center',alignItems:'center',borderRadius:10}}>
                  <Text style={{color:'#ef5350',textAlign:'center',fontSize:16,fontWeight:'bold'}} >{textToRender}</Text>
                  </View>

                      <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}} >

                          <TouchableOpacity  onPress={()=>this.setState({modal:false})} style={{margin:10,width:80,backgroundColor:'#ef5350',padding:5}}>
                              <Text style={{color:'white',textAlign:'center'}} >No</Text>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={()=>this._deletejob(id)} style={{margin:10,width:80,backgroundColor:'#296',padding:5}} >
                              <Text style={{color:'white',textAlign:'center'}}  >Yes</Text>
                          </TouchableOpacity>

                      </View>

                  </View>
              </Modal>

              {/* ------------------------------------------------------------------------------------- */}

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
        margin:10,
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
    banner:{
        backgroundColor:'#ef5350',
        flex:0.2,
        justifyContent:'space-between',
        minHeight:70
    },
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
export default connect(mapStateToProps,mapDispatchToProps)(Home)