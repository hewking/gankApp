import React from 'react'
import {View
        ,Image
        ,Text
        ,StyleSheet
        ,Button
        ,TextInput
        ,Platform
        } from 'react-native'

import { Colors } from '../util/DesignSystem';
import * as L from '../util/L'
import * as T from '../util/T'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Svg from '../component/Svg';
import SvgStateImage from '../widgets/SvgStateImage'
import DateUtils from '../util/DateUtils'
import Api from '../constant/Api'
import BaseListScreen from '../component/BaseListScreen'
import PlatformTouchable from '../widgets/PlatformTouchable'
import Search from 'react-native-search-box'
import {getAsssetByName} from '../util/Asset'
import RefreshState from '../component/refreshList/RefreshState';
import LoadingDialog from '../component/LoadingDialog';

export default class extends BaseListScreen {

    static navigationOptions = ({navigation}) => {

        return {
            headerRight:null,
            title:Platform.select({android:'Android开发资讯',ios:null}),
            // headerTitle:<View style={{flex:1}}><Search
            //     style={{backgroundColor:Colors.colorPrimary}}
            // /></View>,
            // headerTitleStyle:{
            //     flexDirection:'row',
            //     justifyContent:'flex-start'
            // }
        }
    }

    render(){
        return (<View style={{flex:1,flexDirection:'column',backgroundColor:Colors.background2}}>
                        <LoadingDialog ref={(ref) => this.loading = ref}/>
                        <Search
                        ref="search_box"
                        onSearch={this.onSearch}
                        placeholder={'搜索'}
                        cancelTitle='取消'
                        titleCancelColor={Colors.mainTextLabel2}
                        backgroundColor={Colors.whiteLabel}
            />
                {super.render()}
        </View>)
    }

    onSearch = (searchText) => {
        return new Promise((resolve, reject) => {
            console.log(searchText);
            console.log('Add your search function here.');
            this.search(searchText)
            resolve();
        });
    }

    /**
     * 返回itemView
     */
    renderContentView({item}){
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

    renderLoadingView(){
        return <View style={{padding : 10,flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{fontSize : 12,color:Colors.darkLabel}}>搜索指定内容</Text>
    </View>
    }

    renderRootView(){
        return (<View style={{flex:1,flexDirection:'column'}}>
             {super.renderRootView()}
        </View>)
    }

    loadData(url){
        this.loading.setModalVisible(true)
        fetch(url).then(resp => (resp.json()))
        .then(respJson => {
            let results = respJson.results
            let length = results.length
            // 改变底部状态 调用endRefreshing函数
            // 如果 length < 10 说明没有更多可以加载了 NO_MORE
            // lenght >= 10 可以加载
            results.forEach(item => {
                item._id = item.ganhuo_id
            });
            L.d('results : ' + results.length)
            this.setState({
                isLoad : true,
                datas:this.state.datas.concat(results)
            })
            this.mPage ++
            this.flatList.endRefreshing(RefreshState.NoMore)
            this.loading.setModalVisible(false)
        }).catch(err => {
            this.flatList.endRefreshing(RefreshState.Failure)
            this.loading.setModalVisible(false)
        })
    }

    search = (saerchText) => {
        let url = `${Api.SEARCH_URL}/${saerchText}/category/all/count/20/page/1`
        // let url = 'http://gank.io/api/data/Android/10/1'
        L.d('load url : ' + url)
        this.loadData(url)
    }


    componentDidMount(){

    }

}

const styles = StyleSheet.create({
    container : {

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
