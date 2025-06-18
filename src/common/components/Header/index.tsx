import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CloseIcon, Label} from '../../../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions, useNavigation} from '@react-navigation/native';

interface IHeader {
  isOpenDrawer?: boolean;
}

export default function Header({isOpenDrawer}: IHeader) {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  return (
    <View style={styles.wrapper}>
      <Label />
      {isOpenDrawer ? (
        <TouchableOpacity style={styles.burgerBtn} onPress={handleOpenDrawer}>
          <CloseIcon />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.burgerBtn} onPress={handleOpenDrawer}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 60,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  burgerBtn: {height: 20, gap: 5, width: 20},
  line: {width: '100%', height: 2, backgroundColor: 'black'},
});
