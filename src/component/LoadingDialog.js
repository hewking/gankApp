import React,{Component} from 'react'
import {View
        ,Modal
        ,StyleSheet
        ,ActivityIndicator
        ,Text} from 'react-native'
import LoadingView from '../widgets/LoadingView';
import {Colors} from '../util/DesignSystem'

export default class extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible,
        });
    }

    render(){
        let {text} = this.props
        text = text || '正在加载中...'
        return ((
            <Modal
             transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                  this.setModalVisible(false)
              }}
            >
                    <View style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center',}} >
                        <View style={{
                                backgroundColor:'#1b1f2aac',
                                borderRadius:3,
                                padding:10,
                                alignItems:'center',
                                justifyContent:'center',
                               }}>
                            <ActivityIndicator size='small' style={{margin:10}}/>
                             <Text style={{fontSize : 12,color:Colors.whiteLabel}}>{text}</Text>
                        </View>
                    </View>
            </Modal>        
      ))
    }

}

const styles = StyleSheet.create({
    dialogContainer : {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#1b1f2aac',
        borderRadius:3,
        flexDirection:'column',
        padding:10,
    },
    container : {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'transparent',
        borderRadius:3,
        flexDirection:'column'
    }
})