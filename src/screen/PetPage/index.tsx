import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
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
  CloseIcon,
  DogImage,
  LongArrowIcon,
  PlaceIcon,
} from '../../assets/icons';
import DefaultButton from '../../common/components/DefaultButton';
import {fonts} from '../../constants/fonts';
import {StackNavigationProp} from '@react-navigation/stack';
import {LoggedInStackType} from '../../navigation/types';
import Modal from 'react-native-modal';
import Input from '../../common/components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteIcon from '../../assets/icons/FavoriteIcon';
import {handleAddToFavorite} from '../Home/components/PetsList';

interface IFormInfo {
  name: string;
  phone: string;
  email: string;
  comment?: string;
}

export default function PetPage() {
  const route = useRoute<RouteProp<{params: {pet: IPets}}>>();
  const navigation = useNavigation<StackNavigationProp<LoggedInStackType>>();

  const [favorite, setFavorite] = useState<IPets[]>([]);
  const [sliderIndex, setSliderIndex] = useState<number>(0);
  const [formInfo, setFormInfo] = useState<IFormInfo>({
    name: '',
    phone: '',
    email: '',
    comment: '',
  });
  const [isFormModalVisible, setFormIsModalVisible] = useState<{
    isCompleted: boolean;
    isVisible: boolean;
  }>({isCompleted: false, isVisible: false});
  const [isSuccessModalVisible, setSuccessIsModalVisible] =
    useState<boolean>(false);

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
  const handleEditForm = (key: string, value: string) => {
    setFormInfo(prevState => ({...prevState, [key]: value}));
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

  useEffect(() => {
    getFavorite();
  }, []);

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
            <TouchableOpacity
              style={styles.favoriteBtn}
              onPress={() => {
                handleAddToFavorite(route?.params?.pet).then(() => {
                  getFavorite();
                });
              }}>
              <FavoriteIcon
                isFavorite={
                  !!favorite.find(
                    e => e.timeStamp === route?.params?.pet?.timeStamp,
                  )
                }
              />
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
          <DefaultButton
            onPress={() => {
              setFormIsModalVisible(prevState => ({
                ...prevState,
                isVisible: true,
              }));
            }}
            text={"Подарувати сім'ю"}
          />
        </View>
      </View>
      <Modal
        isVisible={isFormModalVisible.isVisible}
        onBackdropPress={() => {
          setFormIsModalVisible(prevState => ({
            ...prevState,
            isVisible: false,
          }));
        }}
        onModalHide={() => {
          if (isFormModalVisible.isCompleted) {
            setSuccessIsModalVisible(true);
          }
        }}>
        <View style={styles.modalContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{gap: 10}}>
              <Text style={{fontFamily: fonts.ComfortaaRegular, fontSize: 24}}>
                Забрати хвостика додому
              </Text>
              <Text style={{fontFamily: fonts.MontserratRegular}}>
                Залиш свої дані і ми з тобою зв’яжемося
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                setFormIsModalVisible(prevState => ({
                  ...prevState,
                  isVisible: false,
                }))
              }>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View>
            <Text>Ім'я</Text>
            <Input
              value={formInfo.name}
              placeholder={"Введи своє ім'я"}
              onChangeText={text => {
                handleEditForm('name', text);
              }}
            />
          </View>
          <View>
            <Text>Телефон</Text>
            <Input
              value={formInfo.phone}
              placeholder={'+380'}
              onChangeText={text => {
                handleEditForm('phone', text);
              }}
            />
          </View>
          <View>
            <Text>Email</Text>
            <Input
              value={formInfo.email}
              placeholder={'Введи свою пошту'}
              onChangeText={text => {
                handleEditForm('email', text);
              }}
            />
          </View>
          <View>
            <Text>Коментар</Text>
            <Input
              placeholder={'Залиш коментар'}
              value={formInfo.comment}
              onChangeText={text => {
                handleEditForm('comment', text);
              }}
              numberOfLines={3}
              additionalContainerStyle={{height: 100, alignItems: 'flex-start'}}
            />
          </View>
          <DefaultButton
            disabled={!formInfo.email || !formInfo.phone || !formInfo.name}
            onPress={() => {
              setFormIsModalVisible({
                isCompleted: true,
                isVisible: false,
              });
            }}
            text={'Забрати хвостика додому'}
          />
        </View>
      </Modal>
      <Modal
        isVisible={isSuccessModalVisible}
        onBackdropPress={() => setSuccessIsModalVisible(false)}>
        <View style={[styles.modalContainer, {height: 300}]}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={DogImage}
              style={{width: 80, height: 80, flex: 1}}
              resizeMode={'contain'}
            />
            <TouchableOpacity onPress={() => setSuccessIsModalVisible(false)}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View style={{gap: 10, alignItems: 'center'}}>
            <Text style={{fontFamily: fonts.ComfortaaRegular, fontSize: 24}}>
              Дякуємо за заявку!
            </Text>
            <Text style={{fontFamily: fonts.MontserratRegular}}>
              Вітаємо! Ти на крок ближче до того щоб завести собі пухнастого
              друга. Ми скоро зв’яжемося з тобою.
            </Text>
          </View>
          <DefaultButton
            onPress={() => {
              setSuccessIsModalVisible(false);
              setFormIsModalVisible({isVisible: false, isCompleted: false});
            }}
            text={'Окей'}
          />
        </View>
      </Modal>
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
  modalContainer: {
    width: '100%',
    height: 600,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },
  favoriteBtn: {alignSelf: 'flex-end', margin: 10},
});
