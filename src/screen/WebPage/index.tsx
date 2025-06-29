import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import WebView from 'react-native-webview';
//language=JavaScript
const injection = () => `
  window.addEventListener('load',()=>{
  // alert('hello world')
    window.ReactNativeWebView.postMessage(JSON.stringify({message:"hello world"}))
})`;

export default () => {
  return (
    <View style={{flex: 1}}>
      <WebView
        javaScriptEnabled
        nestedScrollEnabled={true}
        onMessage={event => {
          const response = JSON.parse(event.nativeEvent.data);
          console.log('response', response);
        }}
        onShouldStartLoadWithRequest={() => {
          return true;
        }}
        injectedJavaScriptBeforeContentLoaded={injection()}
        injectedJavaScriptForMainFrameOnly={false}
        injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
        source={{uri: 'https://www.edu.goit.global/uk'}}
        style={{flex: 1}}
        renderLoading={() => <ActivityIndicator />}
      />
    </View>
  );
};
