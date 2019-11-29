import React, { Component } from 'react'
import { View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    Animated,
    PanResponder,
    Dimensions,
    UIManager,
    LayoutAnimation,
} from 'react-native'

import Modal from 'react-native-modal'
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User} from '../../store/actions/index'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRemoveFormat, faBox , faBoxOpen, faList, faBuilding, faUsers, } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'


 class List extends Component{
state={
    WIDTH:300,modal:false,textAlign:'',id:null
}

    constructor(props){
        super(props);
        Dimensions.addEventListener('change',(dims)=>{
            this.setState({
                WIDTH:Dimensions.get('window').width > 500 ? 500 :300
            })
        })


        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        this.panResponder = PanResponder.create({

            onStartShouldSetPanResponder : () => false,
            onStartShouldSetPanResponderCapture : () => false,
            onMoveShouldSetResponderCapture : ()=> true,

            onMoveShouldSetPanResponderCapture : ( evt, gestureState ) => {
                const { dx, dy } = gestureState;
                if(dx>2 || dx < -2 || dy > 5 || dy < -5) {
                    return true;
                }else{return false;}
            },

            onPanResponderMove : ( evt, gestureState ) => {
                this.onMoveX(gestureState.dx);
            },
            onPanResponderTerminate : ( evt, gestureState ) => {
                this.onPanResponderRelease(gestureState);
            },
            onPanResponderRelease : ( evt, gestureState ) => {
                this.onPanResponderRelease(gestureState);
            }

            
        })
    }

    onMoveX = (dx) => {
        this.refs['task'].setNativeProps({style:{transform :[{translateX:dx}]}})
    }

    onPanResponderRelease = ( gestureState ) => {
        console.log('pan_val',Math.abs(gestureState.dx))
        if (Math.abs(gestureState.dx) < Dimensions.get('window').width/2){

            this.refs['task'].setNativeProps({style:{transform:[{translateX:0}]}})
        }
        if(Math.abs(gestureState.dx)>= Dimensions.get('window').width/2){
            LayoutAnimation.configureNext(LayoutAnimation.create(300, "easeInEaseOut", 'opacity'))
            this.refs['task'].setNativeProps({style:{transform:[{translateX:Dimensions.get('window').width}]}})
            // this.props.handleDeleteTask(this.props.item.id);
        }
    }


    // ---------------------------------------
    
 async _deleteCompany(id){
    await fetch(`https://pacific-shore-10571.herokuapp.com/company/deleteOneCompany/${id}`,{
        method:'DELETE',
        headers:{
            "Content-Type":'application/json',
            authorization:`Bearer ${this.props.token}`
        }
    }).then( res => res.json()).then( data => {
        this.setState({
            id:null,
            modal:false
            
        })
        this.props.getAll(this.props.token,this.props.this)
        console.log('delete_company',data)
        
    }).catch( e=>{
        console.log('ee',e)
    })
}


    


    render(){
        let { modal, textToRender, id } = this.state;
        return(
            

               <Animated.View 
               ref='task'
    {...this.panResponder.panHandlers}
   
        style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} >
                
                
                <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10,flexDirection:'column'}}>
                    <FontAwesomeIcon icon={faBuilding} size={25} color="navy" />
    <Text style={{fontSize:16,fontWeight:'bold',color:"navy"}}>{this.props.item.companyName}</Text>
                </View>



                <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                   
                    <Text >Added :{moment(JSON.parse(this.props.item.timestamp)).fromNow()} </Text>
                   
                    <Text style={{marginTop:7}}>Total Employees :{this.props.item.totalEmployees} </Text>
                    <Text style={{marginTop:7}}>Total Jobs Posted :{this.props.item.activeJobs.length} </Text>
                    <Text style={{marginTop:7}}>Location :{this.props.item.location} </Text>
                    <Text style={{marginTop:7}}>Services :{this.props.item.service} </Text>

                   
                </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'space-between',marginTop:10}}>
                    
                <TouchableOpacity onPress={()=>this.setState({modal:true,textToRender:`Are you sure to delete ${this.props.item.companyName}`,id:this.props.item._id})}>
                    <FontAwesomeIcon icon={faBoxOpen} size={25} color="red" />
                    <Text style={{fontSize:9,color:"red"}}>Delete </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CompanyDetail',{id:this.props.item._id})} >
                        <FontAwesomeIcon icon={faList} size={22} color={'#296'} />
                    <Text style={{fontSize:9,color:"#296"}}>Detail</Text>
                    </TouchableOpacity>
                </View>

                

                

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

                          <TouchableOpacity onPress={()=>this._deleteCompany(id)} style={{margin:10,width:80,backgroundColor:'#296',padding:5}} >
                              <Text style={{color:'white',textAlign:'center'}}  >Yes</Text>
                          </TouchableOpacity>

                      </View>

                  </View>
              </Modal>

              {/* ------------------------------------------------------------------------------------- */}
            </Animated.View>
            
        )
    }
}



const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white'
    },
    absolute:{
        position:'absolute',
        width:'100%',
        height:'100%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'red',
        flexDirection:'row'
    },
    text:{
        marginVertical:20,
        fontSize:20,
        marginLeft:10,
    },
    menu:{
        width:20,
        height:2,
        backgroundColor:'silver',
        margin:2,
        marginHorizontal:10,
        borderRadius:2
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
export default connect(mapStateToProps,mapDispatchToProps)(List)