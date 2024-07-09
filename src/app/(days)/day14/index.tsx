import { Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { Stack, Link } from 'expo-router';
import MarkdownDisplay from '@/components/core/day3/MarkdownDisplay';

const description = `
# Push Notifications
Send and Recive Push Notifications
`

const DayDetailsScreen = () => {
  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <Stack.Screen options={{title: 'Day14: Notifications'}}/>
      
    <MarkdownDisplay>{description}</MarkdownDisplay>
    
    <Link href="/day14/notifications" asChild>
    <Button title='Go to Notifications'/>
    </Link>
    
    </SafeAreaView>
  )
}

export default DayDetailsScreen;