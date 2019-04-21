import React,{Component} from 'react'
import {View,
    Text,
    ActivityIndicator,
    Image
    } from 'react-native'

export default class extends Component {
    render(){
        return <View style={{padding : 10,flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='small' style={{margin:10}}/>
        <Text style={{fontSize : 12,color:'#666666'}}>正在加载中...</Text>
    </View>
    }
}