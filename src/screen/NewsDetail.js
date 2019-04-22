import React,{Component} from 'react'
import {View,Button,Text,StyleSheet,TouchableOpacity
} from 'react-native'
import {WebView} from 'react-native-webview'
import * as L from '../util/L'

export default class NewsDetail extends Component{

    static navigationOptions = ({navigation}) => {
        L.d('navigation title ' + navigation.getParam('title','Gank.iO'))
        return {
            title:navigation.getParam('title','Gank.iO')
        }
    }

    render(){

        const {navigation} = this.props
        const url = navigation.getParam('url','www.baidu.com')
        const title = navigation.getParam('title','')

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