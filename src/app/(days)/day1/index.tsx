import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const DayDetailsScreen = () => {
  return (
    <View>
      <Text style={{fontFamily: 'AmaticBold', fontSize: 150}}>Day Details Screen</Text>
      <Stack.Screen options={{title: 'Day1'}}/>
    </View>
  )
}

export default DayDetailsScreen