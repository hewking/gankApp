import React,{Component} from 'React'
import {View
        ,Text
        ,Image
        ,StyleSheet
        ,Button} from 'react-native'
import App from '../App'
import WebScreen from './NewsDetail'
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { getAsssetByName } from '../util/Asset';
 
class SplashScreen extends Component {


    render(){
        return <Image style={{flex:1
        ,justifyContent:'center',
        alignItems:'center'}} 
        resizeMode='contain'
        source={getAsssetByName('App')}/>
    }

    componentDidMount(){
        const {navigation} = this.props
        setTimeout(() => {
            navigation.navigate('WebView',{
                url:'https://github.com/iqiyi/Neptune'
            })
        }, 3000);
    }

}

const RootStack = createStackNavigator({
    Splash : SplashScreen,
    App:App,
    WebView : WebScreen,
},{
    defaultNavigationOptions:{
        header:null,

    }
})

export default createAppContainer(RootStack)
