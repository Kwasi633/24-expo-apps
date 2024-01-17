import { View, Button, Text } from 'react-native';
import React from 'react';
import { Stack, Link } from 'expo-router';

const DayDetailsScreen = () => {
  return (
    <View>
      <Stack.Screen options={{title: 'Day2: Onboarding'}}/>
      <Text>Day Details Screen</Text>
    
    <Link href="/day2/onboarding" asChild>
    <Button title='Go to Onborading' />
    </Link>
    </View>
  )
}

export default DayDetailsScreen