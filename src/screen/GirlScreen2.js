import React,{Component} from 'react'
import {View,Text,Button,Image,StyleSheet,TouchableOpacity,ActivityIndicator} from 'react-native'
import PropTypes  from 'prop-types'
import RefreshFlatList from '../component/refreshList/RefreshFlatList'
import RefreshState from '../component/refreshList/RefreshState';

const REQUEST_URL = 'http://gank.io/api/data/福利'
const PAGE_SIZE = 10

export default class extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoad:false,
            data : [],
        }
        this.mPage = 1
    }

    render(){
        if (this.state.isLoad) {
            return (<RefreshFlatList
                style={styles.container}
                onHeadRefresh={this._refreshData}
                onFooterRefresh={this._loadMore}
                data={this.state.data}
                renderItem={this._bindItem.bind(this)}
                keyExtractor={(item) => item._id}
                ref = {(list) => this.flatList = list}
            />)
        } else {
            return this.renderLoadingView()
        }
        
    }

    componentDidMount(){
        this._refreshData()
    }

    renderLoadingView(){
        return (<View style={{padding : 10,flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='small' style={{margin:10}}/>
            <Text style={{fontSize : 12,color:'#666666'}}>正在加载中...</Text>
        </View>)
    }

    _bindItem({item}) {
        // console.log('item ' + {...item})
        return (<TouchableOpacity 
            style = {{flex:1,
                flexDirection:'row',
                justifyContent:'center',
                alignItems:'center'}}
            onPress={() => {
            this.props.navigation.navigate('ImageDetail',{
                url:item.url,
                    desc:item.desc,
                    id:item._id,
                    title:item.type,
            })
        }}>
            <Image style = {styles.image}
            source={{uri:item.url}}
        />
     </TouchableOpacity>)
    }

    _refreshData = ()=> {
        this.mPage = 1
        this.state.data = [] // clear data
        this._fetchData()
    }

    _loadMore = () => {
        this._fetchData()
    }

    _fetchData(page = this.mPage){
        console.log(`fetchData ${page}`)
        let url = REQUEST_URL + `/${PAGE_SIZE}/${page}`
        fetch(url).then(resp => (resp.json()))
        .then(respJson => {
            let results = respJson.results
            let length = results.length
            // 改变底部状态 调用endRefreshing函数
            // 如果 length < 10 说明没有更多可以加载了 NO_MORE
            // lenght >= 10 可以加载
            let state = RefreshState.Idle
            if (length >= PAGE_SIZE) {
                state = RefreshState.LoadMore   
            } else {
                state = RefreshState.NoMore
            }
            this.setState({
                isLoad : true,
                data:this.state.data.concat(results)
            })
            this.mPage ++
            this.flatList.endRefreshing(state)
        }).catch(err => {
            this.flatList.endRefreshing(RefreshState.Failure)
        })

    }

}

const styles = StyleSheet.create({
    container : {
        // justifyContent:'center',
        // alignItems:'center',
        flexDirection:'row',
        flex:1,
    },
    image : {
        width:'100%',
        height:400,
    }
})