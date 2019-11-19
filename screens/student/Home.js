import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User} from '../../store/actions/index'

 const {path} = Svg
 const {width} = Dimensions.get('window')
 const height = 64



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

            title: 'Jobs Feed',
                //  toggle
            headerLeft: 
            <TouchableOpacity onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())}
             style={{ display:'flex',flexDirection:'column',marginLeft:10,alignSelf:"center",}}>

        <Text style={{  width:30,height:3,backgroundColor:'#ef5350',alignSelf:"center", marginBottom:4.5}}></Text>
        <Text style={{  width:30,height:3,backgroundColor:'#ef5350',alignSelf:"center", marginBottom:4.5}}></Text>
        <Text style={{  width:30,height:3,backgroundColor:'#ef5350',alignSelf:"center", marginBottom:4.5}}></Text>
         </TouchableOpacity>,
    //   toggle end

        headerStyle: {
            backgroundColor:'white'
            // backgroundColor: '#946638',
        },
        headerTintColor: '#ef5350',
        headerTitleStyle: {
            fontWeight: 'bold',
            color:'#ef5350'
        },
    }
 };

 componentDidMount(){
     console.log('~~props~~',this.props)
 }


    render(){
        let { login,main } = this.state
        return(
            <View style={{flex:1}}>
<StatusBar backgroundColor="#ef5350" barStyle="light-content" />
<View style={styles.container}>
<ScrollView>

{/* _____________-CARD_____________- */}
           <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                   <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Job Title</Text>
                   </View>

                   <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                       <Text >Company : ABC</Text>
                       <Text >Experience : 2-Years</Text>
                       <Text>Total Positions : 2 </Text>
                       <Text>Qualification : Bachelor</Text>
                       <Text>Location : Karachi</Text>
                       <Text>Last Date : 1/1/19</Text>

                   </View>
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'space-between',marginTop:10}}>
                       
                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostJob')}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"green"}}>Apply</Text>
                       </TouchableOpacity>

                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostJob')}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Save</Text>
                       </TouchableOpacity>

                       <TouchableOpacity>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"navy"}}> Detail</Text>
                       </TouchableOpacity>
                   </View>

                   
               </TouchableOpacity>


               {/* _____________-CARD_____________- */}
           <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                   <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Job Title</Text>
                   </View>

                   <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                       <Text >Company : ABC</Text>
                       <Text >Experience : 2-Years</Text>
                       <Text>Total Positions : 2 </Text>
                       <Text>Qualification : Bachelor</Text>
                       <Text>Location : Karachi</Text>
                       <Text>Last Date : 1/1/19</Text>

                   </View>
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'space-between',marginTop:10}}>
                       
                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostJob')}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"green"}}>Apply</Text>
                       </TouchableOpacity>

                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostJob')}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Save</Text>
                       </TouchableOpacity>

                       <TouchableOpacity>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"navy"}}> Detail</Text>
                       </TouchableOpacity>
                   </View>

                   
               </TouchableOpacity>


               {/* _____________-CARD_____________- */}
           <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                   <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Job Title</Text>
                   </View>

                   <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                       <Text >Company : ABC</Text>
                       <Text >Experience : 2-Years</Text>
                       <Text>Total Positions : 2 </Text>
                       <Text>Qualification : Bachelor</Text>
                       <Text>Location : Karachi</Text>
                       <Text>Last Date : 1/1/19</Text>

                   </View>
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'space-between',marginTop:10}}>
                       
                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostJob')}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"green"}}>Apply</Text>
                       </TouchableOpacity>

                       <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostJob')}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Save</Text>
                       </TouchableOpacity>

                       <TouchableOpacity>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"navy"}}> Detail</Text>
                       </TouchableOpacity>
                   </View>

                   
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