import React, {useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import DefaultButton from '../../DefaultButton';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarStackType} from '../../../../navigation/types';
import {ScreenNames} from '../../../../constants/screenNames';
import {fonts} from '../../../../constants/fonts';

export default function ErrorFallBack({error, resetError}) {
  const navigation = useNavigation<StackNavigationProp<TabBarStackType>>();
  const handleResetError = () => {
    resetError();
    navigation.navigate(ScreenNames.HOME_PAGE);
  };
  useEffect(() => {
    if (__DEV__) {
      Alert.alert(error.stack);
    }
  }, []);
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        flex: 1,
      }}>
      <View style={{width: '100%', gap: 20}}>
        <Text style={{fontFamily: fonts.ComfortaaRegular, fontSize: 24}}>
          Opsss. Something went wrong
        </Text>
        <Text style={{fontFamily: fonts.MontserratSemiBold}}>
          Error message: {error.message}
        </Text>
        <DefaultButton
          onPress={() => {
            handleResetError();
          }}
          text={'Go to home'}
        />
      </View>
    </View>
  );
}
