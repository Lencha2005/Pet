import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../Header';
import {fonts} from '../../../constants/fonts';
import {useTranslation} from 'react-i18next';
import {ArrowIcon} from '../../../assets/icons';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../../navigation/types';
import {ScreenNames} from '../../../constants/screenNames';
import {DrawerActions, useNavigation} from '@react-navigation/native';

export default function DrawerContent() {
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();
  const navigateToLanguages = () => {
    navigation.navigate(ScreenNames.LANGUAGES_PAGE);
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const navigateToWebPage = () => {
    navigation.navigate(ScreenNames.WEB_PAGE);
    navigation.dispatch(DrawerActions.toggleDrawer());
  };
  const {t} = useTranslation('main');

  return (
    <View>
      <Header isOpenDrawer={true} />
      <View style={styles.mainWrapper}>
        <TouchableOpacity style={styles.btnWrapper} onPress={navigateToWebPage}>
          <Text style={styles.text}>{t('site')}</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={navigateToLanguages}>
          <Text style={styles.text}>{t('lang')}</Text>
          <ArrowIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnWrapper}>
          <Text style={styles.text}>{t('logout')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {marginHorizontal: 10, gap: 16},
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: fonts.ComfortaaRegular,
    fontSize: 16,
    color: 'black',
  },
});
