import React,{Component} from 'react'
import {View,Button,Text,StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class NewsDetail extends Component{

    render(){
        return (<View style={styles.container}>
            <TouchableOpacity>
                <Text>hello world</Text>
            </TouchableOpacity>
        </View>)
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})