import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar, ImageBackground, Animated, PanResponder
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
import { faRemoveFormat, faBox , faBoxOpen, faList, faBuilding, faUsers, } from '@fortawesome/free-solid-svg-icons'





 class Home extends Component {
    state={
        login:false,main:true,
        WIDTH:300,companyCount:0,textToRender:'',modal:false,modal1:false
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

            title: 'Admin',
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

 componentWillMount(){
     this.PanResponder = PanResponder.create({
         onStartShouldSetPanResponder:(evt,gestureState)=>true,
         onPanResponderMove:(evt,gestureState)=>{
             console.log('pan',gestureState.dx,"y>>",gestureState.dy,evt)
          this.position.setValue({
              x : gestureState.dx,
              y:gestureState.dy
          })
         },
         onPanResponderRelease:(evt,gestureState)=>{
                if(gestureState.dx < -110){
                    this.setState({modal:true,textToRender:'Are you sure to Delete All companies.'})
                    this.position.setValue({
                        x:0,y:0
                    })
                }
                if(gestureState.dx > 110){
                    this.props.navigation.navigate('AllC')
                }
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
               if(gestureState.dx > 110){
                   
                this.props.navigation.navigate('AllU')
                   this.pos.setValue({
                       x:0,y:0
                   })
               }
               
               this.pos.setValue({
                x:0,y:0
            })
        }
        
    })
 }

 componentDidMount(){
     console.log('~~props~~',this.props)
     this._companycount()
     this._usercount()
 }


 async _companycount(){
     await fetch(`https://pacific-shore-10571.herokuapp.com/company/countcompanies`,{
         method:'GET',
         headers:{
             "Content-Type":'application/json',
             authorization:`Bearer ${this.props.user.token}`
         }
     }).then( res => res.json()).then( data => {
         console.log('count',data)
         this.setState({companyCount:data.result})
     }).catch( e=>{
         console.log('ee>>>',e)
     })
 }

 
 async _usercount(){
    await fetch(`https://pacific-shore-10571.herokuapp.com/users/countusers`,{
        method:'GET',
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.user.token}`
        }
    }).then( res => res.json()).then( data => {
        console.log('count_users',data)
        this.setState({userCount:data.result})
    }).catch( e=>{
        console.log('ee',e)
    })
}



 
async _deleteAllUsers(){
    await fetch(`https://pacific-shore-10571.herokuapp.com/users/deleteAllstudents`,{
        method:'DELETE',
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.user.token}`
        }
    }).then( res => res.json()).then( data => {
        console.log('count_users',data)
        this.setState({modal:false,id:null})
    }).catch( e=>{
        console.log('ee',e)
        this.setState({modal:false,id:null})
    })
}




 
async _deleteAllCompanies(){
    await fetch(`https://pacific-shore-10571.herokuapp.com/company/deleteAllCompanies`,{
        method:'DELETE',
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.user.token}`
        }
    }).then( res => res.json()).then( data => {
        console.log('count_users',data)
        this.setState({modal:false,id:null})
    }).catch( e=>{
        console.log('ee',e)
        this.setState({modal:false,id:null})
    })
}

    render(){
        let { login,main,companyCount,userCount, modal, textToRender,modal1, WIDTH } = this.state
        return(
            <View style={{flex:1}}>
<StatusBar backgroundColor="#ef5350" barStyle="light-content" />

{ WIDTH < 500 && <ImageBackground source={{uri:img}} style={[styles.banner]} ></ImageBackground>}
<View style={styles.container}>
<ScrollView contentContainerStyle={{alignItems:'center',justifyContent:'center'}}>

           <Animated.View 
           {...this.PanResponder.panHandlers}
           style={[{transform:this.position.getTranslateTransform()},styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                   <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10,flexDirection:'column'}}>
                       <FontAwesomeIcon icon={faBuilding} size={25} color="#ef5350" />
                       <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Companies</Text>
                   </View>

                   <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                      
                       <Text >Total Registerd Companies : {companyCount} </Text>
                      
                   </View>
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'space-between',marginTop:10}}>
                       
                   <TouchableOpacity onPress={()=>this.setState({modal:true,textToRender:'Are you sure to delete all companies.'})}>
                       <FontAwesomeIcon icon={faBoxOpen} size={25} color="red" />
                       <Text style={{fontSize:9,color:"red"}}>Delete </Text>
                       </TouchableOpacity>

                       <TouchableOpacity>
                           <FontAwesomeIcon icon={faList} size={22} color={'#296'} />
                       <Text style={{fontSize:9,color:"#296"}}>Detail</Text>
                       </TouchableOpacity>
                   </View>

                   
               </Animated.View>


               <Animated.View
               {...this.Pan.panHandlers}
                style={[ {transform:this.pos.getTranslateTransform()}, styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                   <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
                       <FontAwesomeIcon icon={faUsers} color="#ef5350" size={25} />
                       <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Users</Text>
                   </View>

                   <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                       
                       <Text >Total Registerd Users : {userCount}  </Text>
                     
                   </View>

                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:10}}>
                       
                     
                   <TouchableOpacity onPress={()=>this.setState({modal1:true,textToRender:'Are you sure to delete all users.'})} >
                       <FontAwesomeIcon icon={faBoxOpen} size={25} color="red" />
                       <Text style={{fontSize:9,color:"red"}}>Delete </Text>
                       </TouchableOpacity>

                       <TouchableOpacity>
                           <FontAwesomeIcon icon={faList} size={22} color={'#296'} />
                       <Text style={{fontSize:9,color:"#296"}}>Detail</Text>
                       </TouchableOpacity>
                   </View>

                   
               </Animated.View>


              

</ScrollView>




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

                          <TouchableOpacity onPress={()=>this._deleteAllCompanies()} style={{margin:10,width:80,backgroundColor:'#296',padding:5}} >
                              <Text style={{color:'white',textAlign:'center'}}  >Yes</Text>
                          </TouchableOpacity>

                      </View>

                  </View>
              </Modal>

              {/* ------------------------------------------------------------------------------------- */}





              {/* ============================================ */}
              
{/* ---------------------------------model to confirm delete---------------- */}
<Modal 
              style={{justifyContent:'center',padding:10,}}
               isVisible={modal1}
               backdropColor="#ef5350"
               backdropOpacity={0.3}
               animationIn='slideInLeft' 
               animationInTiming={400} 
               swipeDirection={['left','right']} 
               onSwipeComplete={()=>this.setState({modal1:false})}
               >
                  <View style={{backgroundColor:'#eee',flex:0.2,justifyContent:'space-around',borderRadius:10}} >

                  <View style={{justifyContent:'center',alignItems:'center',borderRadius:10}}>
                  <Text style={{color:'#ef5350',textAlign:'center',fontSize:16,fontWeight:'bold'}} >{textToRender}</Text>
                  </View>

                      <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}} >

                          <TouchableOpacity  onPress={()=>this.setState({modal1:false})} style={{margin:10,width:80,backgroundColor:'#ef5350',padding:5}}>
                              <Text style={{color:'white',textAlign:'center'}} >No</Text>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={()=>this._deleteAllUsers()} style={{margin:10,width:80,backgroundColor:'#296',padding:5}} >
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