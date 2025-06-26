import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IPets} from '..';
import {FlatList} from 'react-native-gesture-handler';
import FavoriteIcon from '../../../assets/icons/FavoriteIcon';
import {fonts} from '../../../constants/fonts';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../../navigation/types';
import {ScreenNames} from '../../../constants/screenNames';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleAddToFavorite = async (pet: IPets) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      const result = JSON.parse(favorites);
      if (result.find(e => e.timeStamp === pet.timeStamp)) {
        const filteredResult = result.filter(
          e => e.timeStamp !== pet.timeStamp,
        );
        await AsyncStorage.setItem('favorites', JSON.stringify(filteredResult));
        return;
      }
      await AsyncStorage.setItem('favorites', JSON.stringify([...result, pet]));
    } else {
      await AsyncStorage.setItem('favorites', JSON.stringify([pet]));
    }
  } catch (e) {
    console.log('e: ', e);
  }
};

export default function PetsList({pets}: {pets: IPets[]}) {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const [favorite, setFavorite] = useState<IPets[]>([]);

  const handleGoToPet = (item: IPets) => {
    navigation.navigate(ScreenNames.PET_PAGE, {pet: item});
  };

  const getFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const result = JSON.parse(favorites);
        setFavorite(result);
      }
    } catch (e) {
      console.log('e: ', e);
    }
  };
  useFocusEffect(
    useCallback(() => {
      getFavorite();
      // AsyncStorage.clear();
    }, []),
  );
  console.log('favorites: ', favorite);
  return (
    <View style={styles.flex}>
      <FlatList
        data={pets}
        style={styles.mainContainer}
        numColumns={2}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleGoToPet(item)}>
              <ImageBackground
                source={{uri: item.images[0]}}
                imageStyle={{borderRadius: 20}}
                style={styles.image}
                resizeMode={'cover'}>
                <TouchableOpacity
                  style={styles.favoriteBtn}
                  onPress={() => {
                    handleAddToFavorite(item).then(() => {
                      getFavorite();
                    });
                  }}>
                  <FavoriteIcon
                    isFavorite={
                      !!favorite.find(e => e.timeStamp === item.timeStamp)
                    }
                  />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.text}>{item.type}</Text>
                  <Text style={styles.text}>{item.age} years</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
  mainContainer: {
    width: '100%',
    marginHorizontal: 10,
  },
  item: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 30,
    margin: 10,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'space-between',
  },
  textContainer: {margin: 15},
  text: {
    color: 'white',
    fontFamily: fonts.MontserratSemiBold,
  },
  favoriteBtn: {alignSelf: 'flex-end', margin: 10},
});
