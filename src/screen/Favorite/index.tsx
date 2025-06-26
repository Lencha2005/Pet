import React, {useCallback, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import PetsList from '../Home/components/PetsList';
import {IPets} from '../Home';
import {useFocusEffect} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
  const [pets, setPets] = useState<IPets[]>([]);
  const getFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const result = JSON.parse(favorites);
        setPets(result);
      }
    } catch (e) {
      console.log('e', e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      void getFavorite();
    }, []),
  );
  return (
    <View style={{flex: 1}}>
      {pets.length ? <PetsList pets={pets} /> : <ActivityIndicator />}
    </View>
  );
};
