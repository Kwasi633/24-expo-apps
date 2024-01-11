import { FlatList, StyleSheet,View, ActivityIndicator } from 'react-native';
import { DayListItem } from '@components/core/DayListItem';


const days = [...Array(24)].map((val, index) => index + 1);

export default function HomeScreen() {  

  return (
    <View style={styles.container}>
      
      <FlatList 
      contentContainerStyle={styles.content}
      data={days}
      numColumns={2}
      columnWrapperStyle={styles.column}
      renderItem={({ item }) => <DayListItem day={item}/>}
      />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  column: {
    gap: 10
  },

  content: {
    padding: 10,
    gap: 10
  },

});
