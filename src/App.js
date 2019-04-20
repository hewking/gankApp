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
import { Colors } from './widgets/DesignSystem';
import {getAsssetByName} from './util/Asset'

import { createIconSetFromFontello } from 'react-native-vector-icons'
import StateImage from './widgets/StateImage';
import SettingScreen from './screen/SettingScreen';
import ResponderTestScreen from './screen/ResponderTestScreen';


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
    activeTintColor: '#4d3241',
    style: {
      backgroundColor: Platform.select({
        ios: 'white',
        android: '#4d3241'
      }),
      borderTopColor: 'transparent',
      borderTopWidth: 0,
      elevation: 0
    },
    labelStyle: {
      color: Platform.select({
        ios: null,
        android: '#fff'
      })
    },
    indicatorStyle: {
      backgroundColor: '#fff'
    },
  }
})

const HomeStack = createStackNavigator({
  Home: TAB,
  // ImageDetail:ImageDetail
}, {
  defaultNavigationOptions: {
    header:null,
    title:'最新',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#4d3241',
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

const Drawer = createDrawerNavigator({
  HOME:HomeStack,
  Setting:Setting
},{
  navigationOptions:{
      drawerLockMode:'locked-closed',
  },
  backBehavior:'none'
})

// root stack
// const RootStack = createStackNavigator({
//   TabNav : TabNavigator,
//   Detail:NewsDetail
// })
const BottomTabNavigator = createBottomTabNavigator({
  // tabBarComponent: props =>
  //     <TabBarComponent
  //       {...props}
  //       style={{ borderTopColor: '#605F60' }}
  //     />,
  Home: {
    screen:HomeStack,
    navigationOptions:{
      tabBarLabel:'最新',
      tabBarIcon:({tintColor,focused}) => {
        let iconName = `infocirlce`
        return (<StateImage
          focus={focused}
          focusedIcon={'icon_browser_home_current'}
          normalIcon={'icon_browser_home'}
          style={{width:26,height:26}}
          />)
      }
    }
  },
  // Girl: GirlStack,
    Girl:{
      screen:GirlStack,
      navigationOptions:{
        tabBarLabel:'妹子',
        tabBarIcon:({tintColor,focused}) => {
          let iconName = `minuscircle`
          // return (<AntDesign
          //   name= {iconName}
          //   size={26}
          //   color={tintColor}
          // />)
          return (<StateImage
          focus={focused}
          focusedIcon={'icon_contacts_current'}
          normalIcon={'icon_contacts'}
          style={{width:26,height:26}}
          />)
      }
    }
  },
  Setting : {
    screen:SettingScreen,
    navigationOptions:{
      tabBarLabel:'设置',
      tabBarIcon:({tintColor,focused}) => {
        return (<StateImage
          focus={focused}
          focusedIcon={'icon_setting_focused'}
          normalIcon={'icon_setting_normal'}
          style={{width:26,height:26}}
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
    activeTintColor: '#aaa',
    style: {
      backgroundColor: Platform.select({
        ios: 'white',
        android: '#4d3241'
      }),
      borderTopColor: 'transparent',
      borderTopWidth: 0,
      elevation: 0
    },
    labelStyle: {
      color: Platform.select({
        ios: null,
        android: '#fff'
      })
    },
    indicatorStyle: {
      backgroundColor: '#fff'
    },
    showIcon:'true',
    showLabel:'true',
    inactiveTintColor:'#aaa',
    // iconStyle:''
  },
  initialRouteName:'Home',
  backBehavior:'initialRoute',
  // tabBarComponent:props => {
  //   <TabBarComponent {...props} style={{borderTopColor:'#605f60'}}/>
  // }
})

const styles = StyleSheet.create({
  container: {

  }
})

// const Container = createAppContainer(Drawer)

// export default Container

const Model = createStackNavigator({
    Drawer:Drawer
})

export default class Navigation extends React.Component {
  // render() {
  //   return ([ < StatusBar key = 'statusbar'
  //     barStyle = 'light-content' /> ,
  //     <Model/>
  //   ])
  // }
  render(){
    return (<SafeAreaView style={{backgroundColor:Colors.background,flex:1}}>
    <Context.Provider>
    <StatusBar barStyle='light-content' backgroundColor='#4d3241'></StatusBar>
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
  mode:'modal',
  headerMode:'none',
  defaultNavigationOptions:{
    header:null,
    headerStyle:{
        backgroundColor:'#4d3241'
    },
    headerTintColor:'#fff',
    headerTitleStyle:{
        fontWeight:'bold'
    }
}})

const AppContainer = createAppContainer(RootNavigator)
// export default createAppContainer(RootNavigator)

// export default createAppContainer(TabNavigator)
// export default TabNavigator