import React,{Component} from 'react'
import {View
    ,Text
    ,Image
    ,StyleSheet} from 'react-native'

export default class ImageDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render(){

        const {navigation} = this.props
        let url = navigation.getParam('url','')
        let desc = navigation.getParam('desc','')

        return (<View style={styles.container}>
            <Image style={styles.image} source={{uri:url}}/>
            <Text style={styles.text}>{desc}</Text>
        </View>)
    }

}

const styles = StyleSheet.create({
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