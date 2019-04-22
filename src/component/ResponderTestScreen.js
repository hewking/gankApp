import React,{Component} from 'react'
import {Text
    ,Button
    ,View  
    ,StyleSheet
    ,Image
    ,PanResponder} from 'react-native'


export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redViewBgColor: 'red',
            marginTop: 100,
            marginLeft: 100,
        }
    }

    componentWillMount(){
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponder:  (evt, gestureState) => {
                return true;
            },
            onPanResponderGrant: (evt, gestureState) => {
                this._highlight();
            },
            onPanResponderMove: (evt, gestureState) => {
                // console.log(`locationX : ${evt.nativeEvent.locationX}   locationY : ${evt.nativeEvent.locationY}`);
                // this.setState({
                //         marginLeft: evt.nativeEvent.locationX,
                //         marginTop: evt.nativeEvent.locationY,
                // });

                console.log(`pageX : ${evt.nativeEvent.pageX}   pageY : ${evt.nativeEvent.pageY}`);
                this.setState({
                        marginLeft: evt.nativeEvent.pageX ,
                        marginTop: evt.nativeEvent.pageY,
                });
            },
            onPanResponderRelease: (evt, gestureState) => {
                this._unhighlight();
            },
            onPanResponderTerminate: (evt, gestureState) => {
            },
        });
    }

    _unhighlight(){
        this.setState({redViewBgColor: 'red'})
    }

    _highlight(){
        this.setState({redViewBgColor: 'blue'})
    }

    render() {
        return (
            <View style={styles.container}  {...this._panResponder.panHandlers}>
                <View style={[styles.redView,{backgroundColor: this.state.redViewBgColor
                ,marginTop: this.state.marginTop,
                marginLeft: this.state.marginLeft,}]}
                   
                ></View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'skyblue'
    },
    redView: {
        width: 100,
        height: 100,
        marginTop: 100,
        marginLeft: 100,
    },

});