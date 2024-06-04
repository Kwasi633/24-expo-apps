import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Stack, Link } from 'expo-router';
import MarkdownDisplay from '@/components/core/day3/MarkdownDisplay';

const description = `
# Weather App
Fetch weather data and display it
`

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <Stack.Screen options={{title: 'Day8: Weather app'}}/>
      
    <MarkdownDisplay>{description}</MarkdownDisplay>
    
    <Link href="/day8/weather" asChild>
    <Button title='Go to Weather'/>
    </Link>
    
    </SafeAreaView>
  )
}

export default DayDetailsScreen;