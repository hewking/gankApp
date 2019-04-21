/**
 * 九宫格显示图片
 */
import React,{Component} from 'react'
import {View,StyleSheet,Image,Platform,Text,TouchableOpacity} from 'react-native'
import * as DesignSystem from '../util/DesignSystem'

export default class extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render(){
        const {height,width,images} = this.props
        let size = Math.max(height,width)
        const imgs = images.length
        let childSize = 0
        let mode = 1
        // console.log('childsize => ' + imgs)
        if (imgs > 4) {
            childSize = size / 3
            mode = 3
        } else if (imgs >= 2) {
            childSize = size / 2
            mode = 2
        } else {
            childSize = size
            mode = 3
        }

        // 动态添加Image
        let childs = []

        let columns = Math.ceil(imgs / mode) // 行数
        let index = 0
        for (i = 0 ; i < columns ; i ++) {
            let childsInContainer = []
            for (j = 0 ; j < mode ;j ++) {
                if (index >= imgs) {
                    break
                }
                let targetIndex = index
                childsInContainer.push(<Image
                    style={{width:childSize,height:childSize,alignSelf:'center',resizeMode:'cover',borderRadius:3}}
                    source={{uri:images[targetIndex]}}
                    key={images[targetIndex]}// 在List中必须指定Key唯一标识
                />)
                index ++
            }
            const itemContainer = <View style={styles.itemContainer} key={i}>
            {childsInContainer}
            </View>
            childs.push(itemContainer)
        }

        // 关键是怎么换行，之类的
        return (<View style={styles.container}>
            {childs}
        </View>)

    }

}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    itemContainer:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        flexDirection:'row'
    }, 
    image : {

    }

})