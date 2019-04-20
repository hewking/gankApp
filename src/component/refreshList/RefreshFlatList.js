import React,{Component} from 'react'
import {View,Text,FlatList,StyleSheet,Platform} from 'react-native'
import PropTypes from 'prop-types'
import FooterState from './RefreshState'
import RefreshFooter from './RefreshFooter';
import RefreshState from './RefreshState';


export default class extends Component{
    static propTypes = {
        onHeadRefresh : PropTypes.func,// 下拉刷新
        onFooterRefresh : PropTypes.func,// 上拉加载方法
    }

    constructor(props) {
        super(props)
        this.state = {
            isHeaderRefreshing : false,// 是否正在下拉刷新
            isFooterRefreshing : false,// 是否正在上拉加载
            footerState : FooterState.Idle,// 尾部footer状态
        }
    }

    render(){
        return (
            <FlatList
                {...this.props} // 这一行直接把传给RefreshFlatList的属性中输入FlatList的都传入
                onRefresh={this.beginHeaderRefresh.bind(this)}
                refreshing = {this.state.isHeaderRefreshing}
                onEndReached={this.beginFooterRefresh.bind(this)}
                onEndReachedThreshold={0.1}
                ListFooterComponent={this._renderFooter.bind(this)}
            />
       )

    }

    beginHeaderRefresh(){
        if (this.shouldStartHeaderRefresh()) {
            this.startHeaderRefresh()
        }
    }

    beginFooterRefresh(){
        if (this.shouldStartFooterRefresh()) {
            this.startFooterRefresh()
        }
    }

    startHeaderRefresh(){
        this.setState({
            isHeaderRefreshing : true
        },() => {
            // 设置state 后的回调
            this.props.onHeadRefresh && this.props.onHeadRefresh()                
        })
    }

    startFooterRefresh(){ 
        this.setState({
            footerState:RefreshState.Refreshing,
            isFooterRefreshing : true,
        },() => {
            this.props.onFooterRefresh && this.props.onFooterRefresh()
        })
    }

    shouldStartHeaderRefresh(){
        if (this.state.footerState === RefreshState.Refreshing 
            || this.state.isHeaderRefreshing || this.state.isFooterRefreshing){
                return false
            } else {
                return true
            }
    }

    shouldStartFooterRefresh(){
        if (this.state.footerState === RefreshState.Refreshing 
            || this.state.footerState === RefreshState.NoMore
            || this.state.isHeaderRefreshing
            || this.state.isFooterRefreshing) {
                return false
            } else {
                return true
            }
    }

    endRefreshing(footerState = RefreshState.Idle){
        let footerRefreshState = footerState
        if (this.props.data.length === 0) {
            footerRefreshState = RefreshState.Idle
        }
        this.setState({
            footerState : footerRefreshState,
            isHeaderRefreshing : false,
            isFooterRefreshing : false,
        })
    }

    _renderFooter(){
        return (<RefreshFooter
            state = {this.state.footerState}
            onRetryLoading = {()=> {
                this.beginFooterRefresh()
            }}
        />)
    }

}

const styles = StyleSheet.create({
    container : {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }
})