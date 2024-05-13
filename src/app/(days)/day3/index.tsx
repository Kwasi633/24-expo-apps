import { View, Button, Text } from 'react-native';
import React from 'react';
import { Stack, Link } from 'expo-router';
import MarkdownDisplay from '@/components/core/day3/MarkdownDisplay';

const description = `
# Markdown

Integrate Markdown content in **React native**

📚 Today's Agenga:
- Introduction to Markdown
- Markdown Syntax Overview
- Setting Up React Native for Markdown
- Implementing Markdown Rendering
- Styling Markdown Content
- Using Markdown in React Native Compnents
Recap and Q&A Se ssion

   `


const DayDetailsScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Stack.Screen options={{title: 'Day3: Markdown'}}/>
      
    <MarkdownDisplay>{description}</MarkdownDisplay>
    
     <Link href="/day3/editor" asChild>
    <Button title='Go to editor' />
    </Link>
    </View>
  )
}

export default DayDetailsScreen