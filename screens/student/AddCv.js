import React , { Component } from 'react'
import {
View, Text, TouchableOpacity, TextInput, StyleSheet,SafeAreaView,Dimensions,ScrollView,StatusBar,DatePickerAndroid
} from "react-native"
 import Svg from "react-native-svg"
import Modal from 'react-native-modal'
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux'
// import { Add_User,Remove_User} from '../store/actions/index'
import { Add_User,Remove_User, } from '../../store/actions/index'
import Add_Cv from '../../store/actions/CvAction'
import { Picker, Icon } from 'native-base'
import ip from '../ip'



 class AddCv extends Component {
     
    state={
        login:false,main:true,
        WIDTH:300,
        personalDetail:false,
        educationalDetail:false,
        desL:0,
        pd:false,
        name:'',
        year:null,month:null,day:null,

        degree:null,

        experience:[],index:0, duration:null,designation:null,organization:null,
        
        skills:null,
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

            title: 'Education and Skills Detaill',
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
     if(this.props.cv){

         let { name, skills, year, degree, des, experience,  } = this.props.cv
         this.setState({
             name,
             skills,
             year,
             degree,
             des,
             experience
         })
        }
 }

 onValueChange(value) {
    this.setState({
      selected: value,selectedError:null
    });
  }


//  .........name
 _name(v){
    let { des } = this.state
     if(v.length > 2){
        if(des){
            this.setState({pd:true})
        }
         this.setState({name:v,nameError:null})
     }else{
         this.setState({nameError:'Name must be three charecters long',name:v})
     }
 }

//  ...end



// ..des
_des(v){
    let { name } = this.state
    this.setState({desL:v.length})
    if(v.length>9){
        this.setState({des:v,desError:null})
        if(name){
            this.setState({pd:true})
        }
    }else{
        this.setState({desError:'At least 10 characters..',des:v})
    }
}

async _datePicker(){
    try {
        const { action, year, month, day } = await DatePickerAndroid.open()
        console.log('action',action)
        this.setState({year,month,day})
    } catch (error) {
        
    }
}


// --------------------------------------------------
_more(){
    let { index, duration, designation, organization, experience} = this.state;
    experience[index]={duration, designation, organization}
    if(index < 2){

        this.setState({
            index:index+1,experience,duration:null, designation:null, organization:null,
        })
    }
}


// ---------------------------------------------Add CV
 async _addcv(){
     let {
         name,
         des,
         degree,
         year,month,day,
         skills,
         experience
     } = this.state
    await fetch(`https://pacific-shore-10571.herokuapp.com/users/addcv`,{
        method:'POST',
        headers:{
            "Content-Type" : 'application/json',
            authorization:`Bearer ${this.props.user.token}`
        },
        body:JSON.stringify({
            cv:{
                _id:this.props.user._id,
                name,
                des,
                degree,
                year,
                skills,
                experience,
            }
        })

    })
    .then( res => res.json() )
    .then( result => {
        this.props.add_cv(result.result)
        console.log('~~~//',result)})
        this.props.navigation.navigate('Home')
    .catch( e => console.log('~~error~~~',e))
}
// ---------------------end


// -------------------------_done()
 _done(){
    let { index, duration, designation, organization, experience} = this.state;
    if(duration && designation && organization){
        experience[index] = {duration, designation, organization}
        this.setState({experience,personalDetail:false,educationalDetail:false})
        setTimeout(()=>{
            if(this.props.cv){
                this._updatecv()
            }else{
                this._addcv()
            }
        },2000)
    }else{
        this._addcv()
        this.setState({personalDetail:false,educationalDetail:false})
    }
 }


//
// ---------------------------------------------update CV
 async _updatecv(){
    let {
        name,
        des,
        degree,
        year,month,day,
        skills,
        experience
    } = this.state
   await fetch(`https://pacific-shore-10571.herokuapp.com/users/updatecv`,{
       method:'POST',
       headers:{
           "Content-Type" : 'application/json',
           authorization:`Bearer ${this.props.user.token}`
       },
       body:JSON.stringify({
           cv:{
               _id:this.props.user._id,
               name,
               des,
               degree,
               year,
               skills,
               experience,
           }
       })

   })
   .then( res => res.json() )
   .then( result => {
       console.log('~~~//',result)
       this.props.navigation.navigate('Home')
    })
   .catch( e => console.log('~~error~~~',e))
}
// ---------------------end

    render(){
        let { login,main,
            personalDetail,
            educationalDetail,
            desL,
            name,
            des,
            nameError,
            desError,
            pd,
            year,month,day,
            degree,

            designation,duration,organization,index,experience,

        
        } = this.state

          /**
         * {"__v": 0, "_id": "5dd4134a15baa6343c26fb4b", "degree": "Bachelor", "des": "Gdhdhdhdddhdj", 
         * "experience": [{"_id": "5dde8d292a3d8f2c1ce4b5f6", "designation": "Hdhdh", "duration": "Hxhx", 
         * "organization": "Gdhf"}], "name": "Agsg", "skills": "Gxhddu
", "year": "2019"}
         */
        return(
            <View style={{flex:1}}>
<StatusBar backgroundColor="#ef5350" barStyle="light-content" />
<View style={styles.container}>

{/* _____________-CARD _Personal _Detail_____________- */}
{!personalDetail &&
           <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} >
                   <ScrollView>

                   <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
                       <Text style={{fontSize:16,color:"#ef5350",fontWeight:'bold'}}>Personal Detail</Text>
                   </View>
                   <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                       <TextInput onChangeText={(v)=>this._name(v)} placeholder="Enter Full Name" value={name} style={styles.input}/>
                       {nameError && <Text style={{fontSize:11,color:'red'}} >{nameError}</Text>}

                       <TextInput onChangeText={v=>this._des(v)} placeholder="Describe Your Self.." value={des} multiline={true} maxLength={300} style={[styles.input,{maxHeight:100}]}/>
                       {desError && <Text  style={{fontSize:11,color:'red'}} >{desError}</Text>}

                       <Text style={{fontSize:15,color:"#ef5350",alignSelf:'flex-end'}}>{desL}/300</Text>

                       
                   </View>
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginTop:10}}>
                       


                       {pd ?
                       <TouchableOpacity onPress={()=>this.setState({personalDetail:true})} >
                           <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Next</Text>
                       </TouchableOpacity>
                    :
                    <View >
                    <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350",opacity:0.3}}>Next</Text>
                    </View>
                    }

                       
                   </View>

                   </ScrollView>
               </TouchableOpacity>

}


