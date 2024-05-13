import { View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native'; 
import React, {useState} from 'react';
import MarkdownDisplay from '@/components/core/day3/MarkdownDisplay';

const template = `
# Markdown Editor
Hello World

`;

const EditorScreen = () => {
 const [content, setContent] = useState(template);
 const [tab, setTab] = useState('');
  
 return (
    <View style={styles.page}>
      
      <View style={styles.tabsContainer}>
      <TouchableOpacity onPress={() => setTab('Edit')} 
      style={[styles.tab, 
        {borderColor: tab === 'Edit' ?  'mediumorchid': 'gray'},

      ]}>
      <Text style={styles.tabText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setTab('Preview')} 
      style={[
        styles.tab, 
        {borderColor: tab === 'Preview' ?  'mediumorchid': 'gray'}
        ]}> 
        <Text style={styles.tabText}>Preview</Text>
      </TouchableOpacity>
      </View>

      {tab === 'Edit' ? <TextInput 
      value={content} 
      multiline numberOfLines={50} 
      style={styles.input}
      onChangeText={setContent}
      /> : <MarkdownDisplay>{content}</MarkdownDisplay>}

    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'whitesmoke',
    flex: 1,
    padding: 10,
  },

  input: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    borderRadius: 10,
    fontSize: 16
  },
  tabsContainer: {
   flexDirection: 'row',
   gap: 10,
   marginVertical: 10,
  },
  tab: {
  flex: 1,
  padding: 10,
  borderColor: 'gray',
  borderWidth: 2,
  borderRadius: 10,
  alignItems: 'center'
  },
  tabText: {
    fontFamily: 'InterBold'
  }
})
 
export default EditorScreen;   