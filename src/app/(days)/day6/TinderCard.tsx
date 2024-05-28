import { View, Text, StyleSheet, Image, Dimensions} from 'react-native'
import React from 'react'

import { LinearGradient } from 'expo-linear-gradient'



export const tinderCardWidth = Dimensions.get('screen').width * 0.8;

const TinderCard = (props) => {
  return (
    <View style={styles.card}>

      <Image style={[StyleSheet.absoluteFillObject, styles.image]} source={props.profile.image}/>
      
      <LinearGradient
        // Background Linear Gradient
        colors={['transparent', 'rgba(0,0,0,0.8)', ]}
        style={[StyleSheet.absoluteFillObject, {top: '50%'}, ]}
      />

      <View style={styles.footer}>
      <Text style={styles.name}>{props.profile.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        height: 351,
        width: tinderCardWidth,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5
    },

    image: {
      borderRadius: 15
    },

    footer: {
        padding: 10
    },
    name: {
        fontSize: 24,
        color: 'white',
        fontFamily: 'InterBold'
    }
})

export default TinderCard;