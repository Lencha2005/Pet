import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScreenNames} from '../../constants/screenNames';
import TabBarStack from '../TabBarStack';
import {DrawerStackType} from '../types';
import Header from '../../common/components/Header';
import {Dimensions} from 'react-native';
import DrawerContent from '../../common/components/DrawerContent';

const Drawer = createDrawerNavigator<DrawerStackType>();

export default function DrawerStack() {
  const renderHeader = () => <Header />;

  return (
    <Drawer.Navigator
      initialRouteName={ScreenNames.TAB_BAR_STACK}
      drawerContent={DrawerContent}
      screenOptions={{
        header: renderHeader,
        drawerPosition: 'right',
        drawerStyle: {width: Dimensions.get('window').width},
      }}>
      <Drawer.Screen name={ScreenNames.TAB_BAR_STACK} component={TabBarStack} />
    </Drawer.Navigator>
  );
}
