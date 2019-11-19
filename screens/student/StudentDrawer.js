import React, { Component } from 'react'
import { View, Text,StyleSheet,TouchableHighlight,TouchableOpacity,Image,ScrollView, } from 'react-native'
import { DrawerActions } from 'react-navigation-drawer';

// redux..
import { connect } from 'react-redux'
import { Remove_User } from '../../store/actions/index'

 class DrawerContent extends Component {
state ={
    company:['Add New Job','Open Jobs','Closed Jobs'],
    Student :['My Jobs', 'My Profile'],
    Admin:['Companies','Students']
}
  
_navigate(route,param){
    this.props.navigation.navigate(route,param)
}

_signout(){
    this.props.signout()
}
    render() {
        
        return (
            <TouchableOpacity activeOpacity={0.5}  style={styles.drawerTransparent}>
                 <TouchableOpacity  activeOpacity={1} style={styles.drawer}>
                <ScrollView>
                    
                    <View style={styles.header}>
                        <TouchableOpacity onPress={()=>this.props.navigation.dispatch(DrawerActions.closeDrawer())} style={{alignSelf:'flex-end',marginRight:15}}><Text style={[styles.text,{color:'white',fontSize:18}]}>{'X'}</Text></TouchableOpacity>
                          <Image  style={styles.headerImage} />
                          <Text style={[styles.text,{color:'white'}]}>Muhammad Aijaz Abbasi</Text>
                    </View>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')} underlayColor={'coral'}>
                        <View style={styles.row}>
                        
                        <Text  style={styles.text}>Job Feed</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('MyJobs')}  underlayColor={'rgba(23,30,20,0.2)'}>
                        <View style={styles.row}>
                        
                        <Text  style={styles.text}>My Jobs</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CV')}  underlayColor={'rgba(23,30,20,0.2)'}>
                        <View style={styles.row}>
                        
                        <Text  style={styles.text}>Create CV</Text>
                        </View>
                    </TouchableOpacity>


                     

                     
                    {/* _____________________________________________________________________ */}
                    <View style={styles.line}></View>
                    
                    <TouchableOpacity onPress={()=>this._signout()}   underlayColor={'rgba(23,30,20,0.2)'}>
                        <View style={styles.row}>
                        
                        <Text  style={styles.text}>Sign Out</Text>
                        </View>
                    </TouchableOpacity>
                    
                </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    drawerTransparent:{
        flex:1,
        backgroundColor:'transparent'
    },
    drawer:{
        flex:1,
        // width:350,
        width:'100%',
        justifyContent:'center',
    },
    header:{
        width:'100%',
        height:200,
        backgroundColor:'#ef5350',
        // backgroundColor:'#6195ff',
        alignItems:'center',
        justifyContent:'space-around',
        borderBottomEndRadius:50,
        borderBottomStartRadius:50

    },
    headerImage:{
        height:100,
        width:100,
        backgroundColor:'white',
        borderRadius:50,
    },
    row:{
        flexDirection:'row',
        paddingVertical:15,
        paddingLeft:20,
    },
    menu:{
        width:10,
        height:10,
        backgroundColor:'red',
        borderRadius:50,
        alignSelf:'center',
    },
    text:{
        marginTop:5,
        fontWeight:'bold',
        marginLeft:15,
        color:'#ef5350',
    },
    line:{
        width:'90%',
        alignSelf:'center',
        height:1,
        backgroundColor:'gray',
        margin:15,
    }
})
const mapDispatchToProps = dispatch => {
    return {
        signout : ()=>dispatch(Remove_User())
    }
}
export default  connect(null,mapDispatchToProps)(DrawerContent);