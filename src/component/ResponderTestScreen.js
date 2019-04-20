import React,{Component} from 'react'
import {Text
    ,Button
    ,View  
    ,StyleSheet
    ,Image
    ,PanResponder} from 'react-native'


export default class extends Component {

    constructor(){
        super()
        this.state = {
            bg : 'red'
        }
    }

    render(){
        return (<View style={styles.container}>
                <View 
                {...this._panResponder}
                    style={[styles.rect,{backgroundColor:this.state.bg}]}
                >
                <View
                    {...this._gestureHandlers}
                 style={{backgroundColor:'skyblue',width:100,height:100}}/>
            </View>
        </View>)
    }

    componentDidMount(){
        this._gestureHandlers = {
            onStartShouldSetResponder: ()=> true,
            onMoveShouldSetResponder : () => true,
            onResponderGrant : () => {
                console.log('onResponderGrant')
                this.setState({bg:'red'})
            },
            onResponderMove : () => {
                console.log('onResponderMove')
                this.setState({bg:'green'})
            },
            onResponderRelease : () => {
                  console.log('onResponderMove')
                this.setState({bg:'skyblue'})
            }
        }

        this._panResponder = PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => {
                console.log('onStartShouldSetPanResponder')
                return true},
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      
            onPanResponderGrant: (evt, gestureState) => {
              // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
      
              // gestureState.{x,y} 现在会被设置为0
              console.log('onPanResponderGrant')
            },
            onPanResponderMove: (evt, gestureState) => {
              // 最近一次的移动距离为gestureState.move{X,Y}
      
              // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
              console.log('onPanResponderMove')
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
              // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
              // 一般来说这意味着一个手势操作已经成功完成。
              console.log('onPanResponderRelease')

            },
            onPanResponderTerminate: (evt, gestureState) => {
              // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
              console.log('onPanResponderTerminate')
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
              // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
              // 默认返回true。目前暂时只支持android。
              return true;
            },
          });

    }

}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    rect : {
        flex:1,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    }
})