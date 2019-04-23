import TimerMixin from 'react-timer-mixin';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import React,{Component} from 'react'
import {View,
        Text
        ,Button
        ,TouchableWithoutFeedback} from 'react-native'
import CategoryScreen from './CategoryScreen'
import { Colors } from '../util/DesignSystem';

export default class extends Component{

  static navigationOptions = ({navigation}) => {
    return {
        headerRight:null,
    }
  }

    constructor(props) {
        super(props)

        this.state = {
          tabs : ['all','Android','iOS','拓展资源','前端','休息视频']
        }
        this.categoryList = []
        this.handleChangeTab = this.handleChangeTab.bind(this)
    }

    render(){
        const tabs = ['全部','Android','iOS','拓展资源','前端','休息视频']
        return (<ScrollableTabView
            style={{ }}
            tabs={tabs}
            renderTabBar={() => <ScrollableTabBar/>}
            tabBarInactiveTextColor={Colors.colorPrimary}
            tabBarActiveTextColor={Colors.mainTextLabel}
            tabBarUnderlineStyle= {{height:2,backgroundColor:Colors.indicatorColor,}}
            onChangeTab={this.handleChangeTab}
          >
            {this.state.tabs.map((tab, i) => {
              return <CategoryScreen
                ref={(ref) => (this.categoryList[i] = ref)}
                tabLabel={tabs[i]}
                category = {tab}
                key={i}
                // props包括navigation 传递
                {...this.props}
              />;
            })}
          </ScrollableTabView>)
    }

    handleChangeTab({i, ref, from, }) {
        // this.categoryList[i].onEnter();
        // this.categoryList[from].onLeave();
    }

    renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
      return <TouchableWithoutFeedback
        key={`${name}_${page}`}
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
        style={{flex: 1, width: 100,justifyContent:'center',alignItems:'center' }}
        underlayColor={Colors.indicatorColor}
      >
        <Text>{name}</Text>
      </TouchableWithoutFeedback>;
    }

}