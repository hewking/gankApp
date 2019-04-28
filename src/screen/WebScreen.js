import React,{Component} from 'react'
import {View,Button,Text,StyleSheet,TouchableOpacity
} from 'react-native'
import {WebView} from 'react-native-webview'
import * as L from '../util/L'
import Svg from '../component/Svg'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../util/DesignSystem';
import { createStackNavigator,createAppContainer } from 'react-navigation';
import {AppName} from '../constant/Constants'

export class WebScreen extends Component{

    static navigationOptions = ({navigation}) => {
        L.d('navigation title ' + navigation.getParam('title','Gank.iO'))
        return {
            title:navigation.getParam('title',AppName),
            headerRight:null,
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

    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: Colors.colorPrimary,
      }
})

const stack = createStackNavigator({
    WebView:WebScreen
},{
    defaultNavigationOptions:{
        title:AppName,
    headerStyle:{
        backgroundColor:Colors.colorPrimary,
        shadowOpacity:0,
        elevation:0,
    },
    headerTintColor:Colors.whiteLabel,
    headerTitleStyle:{
        fontWeight:'bold'
    }
    }
})

export default createAppContainer(stack)