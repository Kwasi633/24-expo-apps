import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Stack, Link } from 'expo-router';
import MarkdownDisplay from '@/components/core/day3/MarkdownDisplay';

const description = `
# Biometrics
Use FaceID and Fingerprint to unlock the next screen
`


const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <Stack.Screen options={{title: 'Day10: Biometrics'}}/>
      
    <MarkdownDisplay>{description}</MarkdownDisplay>
    
    <Link href="/day10/protected" asChild>
    <Button title='Go to Tinder Swipe Animation'/>
    </Link>
    
    </SafeAreaView>
  )
}

export default DayDetailsScreen;