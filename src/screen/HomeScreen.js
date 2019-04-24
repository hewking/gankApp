
import React,{Component} from 'react'
import {View,StyleSheet,Text,Image,FlatList
    ,ProgressBarAndroid
    ,SectionList
    ,StatusBar
    ,ToastAndroid
    ,TouchableOpacity
    ,TouchableWithoutFeedback,
    TouchableNativeFeedback} from 'react-native'
import {createMaterialTopTabNavigator,createTabNavigator} from 'react-navigation'
import SvgStateImage from '../widgets/SvgStateImage'
import DateUtils from '../util/DateUtils'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import ToastExample  from '../component/ToastExample'
import * as DesignSystem from '../util/DesignSystem'
import {Colors} from '../util/DesignSystem'
import ImageGrid from '../widgets/ImageGrid';
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';

import Svg from '../component/Svg';
import svgs from '../res/assets/svgs';
import LoadingView from '../widgets/LoadingView';
import CategoryEntity from '../entitys/CategoryEntity';
import * as L from '../util/L'
import GirlEntity from '../entitys/GirlEntity';
import PlatformTouchable from '../widgets/PlatformTouchable'

const REQUEST_URL = 'http://gank.io/api/today'

const Types = {
    Girl : 'girl',
    Category : 'category',
    Item : 'item',
}

export default class HomeScreen extends Component {

    static navigationOptions = {
        // header:null,
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
        // 自己添加的state 字段
        this.state = {
            isLoad : false,
            data: [],
            category:[],
        }

        this.bindItem = this.bindItem.bind(this)
    }

    render(){
        status = this.state.isLoad
        if (status) {
            return (<View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={this.state.data}
                    renderItem={this.bindItem}
                    keyExtractor={item => item._id}// item._id可以唯一标识一个item
                    onRefresh={this._refreshData}
                    refreshing={false}
                    ref = {(list => this.flatList = list)}
                />
            {/* <TouchableWithoutFeedback style={{backgroundColor: '#f3f3f3',position:'absolute',bottom:120,right:10}}
            onPress={() => {
                ToastAndroid.show('float action',ToastAndroid.SHORT)
                 }}>
                    Rest of the app comes ABOVE the action button component !
                    <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#1abc9c' title="搜索" onPress={() => {}}>
                        <Icon name="md-search" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    </ActionButton>
                </TouchableWithoutFeedback> */}
            </View>)
        } else {
            return this.rendeLoadingView()
        }
        
    }

    rendeLoadingView(){
        return (<LoadingView/>)
    }

    bindItem({item}) {
        // L.d('bindItem item type : ' + item.itemType + ' url : ' + item.url)
           if (item.itemType === Types.Item) {
                return this._renderItemView(item)
           } else if (item.itemType === Types.Category) {
               return this._renderCategory(item)
           } else if (item.itemType === Types.Girl) {
                return this._renderGirl(item)
           } else {
               return null
           }
    }

    _renderItemView = (item) => {
        return ( <PlatformTouchable
            onPress={() => {
                // ToastExample.show('native',ToastExample.SHORT)
                this.props.navigation.navigate('Detail',{
                    url:item.url,
                    title:item.desc,
                 })
               }}>
                <View style = {styles.itemContainer}>
                        {/* {console.log(`item.images => ${item.images}`)} */}
                            {item.images && (this.renderImageGrid(item))}
                            <Text style={[styles.text,{fontWeight:'bold',marginHorizontal:8,paddingBottom:0}]}>{item.desc}}</Text>
                            <View style={{flexDirection:'row',flex:1}}>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                        <SvgStateImage
                                            style={styles.img}
                                            focusedIcon={'icon_personal'}
                                            normalIcon={'icon_personal'}
                                            size={16}
                                        />                        
                                        <Text style={[styles.text,{fontSize:14,padding:4}]}>作者:{item.who}</Text>
                                </View>
                                <View style={{flex:2,flexDirection:'row',alignItems:'center'}}>
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

    _renderCategory = (item) => {
        return (<Text style={styles.category}>{item.category}</Text>)
    }

    _renderGirl = (item) => {
        return <PlatformTouchable 
        onPress={() => {
            this.props.navigation.navigate('ImageDetail',{
                url:item.url,
                desc:item.desc,
                id:item._id,
                title:item.type,
        })
    }}>
            <Image style={styles.girl} source={{uri:item.url}}/>
        </PlatformTouchable>
    }

    renderImageGrid = (item) => {
        return <View style={{ marginHorizontal: 16, marginTop:8, }}>
            <ImageGrid  height={250} width={DesignSystem.ScreenSize.width - 40} images={item.images} />
        </View>;
    }

    componentDidMount(){
        // 开始加载数据
        this.fetchData()
    }

    _refreshData = () => {

    }

    _endRefresh() {
        this.flatList.refreshing = false
    }

    fetchData(){
        fetch(REQUEST_URL).then(resp => resp.json())
        .then(respData => {
             // 组合数据这里不简单
             //1 .首先data 添加一条福利图片
             // 2. 一次添加分类及分类下的数据 到data
             // 3.以上三种都需要标注不同的type 以便renderItem的时候不同的ui
             const datas = []

             let girls = respData.results['福利']
             girls.forEach((item) => {
                 item.itemType = Types.Girl
             })
            
             if (girls.length > 0) {
                datas.push(girls[0])
             }
             let categorys = respData.category
             categorys.forEach((category) => {
                // L.d('category : ' + category)
                if (category !== '福利') {
                        datas.push(new CategoryEntity(category,Types.Category))
                        respData.results[category].forEach((item) => {
                            item.itemType = Types.Item
                            datas.push(item)
                         })
                }
            })

            this.setState({
                isLoad:true,
                data:this.state.data.concat(datas),
            })
        })
    }

    async loadData(){
        let data = await fetch(REQUEST_URL).then(resp => resp.json())
        .then(respData => {
            
        })
    }

}

const styles = StyleSheet.create({

    container : {
        backgroundColor:Colors.background2,
    },

    list:{
        backgroundColor:Colors.background2
    },

    touchable:{width:'100%', flex:1, flexDirection:'row', 
    paddingVertical:8,paddingHorizontal:20, borderBottomWidth:1, borderColor:'#0002'},
    
    text : {
        fontSize : 16,
        padding : 8,
        color:Colors.mainTextLabel2,
        fontStyle:'normal',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
      category:{
        color:Colors.mainTextLabel2,
        fontSize:24,
        paddingHorizontal:8,
        paddingVertical:10,
        marginHorizontal:8,
        marginVertical : 15,
        fontWeight:'bold'
      },
      girl : {
          flex:1,
          height:400,
          marginHorizontal:16,
          marginTop:16,
          borderRadius:3,
      },
      img : {
        marginVertical : 8,
        marginLeft:16,
    },
    itemContainer : {
            marginHorizontal:8,
            marginTop:4,
            borderRadius:3,
            backgroundColor:Colors.whiteLabel,
            flexDirection:'column',
            borderWidth:1,
            borderColor:Colors.shadowBackground
    }

})