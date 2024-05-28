import { View, Text } from 'react-native'
import React from 'react'
import TinderCard from './TinderCard'
import Lady from '../../../../assets/lady.jpg';

const profiles = [
  {
    id: 1,
    image: Lady,
    name: 'Diana'
  },
  {
    id: 2,
    image: Lady,
    name: 'Zee'
  },
  {
    id: 3,
    image: Lady,
    name: 'Wendy'
  },
  {
    id: 4,
    image: Lady,
    name: 'Rita'
  },
  {
    id: 5,
    image: Lady,
    name: 'Vera'
  },
  
];

const Tinder = () => {
  return (
    <View>
      {profiles.map((profile) => (
      <TinderCard 
      key={profile.id}
      profile={profile}/>  
      ))}
      
    </View>
  )
}

export default Tinder;