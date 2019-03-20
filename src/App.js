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
  Platform
} from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation'
// import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen'
import GirlScreen from './GirlScreen'
import NewsDetail from './NewsDetail'


const TAB = createMaterialTopTabNavigator({
  Home: HomeScreen,
  GIRL: GirlScreen
}, {
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
  Detail:NewsDetail
}, {
  defaultNavigationOptions: {

  }
})

const GirlStack = createStackNavigator({
  Girl: GirlScreen
}, {
  defaultNavigationOptions: {

  }
})

// root stack
// const RootStack = createStackNavigator({
//   TabNav : TabNavigator,
//   Detail:NewsDetail
// })

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  // Girl: GirlStack,
  Girl:HomeStack

}, {
  // 自定义底部tab
  defaultNavigationOptions: ({
    navigation
  }) => {
    tabBarIcon: ({
      focused,
      horizontal,
      tintColor
    }) => {
      return <Image source = './res/back.png'/>
    }
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
  }
})

const styles = StyleSheet.create({
  container: {

  }
})

const Container = createAppContainer(TabNavigator)

export default Container

export class Navigation extends React.Component {
  render() {
    return ([ < StatusBar key = 'statusbar'
      barStyle = 'light-content' /> ,
      Container
    ])
  }
}

// export default createAppContainer(TabNavigator)
// export default TabNavigator