import React,{Component} from 'react'
import {View,Button,Text,StyleSheet,TouchableOpacity
} from 'react-native'
import {WebView} from 'react-native-webview'
import * as L from '../util/L'
import Svg from '../component/Svg'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';

export default class NewsDetail extends Component{

    static navigationOptions = ({navigation}) => {
        L.d('navigation title ' + navigation.getParam('title','Gank.iO'))
        return {
            title:navigation.getParam('title','Gank.iO'),
            headerRight:null,
        }
    }

    render(){

        const {navigation} = this.props
        const url = navigation.getParam('url','www.baidu.com')
        const title = navigation.getParam('title','')

        return (<View style={styles.container}>
            {/* <ActionButton.Item 
            style={{position:'absolute',bottom:200,right:10}}
            buttonColor='#1abc9c' title="搜索" onPress={() => {}}>
                        <Icon name="md-search" style={styles.actionButtonIcon} />
            </ActionButton.Item> */}
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

    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      }
})