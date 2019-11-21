import React , { Component } from 'react'
import {
View, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar,ImageBackground
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User} from '../../store/actions/index'
import AddCompany from './AddCompany'
import { BottomNavigation, Text, } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAddressBook, faHome, faMale,  faDoorClosed,faArrowLeft, faCheck, faList, faThList,faPaperPlane, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import img from './image'
import Pending from './jobs/pending'
import ShortList from './jobs/shortlisted'
import Selected from './jobs/selected'


const MusicRoute = () => <Text style={[ { backgroundColor: '#673ab7',flex:1 }]}>Music</Text>;

const AlbumsRoute = () => <Text  style={[ { backgroundColor: '#ef5350',flex:1 }]}>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;
 
  

 class Home extends Component {

    
    state={
        login:false,main:true,
        WIDTH:300,
        item:this.props.navigation.getParam('company'),
        index: 0,
    // routes: [
    //   { key: 'music', title: 'Home', icon: props=><FontAwesomeIcon  color={'#296'} icon={faHome} /> , color:'#ef5350'},
    //   { key: 'albums', title: 'Active Jobs', icon: ()=><FontAwesomeIcon icon={faMale} /> ,color:'pink' },
    //   { key: 'recents', title: 'Closed Jobs', icon: ()=><FontAwesomeIcon icon={faDoorClosed} />,color:'#eee'},
    // ],
    }
    constructor(props){
        super(props);
        Dimensions.addEventListener('change',(dims)=>{
            this.setState({
                WIDTH:Dimensions.get('window').width > 500 ? 500 :300
            })
        })
    }



    static navigationOptions = {
        header: null,
      };

 componentDidMount(){
     console.log('~~props~~',this.props)
 }
/**
 * {"result": [{"Jobs": [Array], "__v": 0, "_id": "5dd1a4f9dfe16e15301c3aba", "closeJobs": [Array], 
 * "companyName": "Future", "description": "We are working on following technology from 10 years..",
 *  "location": "Karachi", "ownerId": "5dcff5e85af7c535e83a3bce", "service": "Software Development", 
 * "timestamp": "1574020344528", "totalEmployees": 20}, {"Jobs": [Array], "__v": 0, "_id": "5dd1b74ce49d161bd49b50de", 
 * "closeJobs": [Array], "companyName": "Future", "description": "We are working on following technology from 10 years..", 
 * "location": "Karachi", "ownerId": "5dcff5e85af7c535e83a3bce", "service": "Software Development", "timestamp": "1574025032996", 
 * "totalEmployees": 20}, {"Jobs": [Array], "__v": 0, "_id": "5dd1b88de49d161bd49b50df", "closeJobs": [Array], "companyName": "Future",
 *  "description": "We are working on following technology from 10 years..", 
 * "location": "Karachi", "ownerId": "5dcff5e85af7c535e83a3bce", "service": "Software Development", "timestamp": "1574025356607",
 *  "totalEmployees": 20}]}
 */
 
 _handleIndexChange = index => this.setState({ index });

 _renderScene = BottomNavigation.SceneMap({
   music:()=> <Pending/>,
   albums: ()=><ShortList/>,
   recents: ()=><Selected/>,
 });

    render(){
        let { login,main,index } = this.state
       const routes = [
            { key: 'music', title: 'Pending', icon: props=><FontAwesomeIcon  color={index == 0 &&'white'} size={index == 0 ? 23:18} icon={faFlagCheckered} /> , color:'#ef5350'},
            { key: 'albums', title: 'Short listed', icon: ()=><FontAwesomeIcon color={index == 1 &&'#296'} size={index == 1 ? 23:18} icon={faList} /> ,color:'#ffab00' },
            { key: 'recents', title: 'Selected', icon: ()=><FontAwesomeIcon color={index == 2 &&'white'} size={index == 2 ? 23:18} icon={faCheck} />,color:'#296'},
          ]
        return(
            <View style={{flex:1}}>
                <StatusBar backgroundColor="#ef5350" barStyle="light-content" />
<ImageBackground style={[styles.banner]} >

<TouchableOpacity style={{marginLeft:5,padding:5}}>
    <FontAwesomeIcon color='white' size={23} icon={faArrowLeft} />
</TouchableOpacity>

<TouchableOpacity style={{alignSelf:'center',backgroundColor:'#ef5350',borderRadius:15,paddingLeft:10,paddingRight:10,padding:4,marginBottom:10,elevation:10}}>
    <Text style={{color:'white',fontSize:15,}}>React Native Developer</Text>
</TouchableOpacity>


<TouchableOpacity style={{alignSelf:'flex-start',paddingLeft:10,paddingRight:10,padding:4,marginBottom:10,elevation:10}}>
    {index == 1 && <Text style={{color:'white',fontSize:15,}}>Short Listed Candidates</Text>}
    {index == 0 && <Text style={{color:'white',fontSize:15,}}>Candidates</Text>}
    {index == 2 && <Text style={{color:'white',fontSize:15,}}>Selected Candidates</Text>}
</TouchableOpacity>
</ImageBackground>
            <BottomNavigation
            activeColor={index == 2 ? "white" : (index == 1?"#295":"white")}
            barStyle={{backgroundColor:'white'}}
            shifting={true}
            sceneAnimationEnabled={true}
        navigationState={{index,routes}}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
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
        
    },
    HeaderContainer:{
        minHeight:200,
        backgroundColor:'white'
    },
    banner:{
        backgroundColor:'#ef5350',
        flex:0.2,
        justifyContent:'space-between',
        minHeight:20
    },
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