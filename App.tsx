import React, {useEffect} from 'react';
import {DevSettings, NativeModules, SafeAreaView} from 'react-native';
import LoginPage from './src/screen/Auth/Login/index';

function App(): React.JSX.Element {
  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(true);
      });
      DevSettings.addMenuItem('Stop Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(false);
      });
    }
    console.log('info', {age: 25, array: [1, 2, 3, 4, {name: 'artur'}]});
    fetch('https://google.com');
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <LoginPage />
    </SafeAreaView>
  );
}

export default App;
