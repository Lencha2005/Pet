import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenNames} from '../../constants/screenNames';
import {TabBarStackType} from '../types';
import Home from '../../screen/Home/index';
import Favorite from '../../screen/Favorite/index';
import getTabOptions from './options';

const Tab = createBottomTabNavigator<TabBarStackType>();

export default function TabBarStack() {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={({route}) => getTabOptions(route)}>
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.FAVORATE_PAGE} component={Favorite} />
    </Tab.Navigator>
  );
}
