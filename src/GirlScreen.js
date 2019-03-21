
import React,{Component} from 'react'
import {View,StyleSheet,Text,Image
    ,TouchableOpacity,ToastAndroid
,FlatList} from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import ImageDetail from './ImageDetail'

const REQUEST_URL = 'http://gank.io/api/data/福利/10/1'

class GirlScreen extends Component {

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
        this.state = {
            isLoad : false,
            data:[],
        }
    }

    render(){
        if (this.state.isLoad) {
            return (<View style={styles.container}>
                <FlatList style={styles.list}
                    data={this.state.data}
                    renderItem={this.bindItem}
                    keyExtractor={(item) => item._id}
                />
            </View>)
        } else {
            return this.renderLoadingView()
        }
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
                ToastAndroid.show('咋',ToastAndroid.SHORT)

                this.props.navigation.navigate('Detail')

                // navigate('ImageDetail',{
                //     url:item.url,
                //     desc:item.desc,
                //     id:item._id,
                // })
            }}>
                    <Image source={{uri:item.url} } style={styles.image}/>
            </TouchableOpacity>)
    }

    componentDidMount(){
        // start load data
        this.fetchData()
    }

    fetchData(){
        fetch(REQUEST_URL).then((resp) => {
            return resp.json()
        }).then(respData => {
            this.setState({
                isLoad:true,
                data:respData.results
            })
        })
    }
}

const styles = StyleSheet.create({

    container : {
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
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