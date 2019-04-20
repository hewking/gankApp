
import React,{Component} from 'react'
import {View,StyleSheet,Text,Image,FlatList
    ,ProgressBarAndroid,SectionList,StatusBar,ToastAndroid,TouchableOpacity} from 'react-native'
import {createMaterialTopTabNavigator,createTabNavigator} from 'react-navigation'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import ToastExample  from './component/ToastExample'
import * as DesignSystem from './DesignSystem'
import ImageGrid from './widgets/ImageGrid';
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons';

import Svg from './component/Svg';
import svgs from './assets/svgs';

const REQUEST_URL = 'http://gank.io/api/today'

export default class HomeScreen extends Component {

    static navigationOptions = {
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
            // 动态创建category
            // const topTabNavigator = createMaterialTopTabNavigator({
                
            // })

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
            {
        //   Object.keys(svgs).map((icon, index) =>
            // <Svg key={`key`} icon={'sao'} size="30" />
            //  )
        }
            {/* <Svg key = 'fendi'  size={30} /> */}

            <TouchableOpacity style={{backgroundColor: '#f3f3f3',position:'absolute',bottom:120,right:10}}
            onPress={() => {
                ToastAndroid.show('float action',ToastAndroid.SHORT)
            }}>
                    {/* Rest of the app comes ABOVE the action button component !*/}
                    <ActionButton buttonColor="rgba(231,76,60,1)">
                    <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                        <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                        <Icon name="md-done-all" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    </ActionButton>
                </TouchableOpacity>
            </View>)
        } else {
            return this.rendeLoadingView()
        }
        
    }

    rendeLoadingView(){
        return (<View style={styles.container}>
            <Text>
                正在加载...
            </Text>
        </View>)
    }

    bindItem({item}) {
            return (
                <TouchableOpacity style={styles.touchable}
                onPress={() => {
                    ToastExample.show('native',ToastExample.SHORT)
                    this.props.navigation.navigate('Detail',{
                        url:item.url,
                        title:item.url,
                    })
                }}>
                <View style = {styles.container}>
                    <View style={{width:'100%'}}>
                        {console.log(`item.images => ${item.images && item.images}`)}
                        {/* {item.images && (<Image source={{uri:item.images[0]}} style={{width:'100%',height:200}}/>)} */}
                        {item.images && (<ImageGrid height={250} width={DesignSystem.ScreenSize.width - 40} images={item.images}/>)}
                        <Text style={styles.text}>{item.desc}</Text>
                        <Text>类型:{item.type}</Text>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{flex:1}}>作者:{item.who}</Text>
                        <Text style={{flex:2}}>发布日期:{item.publishedAt}</Text>
                    </View>
                </View>
                </View>
                </TouchableOpacity>
    
            )
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
            this.setState({
                isLoad:true,
                data:this.state.data.concat(respData.results.Android),
                category:this.state.category.concat(respData.category)
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
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5fcff',
        // flexDirection:'column'
    },

    list:{
        
    },

    touchable:{width:'100%', flex:1, flexDirection:'row', 
    paddingVertical:8,paddingHorizontal:20, borderBottomWidth:1, borderColor:'#0002'},
    
    text : {
        fontSize : 16,
        padding : 8,
        fontStyle:'normal',
        width:'100%',

    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },

})