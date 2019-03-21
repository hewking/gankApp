
import React,{Component} from 'react'
import {View,StyleSheet,Text,Image,FlatList
    ,ProgressBarAndroid,SectionList,StatusBar,ToastAndroid,TouchableOpacity} from 'react-native'
import {createMaterialTopTabNavigator,createTabNavigator} from 'react-navigation'
// import { TouchableOpacity } from 'react-native-gesture-handler';

const REQUEST_URL = 'http://gank.io/api/today'

export default class HomeScreen extends Component {

    static navigationOptions = {
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
                />
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
                    this.props.navigation.navigate('Detail',{
                        url:item.url
                    })
                    ToastAndroid.show('detail',ToastAndroid.SHORT)
                }}>
                <View style = {styles.container}>
                    <View style={{width:'100%'}}>
                        {item.images && (<Image source={{uri:item.images[0]}} style={{width:'100%'}}/>)}
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

}

const styles = StyleSheet.create({

    container : {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f5fcff'
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

    }

})