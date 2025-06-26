import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenNames} from '../constants/screenNames';
import {RootStackNavigation} from './types';
import LoggedInStack from './LoggedInStack';
import LoggedOutStack from './LoggedOutStack';
import ErrorBoundary from '../common/components/ErrorBoundary';

const Stack = createNativeStackNavigator<RootStackNavigation>();

export default function RootNavigation() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#FAFAFA',
        },
      }}>
      <ErrorBoundary>
        <Stack.Navigator
          initialRouteName={ScreenNames.LOGGED_IN_STACK}
          screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={ScreenNames.LOGGED_IN_STACK}
            component={LoggedInStack}
          />
          <Stack.Screen
            name={ScreenNames.LOGGED_OUT_STACK}
            component={LoggedOutStack}
          />
        </Stack.Navigator>
      </ErrorBoundary>
    </NavigationContainer>
  );
}
