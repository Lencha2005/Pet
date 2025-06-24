import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SearchIcon, SettingsIcon} from '../../../assets/icons';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../../constants/screenNames';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../../navigation/types';
import {IPets} from '../index';

interface ISearchBar {
  handleSearch: (text: string) => void;
  pets: IPets[];
}
export default function SearchBar({handleSearch, pets}: ISearchBar) {
  const [name, setName] = useState('');
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (name.trim()) {
        handleSearch(name);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [name, handleSearch]);
  const handleNavigateToSettings = () => {
    navigation.navigate(ScreenNames.FILTERS_SETTINGS_PAGE, {petsList: pets});
  };
  return (
    <View style={styles.mainWrapper}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchIconWrapper}>
          <SearchIcon />
        </View>
        <TextInput
          placeholder={'Пошук'}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={handleNavigateToSettings}>
        <SettingsIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {flexDirection: 'row', alignItems: 'center'},
  searchWrapper: {
    borderRadius: 20,
    backgroundColor: '#EFF1F4',
    height: 40,
    width: Dimensions.get('window').width - 70,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchIconWrapper: {marginHorizontal: 20},
  settingsIcon: {
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF1F4',
  },
});
