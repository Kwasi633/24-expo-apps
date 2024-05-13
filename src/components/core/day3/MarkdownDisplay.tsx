import { View, Text, ScrollView, StyleSheet } from 'react-native'; 
import React, { PropsWithChildren } from 'react';
import Markdown from 'react-native-markdown-display';

const MarkdownDisplay  = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView style={styles.page}
    contentInsetAdjustmentBehavior="automatic">
       <Markdown style={markdownStyles}>
            {children}
          </Markdown>
    </ScrollView>
  )
}

const markdownStyles = StyleSheet.create({
  heading1: {
    fontSize: 40,
    fontFamily: 'InterBlack',
    color: '#212020'
  },
  heading2: {
    fontFamily: 'InterBold',
    color: '#404040'
  },
  body: {
    fontSize: 16, 
  }
}) 

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10
  },
})

export default MarkdownDisplay;   