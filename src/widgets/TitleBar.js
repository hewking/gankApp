import React,{Component} from 'react'
import {View,StyleSheet,Text,Image,TouchableOpacity} from 'react-native'
import {getAsssetByName} from '../util/Asset'

const ICON = getAsssetByName('back')

export default class TitleBar extends Component {

    render(){

        const {navigation,title,showLeft} = this.props
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                navigation.goBack()
            }}>
                {/* {showLeft?:<View/>} */}
                <Image style={styles.image} source={ICON}/>
                <Text style={{fontSize:16,fontFamily:'normal',color:'#fff',alignItems:'center',justifyContent:'center'}}>{title}</Text>
            </TouchableOpacity>
        )

    }

}

const styles = StyleSheet.create({
    container : {
        width:'100%',
        height:48,
        flexDirection:'row',
        backgroundColor:'#4d3241',
        alignItems:'center',
        // justifyContent:'center'
    },
    image:{
        alignSelf:'center',
        resizeMode:'cover',
        width:30,
        height:25,
        paddingTop:5,
        paddingBottom:5,
        marginLeft:8,
        marginTop:8,
        marginRight:8,
        marginBottom:8,
    }
})