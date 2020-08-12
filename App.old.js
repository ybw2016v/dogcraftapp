import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Button,
    ToastAndroid
} from 'react-native';
import { Platform, BackHandler } from 'react-native';
// import SplashScreen from 'react-native-splash-screen';
import SplashScreen from 'react-native-splash-screen'
import {WebView} from 'react-native-webview';
// const sleep = require('es6-sleep').promise;
// 


export default class BoxDemo extends Component {

//   async sleep(milliansecond) {
//     await sleep(milliansecond);
// // };

componentDidMount() {
  SplashScreen.hide();
}

  onNavigationStateChange = navState => {
    this.setState({
      backButtonEnabled: navState.canGoBack
    });
  };

  // //自定义返回事件
  // _goBackPage = () => {

  //   //  官网中描述:backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
  //   if (this.state.backButtonEnabled) {
  //     this.refs['webView'].goBack();
  //   } else {//否则返回到上一个页面
  //     this.nav.goBack();
  //   }
  // };

  // 监听原生返回键事件
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

reloaddog =() =>{
  this.refs['webView'].reload();
}

  onBackAndroid = () => {
    //  官网中描述:backButtonEnabled: false,表示webView中没有返回事件，为true则表示该webView有回退事件
    if (this.state.backButtonEnabled) {
      this.refs['webView'].goBack();
      return true;
    } else {
     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
      this.lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
    }
  };



  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(15,75,120,1)'
      }}>
        <Button
  onPress={this.reloaddog}
  title="Reload"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
        
        <WebView
      source={{ uri: 'https://sigd.dogcraft.top' }}
      style={{ width: '100%', height: '100%' }}
      ref="webView"
      onNavigationStateChange={this.onNavigationStateChange}
    />
    </View>
      
    );
  }
}