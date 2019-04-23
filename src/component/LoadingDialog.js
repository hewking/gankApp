import React,{Component} from 'react'
import {View
        ,Modal
        ,StyleSheet
        ,ActivityIndicator
        ,Text} from 'react-native'
import LoadingView from '../widgets/LoadingView';

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
        return ((
            <Modal
             transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                alert("Modal has been closed.");
              }}
            >
                    <View style={{flex:1,
                                alignItems:'center',
                                justifyContent:'center',}} >
                        <View style={{
                                backgroundColor:'#1b1f2aac',
                                borderRadius:3,
                                width:50,
                                height:50}}>
                            <LoadingView/>
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