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
  createBottomTabNavigator,
  createAppContainer,
  createTabNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
} from 'react-navigation'

import {Context} from './context'

// import {BottomTabBar} from 'react-navigation-tabs'

// import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen'
import GirlScreen from './GirlScreen'
import NewsDetail from './NewsDetail'
import ImageDetail from './ImageDetail'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Setting from './SettingScreen'
import { Colors } from './DesignSystem';

// const TabBarComponent = (props) => (<BottomTabBar {...props}/>)

const TAB = createMaterialTopTabNavigator({
  Home: {screen:HomeScreen,
    navigationOptions:{
      tabBarLabel:'今日最新'
    }},
  GIRL: {screen:GirlScreen,
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
    title:'主页',
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#4d3241',
    },
  },
  navigationOptions: {
    tabBarLabel: 'Home!',
  }
})

const GirlStack = createStackNavigator({
  Girl: GirlScreen,
  // News:NewsDetail
}, {
  defaultNavigationOptions: {
      header:null,
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
  Home: {
    screen:HomeStack,
    navigationOptions:{
      tabBarLabel:'主页',
      tabBarIcon:({tintColor,focused}) => {
        <Ionicons
          name={'ios-add'}
          size={26}
          color={tintColor}
        />
      }
    }
  },
  // Girl: GirlStack,
  Girl:{
    screen:GirlStack,
    navigationOptions:{
      tabBarLabel:'妹子',
      tabBarIcon:({tintColor,focused}) => (
        <Ionicons
          name={'app-store-ios'}
          size={26}
          color={tintColor}
        />
      )
    }
  }

}, {
  // 自定义底部tab
  defaultNavigationOptions: ({navigation}) => {
    tabBarIcon: ({
      focused,
      horizontal,
      tintColor
    }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'Home') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        // Sometimes we want to add badges to some icons. 
        // You can check the implementation below.
        IconComponent = HomeIconWithBadge; 
      } else if (routeName === 'Settings') {
        iconName = `ios-options`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;    }
  },

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
    showIcon:'true',
    showLabel:'false',
    inactiveTintColor:'skyblue',
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
    <StatusBar barStyle='light-content'></StatusBar>
        <AppContainer/>
    </Context.Provider>
       
    </SafeAreaView>)
  }
}

const RootNavigator = createStackNavigator({
  Main : BottomTabNavigator,
  ImageDetail:ImageDetail,
  Detail:NewsDetail,
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