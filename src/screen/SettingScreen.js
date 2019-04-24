import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity
    ,ScrollView
    ,ToastAndroid} from 'react-native'
import { Colors } from '../util/DesignSystem';
import SettingItem from '../widgets/SettingItem'
import LoadingDialog from '../component/LoadingDialog';

export default class SettingScreen extends Component {

    render(){
        return (<View style={styles.container}>
            <LoadingDialog text='正在清除...' ref={(ref) => this.loading = ref}/>
            <ScrollView style={{flex:1,width:'100%'}}>
                <SettingItem style={styles.item} icon={'icon_clear'} title={'清除缓存'} onPress={() => {
                    // this.props.navigation.navigate('Responder')
                    this.loading.setModalVisible(true)
                    setTimeout(()=>{
                        this.loading.setModalVisible(false)
                        ToastAndroid.show('清除成功',ToastAndroid.SHORT)
                    },500)
                }}/>
            </ScrollView>
        </View>)
    }
}

const styles = StyleSheet.create({
    container : {flex:1,justifyContent:'center',alignItems:'center'
,backgroundColor:Colors.background2},
    text : {
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        paddingRight:15,
        color:Colors.buttonText
    },
    textContainer : {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.lightBackground
    },
    item:{
        marginVertical:16,
    }
})