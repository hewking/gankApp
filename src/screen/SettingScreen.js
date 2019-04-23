import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity
    ,ScrollView} from 'react-native'
import { Colors } from '../util/DesignSystem';
import SettingItem from '../widgets/SettingItem'

export default class SettingScreen extends Component {

    render(){
        return (<View style={styles.container}>
            <ScrollView style={{flex:1,width:'100%'}}>
                <SettingItem style={styles.item} icon={'icon_clear'} title={'清除缓存'} onPress={() => {
                    this.props.navigation.navigate('Responder')
                }}/>
            </ScrollView>
        </View>)
    }
}

const styles = StyleSheet.create({
    container : {flex:1,justifyContent:'center',alignItems:'center'
,backgroundColor:Colors.whiteLabel},
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
    },
    item:{
        marginVertical:16,
    }
})