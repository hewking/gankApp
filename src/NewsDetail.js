import React,{Component} from 'react'
import {View,Button,Text,StyleSheet,TouchableOpacity
} from 'react-native'
import {WebView} from 'react-native-webview'

export default class NewsDetail extends Component{

    render(){

        const {navigation} = this.props
        const url = navigation.getParam('url','www.baidu.com')

        return (<View style={styles.container}>
            <WebView
                source={{uri:url}}
            />
        </View>)
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    webview : {

    }
})