{/* _____________-CARD _Educational _Detail_____________- */}
{personalDetail && !educationalDetail &&
 <View style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]}>
<ScrollView>

<View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
<Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Educational Detail</Text>
</View>


<View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 

<View style={{borderBottomWidth:1,borderBottomColor:"#ef5350"}}>

<Picker
              mode="dropdown"
              iosHeader="Select your Category"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={this.state.degree}
              onValueChange={(v)=>this.setState({degree:v})}
              >
                <Picker.Item style={{color:'gray'}} label="Highest Degree" value="Select Category" />
              <Picker.Item label="Matric" value="Matric" />
              <Picker.Item label="Intermediate" value="Intermediate" />
              <Picker.Item label="Bachelor" value="Bachelor" />
              <Picker.Item label="Masters" value="Masters" />
              <Picker.Item label="Ph.D" value="Ph.D" />
              
            </Picker>
              </View>

<TouchableOpacity onPress={()=>this._datePicker()} style={{padding:2,marginTop:5}}>
   {!year && <Text style={[styles.input,{fontSize:12}]}>Degree completion Date</Text>}
{year && <Text style={[styles.input,{fontSize:12}]}>{day+"/"+month+"/"+year}</Text>}
</TouchableOpacity>
            <View>

<TextInput onChangeText={v=>this.setState({skills:v})} placeholder="Other Skills..(React Js, React Native e.t.c)" multiline={true} maxLength={300} style={[styles.input,{maxHeight:100}]}/>
            </View>
           



</View>
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginTop:10}}>
                   
                  

                  {(!degree || !year) &&
                   <TouchableOpacity >
                   <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350",opacity:0.3}}>Next</Text>
                   </TouchableOpacity>
                  }

                   {degree && year &&<TouchableOpacity onPress={()=>this.setState({educationalDetail:true})} >
                   <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Next</Text>
                   </TouchableOpacity>}
                   
                   
                   </View>
                   
                   </ScrollView>
                </View> 

            }

               
{/* _____________-CARD _Experience _Detail_____________- */}
{educationalDetail && 
           <TouchableOpacity style={[styles.card,{width:this.state.WIDTH},{shadowOffset:{  width: 30,  height: 30,  },shadowColor:'black',shadowOpacity:1}]} onPress={()=>this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                   <ScrollView>

                   <View style={{display:'flex',justifyContent:'center',alignItems:'center',marginBottom:10}}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>Experience</Text>
                   </View>
                   <Text style={{fontSize:16,fontWeight:'bold',color:"#ef5350"}}>{index+1}.</Text>
                   <View style={{borderBottomColor:"#eee",borderBottomWidth:1,paddingBottom:5}}> 
                       <TextInput onChangeText={(v)=>this.setState({duration:v?v:null})} placeholder="Duration(1-year)" style={styles.input} value={duration}/>
                       <TextInput onChangeText={(v)=>this.setState({designation:v?v:null})} placeholder="Designation" style={styles.input} value={designation} />
                       <TextInput onChangeText={(v)=>this.setState({organization:v?v:null})} placeholder="Organization" style={styles.input} value={organization} />

{ designation && duration && organization && index < 2 &&
                       <TouchableOpacity onPress={()=>this._more()}>

                       <Text 
                       style={{fontSize:14,color:"#ef5350",
                       alignSelf:'flex-end',padding:4,borderRadius:5,textAlign:'center',borderColor:"#ef5350",borderWidth:1,paddingLeft:10,paddingRight:10}}
                       >more</Text>
                       </TouchableOpacity>
                    }
                       

                       
                   </View>
                   <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginTop:10}}>
                       


                       <TouchableOpacity onPress={()=>this._done()}>
                       <Text style={{fontSize:16,fontWeight:'bold',color:"navy",}}>Done</Text>
                       </TouchableOpacity>

                       
                
                       
                   </View>

                   </ScrollView>
               </TouchableOpacity>

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
        margin:5,
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
    input:{
        backgroundColor:'white',
        width:"100%",
        minHeight:40,
        margin:5,
        borderRadius:5,
        alignSelf:'center',
        fontSize:14,
        borderBottomColor:'#ef5350',
        borderBottomWidth:1
    },
})

const mapStateToProps = state =>{
    console.log('>>>>>>>>>',state)
    return{
        user : state.AuthReducer.user,
        cv: state.CvReducer.cv

    }
}

const mapDispatchToProps = dispatch =>{
    return{
        add_user : (user)=>dispatch(Add_User(user)),
        add_cv:(cv)=>dispatch(Add_Cv(cv))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddCv)


/**
 * 
 *  async _getAll(){
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
 */