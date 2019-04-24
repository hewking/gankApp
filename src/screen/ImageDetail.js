import React,{Component} from 'react'
import {View
    ,Text
    ,Image
    ,StyleSheet} from 'react-native'
import TitleBar from '../widgets/TitleBar';
import ImageViewr from 'react-native-image-zoom-viewer'

export default class ImageDetail extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title:navigation.getParam('title',"妹子大图"),
        }
    }

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render(){

        const {navigation} = this.props
        let url = navigation.getParam('url','')
        let desc = navigation.getParam('desc','')

        // return (<View style={styles.outer}>
        //     <View style={styles.container}>

        //     <Image style={styles.image} source={{uri:url}}/>
        //     <Text style={styles.text}>{desc}</Text>
        //     </View>
        // </View>)
        let imgs = [{url:url}]
        return (<View style={{flex:1}}>
            <ImageViewr
                imageUrls={imgs}
            />
        </View>)
    }

}

const styles = StyleSheet.create({
    outer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width:400,
        height:400
    },
    text:{
        padding:10,
        fontSize:16,
        color:'#4d3241'
    }
})