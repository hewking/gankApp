import React,{Component} from 'react'
import {View
    ,Text
    ,Button
    ,Image
    ,TouchableNativeFeedback
    ,StyleSheet} from 'react-native'
import { Colors } from '../util/DesignSystem';
import Svg from '../component/Svg'
import PlatformTouchable from '../widgets/PlatformTouchable'

export default class extends Component {

    constructor(props){
        super(props)
    }

    render(){
        const {icon,title,onPress} = this.props
        const size = 20
        return (<PlatformTouchable style={{ marginVertical:16}} onPress={onPress}>
            <View style={[styles.container]} >
                <Svg 
                    style={styles.icon}
                size={size}
                icon={icon}/>
                <Text style={[styles.text,{paddingLeft:0}]}>{title}</Text>
                <View style={{flex:1,justifyContent:'flex-end',flexDirection:'row'}}>
                <Svg 
                    style={[styles.icon]}
                size={size}
                icon={'icon_next'}/>
                </View>
            </View>
        </PlatformTouchable>)
    }

}

const styles = StyleSheet.create({
    container : {
        backgroundColor:Colors.whiteLabel,
        flex:1,
        flexDirection:'row',
    },
    icon : {
        margin:16,
    },
    text : {
        fontSize:16,
        color:Colors.mainTextLabel2,
        padding:16,
    }
})