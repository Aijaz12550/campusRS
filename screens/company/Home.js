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

 const {path} = Svg
 const {width} = Dimensions.get('window')
 const height = 64



 class Home extends Component {
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

     // CUSTOMIZATION OF STACK HEADER
     static navigationOptions = ({navigation}) => {
        return{

            title: 'Home',
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

 componentDidMount(){
    //  console.log('~~props~~',this.props)
     this._myCompanies()
 }


//  -----getting companies

   async _myCompanies(){
       console.log('chala')
       await fetch(`https://pacific-shore-10571.herokuapp.com/company/myCompanies`,{
           method:'POST',
           headers:{
               "Content-Type":'application/json',
               authorization:`Bearer ${this.props.user.token}`
           },
           body:JSON.stringify({
               _id:this.props.user._id
           })
       }).then(res=>res.json())
       .then(data=>{
           this.setState({companies:data.result})
           this.setState({refreshing: false});
           console.log('~~myCompany~~~~',data)
       }).catch(e=>{
        this.setState({refreshing: false});
           console.log('~~~mycompany~Error~~',e)
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
        
const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];
  
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

{ !companies && <ScrollView style={{flex:1,backgroundColor:'lightgray'}}  refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      } ></ScrollView>}

<View style={styles.container}>
                       <FlatList
                       refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                        />
                      }

        data={companies}
        renderItem={({ item }) => <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} >
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
            <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>{item.companyName}</Text>
        </View>

        <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
            <Text style={{fontSize:16,fontWeight:'bold'}}>History :</Text>
            <View>
            <Text >Added On : 23/11/19</Text>
        {/* <Text>Total Jobs Posted : {item.Jobs.length}</Text> */}
            <Text>Total Hired : 10</Text>
                    <Text style={{color:'#296'}}>Active Jobs : {item.activeJobs.length}</Text>
        </View>


        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'space-between',marginTop:10}}>
            
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('PostJob',{owner:item._id})}>
            <Text style={{fontSize:16,fontWeight:'bold',color:"green"}}>+ post job</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>this.props.navigation.navigate("CompanyDetail",{company:item})} >
            <Text style={{fontSize:16,fontWeight:'bold',color:"navy"}}> Detail</Text>
            </TouchableOpacity>
            
        </View>

        
    </TouchableOpacity>
    }
        keyExtractor={item => item._id}
      />
                  
 

               {/* Add_button */}
<TouchableOpacity  onPress={()=>this.props.navigation.navigate('AddCompany')} style={styles.addModal}>
    <Text style={styles.addModalTxt}>+</Text>
</TouchableOpacity>

              

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
export default connect(mapStateToProps,mapDispatchToProps)(Home)