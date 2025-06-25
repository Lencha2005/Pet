import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import PetsList from './components/PetsList';
import SearchBar from './components/SearchBar';
import {ISettings} from '../FilterSettings';
import {RouteProp, useRoute} from '@react-navigation/core';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  QueryConstraint,
  startAt,
  endAt,
} from 'firebase/firestore';
import {db} from '../../firebase';

export interface IPets {
  age: number;
  color: string;
  description: string;
  images: string[];
  isDog: boolean;
  isVaccinated: boolean;
  location: string;
  name: string;
  sex: string;
  type: string;
  timeStamp: number;
  size: 'big' | 'medium' | 'small';
}
export default function Home() {
  const [pets, setPets] = useState<IPets[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const route = useRoute<RouteProp<{params: {settings: ISettings}}>>();

  const getPets = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, 'animals'), orderBy('timeStamp', 'desc'));
      const result = await getDocs(q);
      const temp: IPets[] = result.docs.map(e => e.data()) as IPets[];
      setPets(temp);
    } catch (e) {
      console.log('e', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchWithSettings = async (settings: ISettings) => {
    try {
      setIsLoading(true);
      const constraints: QueryConstraint[] = [];

      if (settings.sex !== 'all') {
        constraints.push(where('sex', '==', settings.sex));
      }
      if (settings.size) constraints.push(where('size', '==', settings.size));
      if (settings.age)
        constraints.push(where('age', '==', Number(settings.age)));
      if (typeof settings.isDog === 'boolean')
        constraints.push(where('isDog', '==', settings.isDog));
      if (typeof settings.isVaccinated === 'boolean')
        constraints.push(where('isVaccinated', '==', settings.isVaccinated));

      constraints.push(
        orderBy('timeStamp', settings.timeStamp ? 'desc' : 'asc'),
      );

      const q = query(collection(db, 'animals'), ...constraints);
      const result = await getDocs(q);
      const temp: IPets[] = result.docs.map(doc => doc.data() as IPets);
      setPets(temp);
    } catch (e) {
      console.log('❌ Search error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    try {
      const q = query(
        collection(db, 'animals'),
        orderBy('name'),
        startAt(text),
        endAt(text + '\uf8ff'),
      );
      const result = await getDocs(q);
      const temp: IPets[] = result.docs.map(e => e.data()) as IPets[];
      setPets(temp);
    } catch (e) {
      console.log('Search error:', e);
    }
  };

  useEffect(() => {
    const settings = route?.params?.settings;
    if (settings) {
      handleSearchWithSettings(settings);
    } else {
      getPets();
    }
  }, [route]);

  return (
    <View style={{flex: 1}}>
      <SearchBar handleSearch={handleSearch} pets={pets} />
      {isLoading ? (
        <ActivityIndicator />
      ) : pets.length > 0 ? (
        <PetsList pets={pets} />
      ) : (
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text style={{color: 'gray', fontSize: 16}}>
            Нічого не знайдено. Спробуйте змінити фільтри.
          </Text>
        </View>
      )}
    </View>
  );
}
