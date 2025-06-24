import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {fonts} from '../../constants/fonts';
import {FemailIcon, MailAndFemailIcon, SearchIcon} from '../../assets/icons';
import SwitchBtn from './components/SwitchBtn';
import MailIcon from '../../assets/icons/Mail';
import DefaultButton from '../../common/components/DefaultButton';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabBarStackType} from '../../navigation/types';
import {ScreenNames} from '../../constants/screenNames';

export interface ISettings {
  timeStamp: boolean;
  isDog: boolean;
  sex: 'male' | 'female' | 'all';
  size: 'big' | 'small' | 'medium';
  age: number;
  isVaccinated: boolean;
}
export default function FilterSettings() {
  const navigation = useNavigation<StackNavigationProp<TabBarStackType>>();
  const [settings, setSettings] = useState<ISettings>({
    timeStamp: false,
    isDog: true,
    sex: 'male',
    size: 'small',
    age: 1,
    isVaccinated: false,
  });
  const handleSwitchAnimal = (animal: {id: boolean}) => {
    setSettings(prevState => ({
      ...prevState,
      isDog: animal.id,
    }));
  };
  const handleSwitchSex = (animal: {id: 'male' | 'female'}) => {
    setSettings(prevState => ({
      ...prevState,
      sex: animal.id,
    }));
  };
  const handleSwitchSize = (animal: {id: 'small' | 'big' | 'medium'}) => {
    setSettings(prevState => ({
      ...prevState,
      size: animal.id,
    }));
  };
  const onSortByTime = () => {
    setSettings(prevState => ({
      ...prevState,
      timeStamp: !prevState.timeStamp,
    }));
  };

  return (
    <ScrollView style={{margin: 10, gap: 20}}>
      <View style={{gap: 20}}>
        <TouchableOpacity
          onPress={() => {
            onSortByTime();
          }}
          style={styles.sortByTimeBtn}>
          <View style={styles.activeSortByTime}>
            {settings.timeStamp && <View style={styles.checkedSortByTime} />}
          </View>
          <Text style={styles.sortByTimeText}>
            Сортувати за датою додавання
          </Text>
        </TouchableOpacity>
        <SwitchBtn
          handleSwitch={handleSwitchAnimal}
          active={settings.isDog}
          items={[
            {text: 'Собаки', id: true},
            {text: 'Коти', id: false},
          ]}
        />
        <SwitchBtn
          handleSwitch={handleSwitchSex}
          active={settings.sex}
          items={[
            {text: 'Хлопець', icon: <MailIcon />, id: 'male'},
            {text: 'Дівчина', icon: <FemailIcon />, id: 'female'},
            {text: 'Будь-хто', icon: <MailAndFemailIcon />, id: 'all'},
          ]}
        />
        <SwitchBtn
          handleSwitch={handleSwitchSize}
          active={settings.size}
          items={[
            {text: 'Маленькі', id: 'small'},
            {text: 'Середні', id: 'medium'},
            {text: 'Великі', id: 'big'},
          ]}
        />
        <View style={{gap: 5}}>
          <Text style={styles.btnText}>Вік,роки</Text>
          <View style={styles.searchWrapper}>
            <View style={styles.searchIconWrapper}>
              <SearchIcon />
            </View>
            <TextInput
              placeholder={'1'}
              keyboardType={'numeric'}
              value={String(settings.age)}
              onChangeText={text =>
                setSettings(prevState => ({
                  ...prevState,
                  age: Number(text),
                }))
              }
            />
          </View>
        </View>

        <View style={styles.switcherContainer}>
          <Text style={styles.btnText}>Вакцінація</Text>
          <TouchableOpacity
            style={[
              styles.switcherBtn,
              settings.isVaccinated && {
                alignItems: 'flex-end',
                backgroundColor: '#D0CBF1',
              },
            ]}
            onPress={() => {
              setSettings(prevState => ({
                ...prevState,
                isVaccinated: !prevState.isVaccinated,
              }));
            }}>
            <View style={styles.switcherCircle} />
          </TouchableOpacity>
        </View>
        <DefaultButton
          onPress={() => {
            navigation.navigate(ScreenNames.HOME_PAGE, {
              settings: {
                ...settings,
                age: Number(settings.age),
              },
            });
          }}
          text={'Показати варіанти'}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  sortByTimeBtn: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  activeSortByTime: {
    borderRadius: 50,
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#7A71BA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSortByType: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#7A71BA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedSortByTime: {
    borderRadius: 50,
    width: 10,
    height: 10,
    backgroundColor: '#7A71BA',
  },
  checkedSortByType: {
    width: 10,
    height: 10,
    backgroundColor: '#7A71BA',
  },
  sortByTimeText: {
    fontFamily: fonts.MontserratRegular,
    color: 'black',
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
  searchWrapper: {
    borderRadius: 20,
    borderColor: '#A0A0A0',
    borderWidth: 1,
    height: 50,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  switcherWrapper: {
    flexDirection: 'row',
    padding: 5,
    borderRadius: 50,
    backgroundColor: '#EAE9FB',
    height: 50,
    alignItems: 'center',
  },
  activeBtn: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'white',
    height: 40,
  },
  btnText: {fontFamily: fonts.MontserratRegular, color: '#0B0B0B'},
  nonActiveBtn: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 50,
  },
  selectSearch: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#EAE9FB',
    height: 50,
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  switcherContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  switcherBtn: {
    width: 50,
    borderRadius: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D0CBF1',
    padding: 3,
  },
  switcherCircle: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#7A71BA',
  },
});
