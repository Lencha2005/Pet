import React from 'react';
import {Text, View} from 'react-native';
import {HeartIcon, PawIcon} from '../../assets/icons';
import {ScreenNames} from '../../constants/screenNames';
import {fonts} from '../../constants/fonts';
import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';

const getName = (name: string) => {
  switch (name) {
    case ScreenNames.FAVORATE_PAGE:
      return 'Улюблені';
    case ScreenNames.HOME_PAGE:
      return 'Пухнастики';
  }
};
const getIcon = (name: string, focused: boolean) => {
  switch (name) {
    case ScreenNames.FAVORATE_PAGE:
      return <HeartIcon isFocused={focused} color={'#0B0B0B'} />;
    case ScreenNames.HOME_PAGE:
      return <PawIcon isFocused={focused} color={'#0B0B0B'} />;
  }
};
export default function getTabOptions(route: any): BottomTabNavigationOptions {
  return {
    tabBarStyle: {
      height: 52,
      width: '100%',
      backgroundColor: '#E5F3F5',
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
    },
    tabBarShowLabel: false,
    headerShown: false,
    tabBarIcon: ({focused}) => {
      return (
        <View style={{alignItems: 'center', gap: 5}}>
          {getIcon(route.name, focused)}
          <Text
            style={{
              fontFamily: fonts.MontserratRegular,
              color: focused ? 'black' : '#838383',
            }}>
            {getName(route.name)}
          </Text>
        </View>
      );
    },
  };
}
