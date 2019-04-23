import React,{Component} from 'react'
import {View,Text,Button,Image,StyleSheet
    ,TouchableOpacity
    ,ActivityIndicator
    ,TouchableNativeFeedback} from 'react-native'
import PropTypes  from 'prop-types'
import RefreshFlatList from '../component/refreshList/RefreshFlatList'
import RefreshState from '../component/refreshList/RefreshState';
import LoadingView from '../widgets/LoadingView';
import { Colors } from '../util/DesignSystem';
import PlatformTouchable from '../widgets/PlatformTouchable'

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
            return (
            <View style = {styles.background}>
                <RefreshFlatList
                    style={styles.container}
                    onHeadRefresh={this._refreshData.bind(this)}
                    onFooterRefresh={this._loadMore.bind(this)}
                    data={this.state.data}
                    renderItem={this._bindItem.bind(this)}
                    keyExtractor={(item) => item._id}
                    ref = {(list) => this.flatList = list}
                />
            </View>
            
            )
        } else {
            return this.renderLoadingView()
        }
        
    }

    componentDidMount(){
        this._refreshData()
    }

    renderLoadingView(){
        return (<LoadingView/>)
    }

    _bindItem({item}) {
        // console.log('item ' + {...item})
        return (<PlatformTouchable 
            style = {styles.imgContaner}
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
     </PlatformTouchable>)
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
    background : {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'red',
    },
    container : {
        flex:1,
        width:'100%',
    },
    image : {
        flex:1,
        height:400,
        borderRadius:3,
        marginHorizontal:16,
        marginTop:16,
        // resizeMode:'contain',
        backgroundColor:Colors.whiteLabel,
    },
    imgContaner : {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.background2
    }
})