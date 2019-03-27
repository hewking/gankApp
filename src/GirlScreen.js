
import React,{Component} from 'react'
import {View,StyleSheet,Text,Image
    ,TouchableOpacity,ToastAndroid
,FlatList} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ImageDetail from './ImageDetail'
import RefreshFooter from './component/refreshList/RefreshFooter';
import RefreshState from './component/refreshList/RefreshState';

const REQUEST_URL = 'http://gank.io/api/data/福利'

class GirlScreen extends Component {

    static navigationOptions = {
        // header 设置为null 禁止标题栏
        header:null,
        title:'Home',
        headerStyle:{
            backgroundColor:'#4d3241'
        },
        headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    }

    constructor(props){
        super(props)
        this.state = {
            isLoad : false,
            data:[],
            footerState : RefreshState.Idle,
        }

        // 如果不bind， this 不是指向外部 component ,navigation 这个值为Null
        this.bindItem = this.bindItem.bind(this)
        this.mPage = 0
    }

    render(){
        if (this.state.isLoad) {
            return (<View style={styles.container}>
                <FlatList style={styles.list}
                    data={this.state.data}
                    renderItem={this.bindItem}
                    keyExtractor={(item) => item._id}
                    ref={(list) => this._flatList = list}
                    onRefresh = {() => {
                        this._onRefreshEnd()
                        this._refreshData()
                    }}
                    refreshing = {false}
                    onEndReached={this._loadMore()}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this._renderFooter}
                />
            </View>)
        } else {
            return this.renderLoadingView()
        }
    }

    _onRefreshEnd(){
        this._flatList.refreshing = false
    }

    _loadMore(){
        this.fetchData(++this.mPage)
    }

    _renderFooter(){
        // let loadState = this.state.footerState
        // if (typeof loadState === 'undefined') {
            // loadState = RefreshState.LoadMore
        // }
        return (<RefreshFooter
            state={RefreshState.LoadMore}
            onRetryLoading={()=> {
                this._loadMore()
            }}
        />)
    }

    renderLoadingView(){
        return (<View style={styles.container}>
            <Text>
                正在加载...
            </Text>
        </View>)
    }

    bindItem({item}){
        return (<TouchableOpacity style={styles.container} onPress={() => 
            {
                let {navigate} = this.props.navigation
                // ToastAndroid.show('咋',ToastAndroid.SHORT)

                // this.props.navigation.navigate('Detail')

                navigate('ImageDetail',{
                    url:item.url,
                    desc:item.desc,
                    id:item._id,
                    title:item.type,
                })
            }}>
                    <Image source={{uri:item.url} } style={styles.image}/>
            </TouchableOpacity>)
    }

    componentDidMount(){
        // start load data
        this.fetchData()
    }

    fetchData(page = this.mPage){
        let url = REQUEST_URL + `/${10}/${++page}`
        fetch(url).then((resp) => {
            return resp.json()
        }).then(respData => {
            let results = respData.results
            let footerState = this.state.footerState
            if (results && results.size < 10) {
                footerState = RefreshState.NoMore
            }

            if (results === null) {
                footerState = RefreshState.Failure
            }

            if (typeof footerState === 'undefined') {
                footerState = RefreshFooter.Idle
            }

            this.setState({
                isLoad:true,
                data:this.state.data.concat(respData.results),
                footerState:footerState
            })
            this._onRefreshEnd()
        })
    }

    _refreshData(){
        // 第一页
        this.mPage = 0
        this.state.data = []
        this.fetchData(this.mPage)
    }


}

const styles = StyleSheet.create({

    container : {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    
    text : {

    },
    list:{

    },
    image : {
        width:'100%',height:400
    }

})

const navigator = createStackNavigator({
    Girl:GirlScreen,
    ImageDetail:ImageDetail
})

export default GirlScreen