import React,{Component} from 'react'
import {View
    ,Text
    ,Button
    ,StyleSheet} from 'react-native'
import RefreshFlatList from './refreshList/RefreshFlatList';
import RefreshState from './refreshList/RefreshState';
import LoadingView from '../widgets/LoadingView';
import { Colors } from '../util/DesignSystem';
import * as L from '../util/L'
import * as T from '../util/T'

const PAGE_SIZE = 10

export default class extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoad : false,
            datas : [],
        }

        this.mPage = 1
        this.renderContentView = this.renderContentView.bind(this)
    }

    render(){
        L.d('category render props ' + this.props)
        if (this.state.isLoad) {
            return this.renderRootView()
        } else {
            return this.renderLoadingView()
        }
        
    }

    
    renderRootView() {
        return (<RefreshFlatList styles={styles.container} 
            onHeadRefresh={this._refreshData}
             onFooterRefresh={this._loadMore}
              data={this.state.datas} 
              renderItem={this.renderContentView} 
              keyExtractor={(item) => item._id} 
              ref={(list) => this.flatList = list} />);
    }

    componentDidMount(){
        this._refreshData()
    }

    renderLoadingView(){
        return (<LoadingView/>)
    }

    renderContentView(){
        return null
    }

    _refreshData = ()=> {
        this.mPage = 1
        this.state.datas = [] // clear data
        this._fetchData()
    }

    _loadMore = () => {
        this._fetchData()
    }

    loadData(url){
        fetch(url).then(resp => (resp.json()))
        .then(respJson => {
            let results = respJson.results
            let length = results.length
            // 改变底部状态 调用endRefreshing函数
            // 如果 length < 10 说明没有更多可以加载了 NO_MORE
            // lenght >= 10 可以加载

            L.d('results : ' + results.length)
            this.setState({
                isLoad : true,
                datas:this.state.datas.concat(results)
            })
            this.mPage ++
            this.endRefreshing(length);
        }).catch(err => {
            this.flatList.endRefreshing(RefreshState.Failure)
        })
    }

    endRefreshing(length) {
        let state = RefreshState.Idle;
        if (length >= PAGE_SIZE) {
            state = RefreshState.LoadMore;
        }
        else {
            state = RefreshState.NoMore;
        }
        this.flatList.endRefreshing(state);
    }

    _fetchData(page = this.mPage){
        let url = this.buildUrl()
        L.d('fetch url : ' + url)
        this.loadData(url)

    }

    buildUrl(){

    }

}

const styles = StyleSheet.create({
    container : {
        flex:1,
        flexDirection:'column',
        backgroundColor:Colors.background2,
    },
    item:{
        marginHorizontal:8,
        marginTop:8,
        borderRadius:3,
        backgroundColor:Colors.whiteLabel,
        flexDirection:'column',
        borderWidth:1,
        borderColor:Colors.shadowBackground
    },
})