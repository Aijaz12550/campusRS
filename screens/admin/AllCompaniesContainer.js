import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,
ScrollView,StatusBar, ImageBackground, Animated, PanResponder, FlatList,
UIManager,LayoutAnimation
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
import moment from 'moment'
import List from './AllCompanies'





 class Home extends Component {
    state={
        login:false,main:true,
        WIDTH:300,companyCount:0,textToRender:'',modal:false, id :null
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

            title: 'All Companies',
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

 componentDidMount(){
     console.log('~~props~~',this.props)
     this._companycount()
    
 }


 async _companycount(token = this.props.user.token, th=this){
     await fetch(`https://pacific-shore-10571.herokuapp.com/company/getAllCompanies`,{
         method:'GET',
         headers:{
             "Content-Type":'application/json',
             authorization:`Bearer ${token}`
         }
     }).then( res => res.json()).then( data => {
         console.log('company',data)
         th.setState({companies:data.result})
     }).catch( e=>{
         console.log('ee',e)
     })
 }

 

    render(){
        let { login,main,companyCount,userCount, modal, textToRender, companies, id } = this.state
        return(
            <View style={{flex:1}}>
                <StatusBar backgroundColor="#ef5350" barStyle="light-content" />
<View style={styles.container}>

    <FlatList
    data={companies}
    renderItem={({item,index})=><List item={item} index={index} navigation={this.props.navigation}
    token={this.props.user.token}
    this={this}
     getAll={this._companycount}/>}
    keyExtractor={item=>item._id}
    />



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