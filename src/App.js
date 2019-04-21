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
} from 'react-native'
import {
  createStackNavigator,
  // createBottomTabNavigator,
  createAppContainer,
  createTabNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation'

import {Context} from './context'

import {createBottomTabNavigator,BottomTabBar} from 'react-navigation-tabs'
import fontelloConfig from './font/config.json'

import HomeScreen from './screen/HomeScreen'
import GirlScreen2 from './screen/GirlScreen2'
import NewsDetail from './screen/NewsDetail'
import ImageDetail from './screen/ImageDetail'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Setting from './screen/SettingScreen'
import { Colors } from './util/DesignSystem';
import {getAsssetByName} from './util/Asset'

import { createIconSetFromFontello } from 'react-native-vector-icons'
import StateImage from './widgets/StateImage';
import SettingScreen from './screen/SettingScreen';
import ResponderTestScreen from './screen/ResponderTestScreen';
import I18n from './res/i18n/i18n'
import SvgStateImage from './widgets/SvgStateImage'
// const TabBarComponent = (props) => (<BottomTabBar {...props}/>)

const Icon = createIconSetFromFontello(fontelloConfig, 'gankapp')

const TAB = createMaterialTopTabNavigator({
  Home: {screen:HomeScreen,
    navigationOptions:{
      tabBarLabel:'最新'
    }},
  GIRL: {screen:GirlScreen2,
  navigationOptions:{
    tabBarLabel:'妹子图'
  }},
}, {
  header:null,
  tabBarOptions: {
    activeTintColor: Colors.darkLabel,
    inactiveTintColor:Colors.colorPrimary,
    style: {
      backgroundColor: Platform.select({
        ios: 'white',
        android: Colors.whiteLabel
      }),
      borderTopColor: 'transparent',
      borderTopWidth: 0,
      elevation: 4,
    },
    labelStyle: {
      color: Platform.select({
        ios: Colors.greyLabel,
        android: Colors.greyLabel,
      })
    },
    // scrollEnabled:true,
    tabStyle : {
      flex:1,
      justifyContent:'center',
      alignItems:'center',
    },
    indicatorStyle: {
      backgroundColor: Colors.indicatorColor,
      width:40,
    },
  }
})

const CategoryStack = createStackNavigator({
  Home: TAB,
  // ImageDetail:ImageDetail
}, {
  defaultNavigationOptions: {
    header:null,
    title:I18n.t('latest_today'),
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: Colors.colorPrimary,
    },
  },
  navigationOptions: {
    tabBarLabel: '最新',
  }
})

const GirlStack = createStackNavigator({
  Girl: GirlScreen2,
  // News:NewsDetail
}, {
  defaultNavigationOptions: {
      header:null,
      tabBarLabel:'妹子'
  }
})

const HomeStack = createStackNavigator({
  Latest : HomeScreen
},{
  defaultNavigationOptions:{
    header:null,
    tabBarLabel:'今日最新'
  }
})

const Drawer = createDrawerNavigator({
  HOME:CategoryStack,
  Setting:Setting
},{
  navigationOptions:{
      drawerLockMode:'locked-closed',
  },
  backBehavior:'none'
})

const BottomTabNavigator = createBottomTabNavigator({
  Home: {
    screen:HomeStack,
    navigationOptions:{
      tabBarLabel:I18n.t('latest_today'),
      tabBarIcon:({tintColor,focused}) => {
        let iconName = `infocirlce`
        return (<SvgStateImage
          key={'latest'}
          focus={focused}
          focusedIcon={'icon_latest_selected'}
          normalIcon={'icon_latest_unselected'}
          size={26}
          />)
      }
    }
  },
    Category:{
      screen:CategoryStack,
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
          size={26}
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
          size={26}
          />)
      }
    }
  }

}, {
  // 自定义底部tab
  defaultNavigationOptions: ({navigation}) => {
    tabBarIcon: ({
      focused,
      tintColor
    }) => {
      // const { routeName } = navigation.state;
      // // let IconComponent = Ionicons;
      // let iconName;
      // if (routeName === 'Home') {
      //   iconName = `ios-car`;
      //   // Sometimes we want to add badges to some icons. 
      //   // You can check the implementation below.
      //   // IconComponent = HomeIconWithBadge; 
      // } else if (routeName === 'Girl') {
      //   iconName = `ios-car`;
      // } 
      // else {
      //   iconName = `ios-car`
      // }

      // iconName = `ios-car`

      // You can return any component that you like here!
      return <AntDesign name={`minuscircle`} size={25} color={tintColor} />;  
    }
  },

  tabBarOptions: {
    activeTintColor: Colors.greyLabel,
    inactiveTintColor:'#aaa',
    style: {
      backgroundColor: Platform.select({
        ios: 'white',
        android: Colors.whiteLabel
      }),
      borderTopColor: 'transparent',
      borderTopWidth: 0,
      elevation: 4
    },
    labelStyle: {
      color: Platform.select({
        ios: null,
        android: Colors.greyLabel
      })
    },
    indicatorStyle: {
      backgroundColor: '#fff'
    },
    showIcon:'true',
    showLabel:'true',
  },
  initialRouteName:'Home',
  // backBehavior:'initialRoute',

})

export default class Navigation extends React.Component {
  render(){
    return (<SafeAreaView style={{backgroundColor:Colors.background,flex:1}}>
    <Context.Provider>
    <StatusBar barStyle='light-content' backgroundColor={Colors.colorPrimary}></StatusBar>
      <AppContainer/>
    </Context.Provider>
       
    </SafeAreaView>)
  }
}

const RootNavigator = createStackNavigator({
  Main : BottomTabNavigator,
  ImageDetail:ImageDetail,
  Detail:NewsDetail,
  Responder : ResponderTestScreen,
},{
  // 全屏模式
  mode:'card',
  headerMode:'screen',
  defaultNavigationOptions:{
    // header:{
    //     style:{
    //       // elevation:0,// remove shadow on android
    //       shadowOpacity:0,// remove shadow on iOS
    //     }
    // },
    title:'Gank.io',
    headerStyle:{
        backgroundColor:Colors.colorPrimary,
        shadowOpacity:0,
        elevation:0,
    },
    headerTintColor:Colors.whiteLabel,
    headerTitleStyle:{
        fontWeight:'bold'
    }
}})

const AppContainer = createAppContainer(RootNavigator)
// export default createAppContainer(RootNavigator)

// export default createAppContainer(TabNavigator)
// export default TabNavigator