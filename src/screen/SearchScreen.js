import React from 'react'
import {View
        ,Image
        ,Text
        ,StyleSheet
        ,Button
        ,TextInput
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

export default class extends BaseListScreen {

    static navigationOptions = ({navigation}) => {
        return {

            headerTitle = (<View>
                    <TextInput/>
            </View>)
        }
    }

    /**
     * 返回itemView
     */
    renderContentView(){
        return (<TouchableWithoutFeedback   onPress={() => {
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
        </TouchableWithoutFeedback>)
    }

    renderRootView(){
        return (<View style={{flexDirection:'column'}}>
             {super.renderRootView()}
        </View>)
    }

    loadData(){
        
    }

    buildUrl(){
        let keyword = 'rn'
        return `${Api.SEARCH_URL}?q=${keyword}`
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