import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router';
import TinderCard from './TinderCard'
import Zee from '../../../../assets/Zee.jpg';
import Amina from '../../../../assets/Amina.jpg';
import NanaAma from '../../../../assets/NanaAma.jpg';
import ChanLee from '../../../../assets/ChanLee.jpg';
import Annie from '../../../../assets/Annie.jpg';

import { runOnJS ,useAnimatedReaction, useDerivedValue, useSharedValue, withDecay, withSpring } from 'react-native-reanimated';

const profiles = [
  {
    id: 1,
    image: Zee,
    name: 'Zee'
  },
  {
    id: 2,
    image: Annie,
    name: 'Annie'
  },
  {
    id: 3,
    image: NanaAma,
    name: 'Nana Ama'
  },
  {
    id: 4,
    image: ChanLee,
    name: 'Chan Lee'
  },
  {
    id: 5,
    image: Amina,
    name: 'Amina'
  },
  
];

const Tinder = () => {
  const activeIndex = useSharedValue(0);
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState(profiles)

  useAnimatedReaction(
    () => activeIndex.value, 
    (value, preValue) => {
    if (Math.floor(value) != index){
      runOnJS(setIndex)(Math.floor(value));
    }
}
);

  useEffect(() => {
    if(index > profiles.length - 3){
      setUser((user) => [...user, ...profiles.reverse()])
    }
  }, [index])
    
  return (
    
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Stack.Screen options={{ headerShown: false}}/>

      {profiles.map((profile, index) => (
      <TinderCard 
      key={`${user.id} - ${index}`}
      profile={profile}
      numOfCard={profiles.length}
      curIndex={index}
      activeIndex={activeIndex}
      />  
      ))}   
    </View>
  )
}

export default Tinder;