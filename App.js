'use strict';


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Linking,
    Alert,
    Button,
    ToastAndroid
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Platform, BackHandler } from 'react-native';
import {WebView} from 'react-native-webview';

export default class example extends Component {

    componentDidMount() {
      // setTimeout("SplashScreen.hide();",2000)
      setTimeout(SplashScreen.hide,2000)
      if (Platform.OS === 'android') {
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
      }
        // SplashScreen.hide();
    }
    onNavigationStateChange = navState => {
      this.setState({
        backButtonEnabled: navState.canGoBack
      });
    };
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
            // <TouchableOpacity
            //     style={styles.container}
            //     onPress={(e)=> {
            //         Linking.openURL('https://coding.imooc.com/class/304.html');
            //     }}
            // >
            //     <View >
            //         <Text style={styles.item}>
            //             SplashScreen 启动屏
            //         </Text>
            //         <Text style={styles.item}>
            //             @：http://www.devio.org/
            //         </Text>
            //         <Text style={styles.item}>
            //             GitHub:https://github.com/crazycodeboy
            //         </Text>
            //         <Text style={styles.item}>
            //             Email:crazycodeboy@gmail.com
            //         </Text>
            //     </View>
            // </TouchableOpacity>
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(15,75,120,1)'
            }}>
              {/* <Button
        onPress={this.reloaddog}
        title="Reload"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}
              
              <WebView
            source={{ uri: 'https://m.dogcraft.top' }}
            style={{ width: '100%', height: '100%' }}
            ref="webView"
            onNavigationStateChange={this.onNavigationStateChange}
          />
          </View>
        )
    }

}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f3f2f2',
//         marginTop: 30
//     },
//     item: {
//         fontSize: 20,
//     },
//     line: {
//         flex: 1,
//         height: 0.3,
//         backgroundColor: 'darkgray',
//     },
// })