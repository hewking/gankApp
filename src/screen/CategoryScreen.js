import React,{Component} from 'react'
import {View
    ,Text
    ,Button
    ,StyleSheet} from 'react-native'
import RefreshFlatList from '../component/refreshList/RefreshFlatList';
import {CATEGORY_URL} from '../constant/Api'
import RefreshState from '../component/refreshList/RefreshState';
import LoadingView from '../widgets/LoadingView';
import { Colors } from '../util/DesignSystem';
import * as L from '../util/L'
import * as T from '../util/T'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Svg from '../component/Svg';
import SvgStateImage from '../widgets/SvgStateImage'
import DateUtils from '../util/DateUtils'
import PlatformTouchable from '../widgets/PlatformTouchable'

const PAGE_SIZE = 10

export default class extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoad : false,
            datas : [],
        }

        this.mPage = 1
        this.category = this.props.category

        this._bindItem = this._bindItem.bind(this)
    }

    render(){
        L.d('category render props ' + this.props)
        if (this.state.isLoad) {
            return (<RefreshFlatList
                styles={styles.container}
                onHeadRefresh={this._refreshData}
                onFooterRefresh={this._loadMore}
                data={this.state.datas}
                renderItem={this._bindItem}
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
        return (<LoadingView/>)
    }

    _refreshData = ()=> {
        this.mPage = 1
        this.state.datas = [] // clear data
        this._fetchData()
    }

    _loadMore = () => {
        this._fetchData()
    }

    _fetchData(page = this.mPage){
        let url = CATEGORY_URL + `/${this.category}/${PAGE_SIZE}/${page}`
        L.d('fetch url : ' + url)
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
            L.d('results : ' + results.length)
            this.setState({
                isLoad : true,
                datas:this.state.datas.concat(results)
            })
            this.mPage ++
            this.flatList.endRefreshing(state)
        }).catch(err => {
            this.flatList.endRefreshing(RefreshState.Failure)
        })

    }

    _bindItem({item}) {
        return (<PlatformTouchable   onPress={() => {
            L.d('catregory navigation ' + this.props)
            this.props.navigation.navigate('Detail',{
                url:item.url,
                title:item.desc,
            })
        }}>
            <View style={styles.item}>
                <Text style={[styles.text,{fontWeight:'bold'}]}>{item.desc}}</Text>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                            <SvgStateImage
                                style={styles.img}
                                focusedIcon={'icon_personal'}
                                normalIcon={'icon_personal'}
                                size={16}
                            />                        
                            <Text style={[styles.text,{fontSize:14,padding:4}]}>作者:{item.who}</Text>
                    </View>
                    <View style={{flex:1.4,flexDirection:'row',alignItems:'center'}}>
                            <SvgStateImage
                                style={styles.img}
                                focusedIcon={'icon_meditor_time'}
                                normalIcon={'icon_meditor_time'}
                                size={16}
                            />                        
                            <Text style={[styles.text,{fontSize:14,paddingLeft:4}]}>发布日期:{DateUtils.getTimeDuration(item.publishedAt)}</Text>
                    </View>
                </View>
            </View>
        </PlatformTouchable>)
    }

    onEnter(){
        T.show('Enter')
    }

    onLeave(){
        T.show('Leave')
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
    text : {
        fontSize : 16,
        padding : 8,
        fontStyle:'normal',
        color:Colors.mainTextLabel2,
    },
    img : {
        marginVertical : 8,
        marginLeft:8,
    }
})