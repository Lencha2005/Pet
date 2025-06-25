import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IPets} from '../Home';
import {
  ArrowIcon,
  HeartIcon,
  LongArrowIcon,
  PlaceIcon,
} from '../../assets/icons';
import DefaultButton from '../../common/components/DefaultButton';
import {fonts} from '../../constants/fonts';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../navigation/types';

export default function PetPage() {
  const route = useRoute<RouteProp<{params: {pet: IPets}}>>();
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const handleNext = () => {
    if (sliderIndex + 1 < route?.params?.pet?.images.length) {
      setSliderIndex(prevState => prevState + 1);
    } else {
      setSliderIndex(0);
    }
  };
  const handlePrev = () => {
    if (sliderIndex - 1 >= 0) {
      setSliderIndex(prevState => prevState - 1);
    } else {
      setSliderIndex(route?.params?.pet?.images.length);
    }
  };

  console.log('route: ', route);
  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <ImageBackground
          source={{uri: route?.params?.pet?.images[sliderIndex]}}
          style={styles.imgBackground}>
          <View style={styles.mainContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={styles.backBtn}
              hitSlop={{top: 10, bottom: 10, right: 10, left: 10}}>
              <ArrowIcon height={20} width={20} color={'white'} />
            </TouchableOpacity>
            <View style={styles.sliderWrapper}>
              <TouchableOpacity
                style={styles.sliderBtnLeft}
                onPress={handlePrev}>
                <LongArrowIcon />
              </TouchableOpacity>
              <View style={styles.dotWrapper}>
                {route?.params?.pet?.images.map((_, index) => (
                  <View
                    style={[
                      styles.activeDot,
                      index !== sliderIndex && {opacity: 0.5},
                    ]}
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.sliderBtnRight}
                onPress={handleNext}>
                <LongArrowIcon />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={{margin: 10, gap: 10}}>
          <View style={styles.titleContainer}>
            <View>
              <Text style={styles.titleText}>{route?.params?.pet?.name}</Text>
              <View style={styles.iconContainer}>
                <PlaceIcon />
                <Text style={styles.locationText}>
                  {route?.params?.pet.location}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.heartContainer}>
              <HeartIcon />
            </TouchableOpacity>
          </View>
          <View style={{gap: 10, marginHorizontal: 10}}>
            <Text style={[styles.titleText, {fontSize: 18}]}>
              Характеристики:
            </Text>
            <View style={styles.characterContainer}>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.age} років
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.color}
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.type}
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.sex}
                </Text>
              </View>
              <View style={styles.characterWrapper}>
                <Text style={styles.characterText}>
                  {route?.params?.pet.isVaccinated
                    ? 'Вакцінований'
                    : 'Не вакцинований'}
                </Text>
              </View>
            </View>
          </View>
          <View style={{margin: 10, gap: 10}}>
            <Text style={[styles.titleText, {fontSize: 18}]}>Моя історія:</Text>
            <View>
              <Text style={styles.characterText}>
                {route?.params?.pet.description}
              </Text>
            </View>
          </View>
          <DefaultButton onPress={() => {}} text={"Подарувати сім'ю"} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imgBackground: {width: '100%', height: 400},
  mainContainer: {
    padding: 10,
    justifyContent: 'space-between',
    height: '100%',
  },
  backBtn: {
    transform: [{rotate: '180deg'}],
    alignSelf: 'flex-start',
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sliderBtnLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 10,
    transform: [{rotate: '180deg'}],
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: 'white',
  },
  dotWrapper: {flexDirection: 'row', gap: 3},
  sliderBtnRight: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    alignItems: 'center',
  },
  titleText: {fontFamily: fonts.ComfortaaRegular, fontSize: 24},
  iconContainer: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  locationText: {
    fontFamily: fonts.MontserratRegular,
    fontSize: 16,
    color: '#838383',
  },
  heartContainer: {
    alignSelf: 'flex-start',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAE9FB',
  },
  characterWrapper: {
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#EAE9FB',
  },
  characterText: {fontFamily: fonts.MontserratRegular, color: 'black'},
  characterContainer: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
});
