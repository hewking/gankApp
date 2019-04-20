import React ,{Component} from 'react'
import {View,Image,TouchableWithoutFeedback} from 'react-native'
import {getAsssetByName} from './Asset'

export default class extends Component {

    render(){
        const {normalIcon,focusedIcon,focus,onPress} = this.props
        let icon = focus ? getAsssetByName(focusedIcon) : getAsssetByName(normalIcon)
        return (<View>
            <Image 
            {...this.props}
            source={icon}/>
        </View>)
    }

}