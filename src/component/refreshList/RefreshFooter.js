import React,{Component} from 'React'
import {View,Text,Button,TouchableOpacity,ActivityIndicator,StyleSheet} from 'react-native'
import RefreshState from './RefreshState'
import PropTypes from 'prop-types'

export default class RefreshFooter extends Component {

     static propTypes = {
        onLoadMore : PropTypes.func,
        onRetryLoading : PropTypes.func
    }

    static defaultProps = {
        footerRefreshingText : '努力加载中',
        footerLoadMoreText : '上拉加载更多',
        footerFailText : '点击重新加载',
        footerNoMoreText : '已全部加载完毕'
    }

    render(){
        let {state} = this.props
        let footer = null
        switch(state) {
            case RefreshState.Idle : 

            break
            case RefreshState.Refreshing:
                // 显示Loading视图
                footer = <View style={styles.loadingView}>
                    <ActivityIndicator size="small"/>
                     <Text style={styles.refreshingText}>{this.props.footerRefreshingText}</Text>
                </View>
            break
            case RefreshState.LoadMore:
            footer = <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.footerLoadMoreText}</Text>
            </View>
            break
            case RefreshState.NoMore:
            footer = <View style={styles.loadingView}>
            <Text style={styles.footerText}>{this.props.footerNoMoreText}</Text>
          </View>

            break
            case RefreshState.Failure:
            footer =
          <TouchableOpacity style={styles.loadingView} onPress={()=>{
              // 先判断不为空？
            this.props.onRetryLoading && this.props.onRetryLoading();
          }}>
            <Text style={styles.footerText}>{this.props.footerFailText}</Text>
          </TouchableOpacity>;

            break
        }
        return footer
    }

}

const styles = StyleSheet.create({
    loadingView:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    footerText : {
        fontSize: 12,
        color: "#666666"
    },
    refreshingText : {
        fontSize: 12,
        color: "#666666",
        paddingLeft: 10,
    }
})