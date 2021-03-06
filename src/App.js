import React, {
  Component
} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  IconCo,
  StatusBar,
  Platform,
  SafeAreaView,
  WebView
} from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createTabNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation'

import {Context} from './context'

// import {createBottomTabNavigator,BottomTabBar} from 'react-navigation-tabs'
import fontelloConfig from './font/config.json'

import HomeScreen from './screen/HomeScreen'
import GirlScreen2 from './screen/GirlScreen2'
import NewsDetail from './screen/NewsDetail'
import ImageDetail from './screen/ImageDetail'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from './util/DesignSystem';
import {getAsssetByName} from './util/Asset'

import { createIconSetFromFontello } from 'react-native-vector-icons'
import StateImage from './widgets/StateImage';
import SettingScreen from './screen/SettingScreen';
import SearchScreen from './screen/SearchScreen'
import CategoryContainer from './screen/CategoryContainer'
import ResponderTestScreen from './screen/ResponderTestScreen';
import I18n from './res/i18n/i18n'
import SvgStateImage from './widgets/SvgStateImage'
import Svg from './component/Svg'
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import PlatformTouchable from './widgets/PlatformTouchable';
import SplashScreen from 'react-native-splash-screen'
import WebScreen from './screen/WebScreen';
import {AppName} from './constant/Constants'

//jpush
import JPushModule from 'jpush-react-native';


const Icon = createIconSetFromFontello(fontelloConfig, 'gankapp')

// const TAB = createMaterialTopTabNavigator({
//   ALL: {screen:CategoryScreen,
//     navigationOptions:{
//       tabBarLabel:'全部'
//     }},
//   GIRL: {screen:GirlScreen2,
//   navigationOptions:{
//     tabBarLabel:'妹子图'
//   }},
// }, {
//   header:null,
//   tabBarOptions: {
//     activeTintColor: Colors.darkLabel,
//     inactiveTintColor:Colors.colorPrimary,
//     style: {
//       backgroundColor: Platform.select({
//         ios: 'white',
//         android: Colors.whiteLabel
//       }),
//       borderTopColor: 'transparent',
//       borderTopWidth: 0,
//       elevation: 4,
//     },
//     labelStyle: {
//       color: Platform.select({
//         ios: Colors.greyLabel,
//         android: Colors.greyLabel,
//       })
//     },
//     // scrollEnabled:true,
//     tabStyle : {
//       flex:1,
//       justifyContent:'center',
//       alignItems:'center',
//     },
//     indicatorStyle: {
//       backgroundColor: Colors.indicatorColor,
//       width:40,
//     },
//   }
// })


// const Drawer = createDrawerNavigator({
//   HOME:CategoryStack,
//   Setting:Setting
// },{
//   navigationOptions:{
//       drawerLockMode:'locked-closed',
//   },
//   backBehavior:'none'
// })

const BottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen:HomeScreen,
    navigationOptions:{
      tabBarLabel:'最新',
      tabBarIcon:({tintColor,focused}) => {
        let iconName = `infocirlce`
        return (<SvgStateImage
          key={'latest'}
          focus={focused}
          focusedIcon={'icon_latest_selected'}
          normalIcon={'icon_latest_unselected'}
          size={25}
          />)
      }
    }
  },
    Category:{
      screen:CategoryContainer,
      navigationOptions:{
        tabBarLabel:'分类',
        tabBarIcon:({tintColor,focused}) => {
          let iconName = `minuscircle`
          // return (<AntDesign
          //   name= {iconName}
          //   size={26}
          //   color={tintColor}
          // />)
          return (<SvgStateImage
            focus={focused}
            focusedIcon={'icon_category_selected'}
            normalIcon={'icon_category_unselected'}
            size={25}
          />)
      }
    }
  },
  Girl : {
    screen:GirlScreen2,
    navigationOptions:{
      tabBarLabel:'妹子',
      tabBarIcon:({tintColor,focused}) => {
        return (<SvgStateImage
        focus={focused}
        focusedIcon={'icon_girl_selected'}
        normalIcon={'icon_girl_unselected'}
        size={25}
        />)
    }
  }
  },
  Setting : {
    screen:SettingScreen,
    navigationOptions:{
      tabBarLabel:'设置',
      tabBarIcon:({tintColor,focused}) => {
        return (<SvgStateImage
          focus={focused}
          focusedIcon={'icon_settings_selected'}
          normalIcon={'icon_settings_unselected'}
          size={25}
          />)
      }
    }
  }

}, {
  tabBarOptions: {
    activeTintColor: Colors.colorPrimary,
    inactiveTintColor:Colors.darkLabel,
  },
  initialRouteName:'Home',
  backBehavior:'initialRoute',
})

export default class Navigation extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        route:0
    }
  }

  componentDidMount(){
    SplashScreen.hide()

    // request
    // setTimeout(() => {
    //   this.setState({
    //     route:1,
    //   })
    // }, 5000);

    if (Platform.OS === 'android'){
      JPushModule.notifyJSDidLoad((resultCode) => {
        // do something
      });
      JPushModule.addReceiveCustomMsgListener((message) => {
        this.setState({pushMsg: message});
      });
      JPushModule.addReceiveNotificationListener((message) => {
        console.log("receive notification: " + message);
      })
    }

 
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      JPushModule.removeReceiveCustomMsgListener();
      JPushModule.removeReceiveNotificationListener();
    }
   
  }

  render(){
    return (<View style={{backgroundColor:Colors.background,flex:1}}>
    <Context.Provider>
    <StatusBar barStyle='light-content' backgroundColor={Colors.colorPrimary}></StatusBar>
       <AppContainer/>
    </Context.Provider>
       
    </View>)
  }

}

const SettingStack = createStackNavigator({
  SettingPage:{
    screen:SettingScreen
  }
},{
  defaultNavigationOptions:{
    headerRight:null
  }
})

class BottomTabNavigation extends Component {
    static navigationOptions = ({navigation}) => {
    return {
      headerRight:<PlatformTouchable onPress = {() => {
        navigation.navigate('Search')
    }}>
      <Svg  style={{padding:16}}
                      size={24}
                      icon={'icon_search'}/>
     </PlatformTouchable>
    
    }
  }

    render(){
      const Container = createAppContainer(BottomTabNavigator)
        return (<Container/>)
    }
}

const RootNavigator = createStackNavigator({
  Main : BottomTabNavigator,
  ImageDetail:ImageDetail,
  Detail:NewsDetail,
  Responder : ResponderTestScreen,
  Search:SearchScreen,
},{
  // 全屏模式
  mode:'card',
  headerMode:'screen',
  defaultNavigationOptions: ({navigation}) => {
    // header:{
    //     style:{
    //       // elevation:0,// remove shadow on android
    //       shadowOpacity:0,// remove shadow on iOS
    //     }
    // },
    return {
      title:AppName,
    headerStyle:{
        backgroundColor:Colors.colorPrimary,
        shadowOpacity:0,
        elevation:0,
    },
    headerTintColor:Colors.whiteLabel,
    headerTitleStyle:{
        fontWeight:'bold'
    },
    headerRight:<PlatformTouchable onPress = {() => {
      navigation.navigate('Search')
   }}>
    <Svg  style={{padding:16}}
                    size={24}
                    icon={'icon_search'}/>
   </PlatformTouchable>
    }
    
}})

const AppContainer = createAppContainer(RootNavigator)
// export default createAppContainer(RootNavigator)

// export default createAppContainer(TabNavigator)
// export default TabNavigator