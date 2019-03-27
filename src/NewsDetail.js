import React,{Component} from 'react'
import {View,Button,Text,StyleSheet,TouchableOpacity
} from 'react-native'
import {WebView} from 'react-native-webview'
import TitleBar from './component/TitleBar';

export default class NewsDetail extends Component{

    static navigationOptions = ({navigation}) => {
        return {
            title:navigation.getParam('title','')
        }
    }

    render(){

        const {navigation} = this.props
        const url = navigation.getParam('url','www.baidu.com')
        const title = navigation.getParam('title','')
        return (<View style={styles.container}>
            <TitleBar title={title} navigation={navigation}/>
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