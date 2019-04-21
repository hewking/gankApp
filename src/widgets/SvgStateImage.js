import React ,{Component} from 'react'
import {View,Image,TouchableWithoutFeedback} from 'react-native'
import Svg from '../component/Svg';
export default class extends Component {

    render(){
        const {normalIcon,focusedIcon,focus,onPress,size} = this.props
        let icon = focus ? focusedIcon : normalIcon
        return (<View>
            <Svg 
            size={size}
            {...this.props}
            icon={icon}/>
        </View>)
    }

}