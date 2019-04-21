import {ToastAndroid} from 'react-native'

export function show(msg) {
    ToastAndroid.show(msg,ToastAndroid.SHORT)
}