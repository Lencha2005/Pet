import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import PetsList from './components/PetsList';
import {View} from 'react-native';

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
}

export default function Home() {
  const [pets, setPets] = useState<IPets[]>([]);
  const getPets = async () => {
    const result = await firestore().collection('animals').get();
    const temp: IPets[] = result.docs.map(e => e.data()) as IPets[];
    setPets(temp);
    try {
    } catch (e) {
      console.log('e: ', e);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return (
    <View style={{flex: 1}}>
      <PetsList pets={pets} />
    </View>
  );
}
