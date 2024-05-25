import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Stack, Link } from 'expo-router';
import MarkdownDisplay from '@/components/core/day3/MarkdownDisplay';

const description = `
# Animated Splashscreen

   `


const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <Stack.Screen options={{title: 'Day4: SplashScreen'}}/>
      
    <MarkdownDisplay>{description}</MarkdownDisplay>
    
    <Link href="/day4/animation" asChild>
    <Button title='Go to the animation'/>
    </Link>

    <Link href="/day4/splash" asChild>
    <Button title='Splashscreen animation'/>
    </Link>
    
    </SafeAreaView>
  )
}

export default DayDetailsScreen;