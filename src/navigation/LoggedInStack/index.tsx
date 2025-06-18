import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoggedInStackType} from '../types';
import {ScreenNames} from '../../constants/screenNames';
import Home from '../../screen/Home';

const Stack = createNativeStackNavigator<LoggedInStackType>();

export default function LoggedInStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ScreenNames.HOME_PAGE} component={Home} />
    </Stack.Navigator>
  );
}
