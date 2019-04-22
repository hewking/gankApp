import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native'
import { Colors } from '../util/DesignSystem';

export default class SettingScreen extends Component {

    render(){
        return (<View style={styles.container}>
                    <View style={{width:'100%',height:48,backgroundColor:Colors.colorPrimary,position:'absolute'
                ,left:0,top:0}}/>
            <TouchableOpacity style={styles.textContainer} onPress = {() => this.props.navigation.navigate('Responder')}>
               <Text style={styles.text}>设置页面</Text>
            </TouchableOpacity>

        </View>)
    }


}

const styles = StyleSheet.create({
    container : {flex:1,justifyContent:'center',alignItems:'center'},
    text : {
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        paddingRight:15,
        color:Colors.buttonText
    },
    textContainer : {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.lightBackground
    }
})