import React, {useCallback} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenNames} from '../../constants/screenNames';
import {TabBarStackType} from '../types';
import Home from '../../screen/Home/index';
import getTabOptions from './options';
import Favorite from '../../screen/Favorite';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator<TabBarStackType>();

export default function TabBarStack() {
  const {t} = useTranslation();
  const tabOptions = useCallback(
    route => {
      return getTabOptions(route);
    },
    [t],
  );
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HOME_PAGE}
      screenOptions={({route}) => tabOptions(route)}>
      <Tab.Screen name={ScreenNames.HOME_PAGE} component={Home} />
      <Tab.Screen name={ScreenNames.FAVORITE_PAGE} component={Favorite} />
    </Tab.Navigator>
  );
}
