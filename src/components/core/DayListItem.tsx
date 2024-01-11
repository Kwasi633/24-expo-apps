import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

type DayListItem = {
    day: number;
}

export const DayListItem = ({ day }: DayListItem) => {
    return(
        <Link href={`/day${day}`} asChild>
          <TouchableOpacity style={styles.box}>
          <Text style={styles.text}>{day}</Text>
          </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    box: {
      backgroundColor: '#f9EDE3',
      flex: 1,
      aspectRatio: 1,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#9b4521',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    text: {
      color: '#9b4521',
      fontSize: 80,
      fontFamily: 'AmaticBold'
    }
  
  });
  