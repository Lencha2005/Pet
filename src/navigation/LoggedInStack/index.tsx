import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoggedInStackType} from '../types';
import {ScreenNames} from '../../constants/screenNames';
import DrawerStack from '../DrawerStack';

const Stack = createNativeStackNavigator<LoggedInStackType>();

export default function LoggedInStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.DRAWER_STACK}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={ScreenNames.DRAWER_STACK} component={DrawerStack} />
    </Stack.Navigator>
  );
}
