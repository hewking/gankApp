import TimerMixin from 'react-timer-mixin';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import React,{Component} from 'react'
import {View,
        Text
        ,Button} from 'react-native'
import CategoryScreen from './CategoryScreen'

export default class extends Component{

    constructor(props) {
        super(props)
    }

    render(){
        return (<ScrollableTabView
            style={{marginTop: 20, }}
            renderTabBar={() => <ScrollableTabBar renderTab={this.renderTab}/>}
            onChangeTab={this.handleChangeTab}
          >
            {this.state.tabs.map((tab, i) => {
              return <CategoryScreen
                ref={(ref) => (this.children[i] = ref)}
                tabLabel={`tab${i}`}
                i={i}
                key={i}
              />;
            })}
          </ScrollableTabView>)
    }

    handleChangeTab({i, ref, from, }) {
        this.children[i].onEnter();
        this.children[from].onLeave();
      }

}