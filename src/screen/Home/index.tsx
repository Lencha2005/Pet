import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {RootStackNavigation} from '../../navigation/types';

export default function Home() {
  const navigation = useNavigation<StackNavigationProp<RootStackNavigation>>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Text>Hello </Text>
    </TouchableOpacity>
  );
}
