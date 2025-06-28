import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {DevSettings, NativeModules, SafeAreaView} from 'react-native';
import RootNavigation from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import './i18.config';
// import {firebase} from '@react-native-firebase/firestore';
// import {animals} from './animals_list.js';

function App(): React.JSX.Element {
  // const db = firebase.firestore();

  // const uploadAnimalsToFirestore = async animals => {
  //   const collectionRef = db.collection('animals');

  //   for (const animal of animals) {
  //     await collectionRef
  //       .add(animal)
  //       .then(docRef => {
  //         console.log(`Document written with ID: ${docRef.id}`);
  //       })
  //       .catch(error => {
  //         console.error('Error adding document: ', error);
  //       });
  //   }
  // };
  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(true);
      });
      DevSettings.addMenuItem('Stop Debugging With debugger', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(false);
      });
    }
    // uploadAnimalsToFirestore(animals);
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <RootNavigation />
    </SafeAreaView>
  );
}

export default App;
