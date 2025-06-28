import {Text, TouchableOpacity, View} from 'react-native';
import styles from '../../styles';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../../../constants/screenNames';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedOutStackType} from '../../../../navigation/types';
import {useTranslation} from 'react-i18next';

interface IAuthHeader {
  activeTab: 'login' | 'registration';
}

export default function AuthHeader({activeTab}: IAuthHeader) {
  const navigation = useNavigation<StackNavigationProp<LoggedOutStackType>>();
  const {t} = useTranslation('main');

  const navigateToLogin = () => {
    navigation.navigate(ScreenNames.LOGIN_PAGE);
  };

  const navigateToRegistration = () => {
    navigation.navigate(ScreenNames.REGISTRATION_PAGE);
  };

  return (
    <>
      <View style={[styles.titleContainer]}>
        <Text style={styles.title}>{t('welcomeTitle')}</Text>
        <Text style={styles.welcomeText}>{t('subTitle')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={navigateToLogin}
          style={activeTab === 'login' ? styles.activeTab : styles.disabledTab}>
          <Text style={styles.authText}>{t('logIn')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToRegistration}
          style={
            activeTab === 'registration' ? styles.activeTab : styles.disabledTab
          }>
          <Text style={styles.authText}>{t('registration')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
