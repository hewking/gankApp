import React,{Component} from 'react'
import {View,Button,Text,StyleSheet,TouchableOpacity
} from 'react-native'
import {WebView} from 'react-native-webview'
import * as L from '../util/L'
import Svg from '../component/Svg'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../util/DesignSystem';

/**
 * webview 组件
 */
export default class WebScreen extends Component{

    static navigationOptions = ({navigation}) => {
        L.d('navigation title ' + navigation.getParam('title','Gank.iO'))
        return {
            title:navigation.getParam('title','Gank.iO'),
            headerRight:null,
        }
    }

    render(){

        const {url,title} = this.props

        return (<View style={styles.container}>
            <WebView
                source={{uri:url}}
            />
                        {/* <View
            style={{position:'absolute',bottom:80,right:35}}
            onPress={() => {}}>
                        <Icon name="ios-heart" style={styles.actionButtonIcon} />
            </View> */}
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