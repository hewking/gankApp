import TimerMixin from 'react-timer-mixin';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import React,{Component} from 'react'
import {View,
        Text
        ,Button
        ,TouchableHighlight} from 'react-native'
import CategoryScreen from './CategoryScreen'

export default class extends Component{

    constructor(props) {
        super(props)

        this.state = {
          tabs : ['全部','Android','iOS','App','前端','瞎推荐']
        }
        this.categoryList = []
        this.handleChangeTab.bind(this)
    }

    render(){
        return (<ScrollableTabView
            style={{ }}
            renderTabBar={() => <ScrollableTabBar renderTab={this.renderTab}/>}
            onChangeTab={this.handleChangeTab}
          >
            {this.state.tabs.map((tab, i) => {
              return <CategoryScreen
                ref={(ref) => (this.categoryList[i] = ref)}
                tabLabel={tab}
                category = {tab}
                key={i}
              />;
            })}
          </ScrollableTabView>)
    }

    handleChangeTab({i, ref, from, }) {
        // this.categoryList[i].onEnter();
        // this.categoryList[from].onLeave();
    }

    renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
      return <TouchableHighlight
        key={`${name}_${page}`}
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
        style={{flex: 1, width: 100, }}
        underlayColor="#aaaaaa"
      >
        <Text>{name}</Text>
      </TouchableHighlight>;
    }

}