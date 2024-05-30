import { View, Text, StyleSheet, Image, Dimensions} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { useDerivedValue, useAnimatedStyle, interpolate, SharedValue, useSharedValue, withSpring, withDecay} from 'react-native-reanimated';
import {PanGesture} from 'react-native-gesture-handler'
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type TinkerCard = {
  profile: {
    image: string;
    name: string;
  };
  numOfCard: number
  curIndex: number;
  activeIndex: SharedValue<number>;
}

const screenWidth = Dimensions.get('screen').width;
export const tinderCardWidth = screenWidth * 0.8;

const TinderCard = ({
  profile,
  numOfCard,
  curIndex,
  activeIndex
}) => {

  const translationX = useSharedValue(0);


  const animatedCard = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value, 
      [curIndex - 1, curIndex, curIndex + 1], 
      [1 - 1 / 5, 1, 1]
    ),
    transform: [{
      scale: interpolate(activeIndex.value, 
        [curIndex - 1, curIndex, curIndex + 1], 
        [0.95, 1, 1])
    },
    {translateY: interpolate(activeIndex.value,
      [curIndex - 1, curIndex, curIndex + 1],
      [-30 , 0, 0]
    )},
    {
      translateX: translationX.value,
    },
    {
      rotateZ: `${interpolate(
        translationX.value,
        [-screenWidth / 2, 0, screenWidth / 2],
        [-15, 0, 15]
      )}deg`
    }
  ]
  }))

  const gesture = Gesture.Pan()
  .onChange((event) => {
    translationX.value = event.translationX;

    activeIndex.value = interpolate(
      Math.abs(translationX.value),
      [0, 500],
      [curIndex, curIndex + 0.8]
    );

  })
  .onStart((event) => console.log('onStart: '))

  .onEnd((event) => {
    translationX.value = withSpring(0);

    if(Math.abs(event.velocityX) > 400){
    translationX.value = withDecay({ velocity: event.velocityX });

    activeIndex.value = withSpring(curIndex + 1)
    }
  });

  return (
    <GestureDetector gesture={gesture}>
    <Animated.View 
    style={[
      styles.card,
      animatedCard, 
    {zIndex: numOfCard - curIndex, 
    }]
    }>

      <Image style={[StyleSheet.absoluteFillObject, styles.image]} source={profile.image}/>
      
      <LinearGradient
        // Background Linear Gradient
        colors={['transparent', 'rgba(0,0,0,0.8)', ]}
        style={[StyleSheet.absoluteFillObject, {top: '50%'}]}
      />
      <View style={styles.footer}>
      <Text style={styles.name}>{profile.name}</Text>
      </View>
    </Animated.View>
  </GestureDetector>
  );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        height: 600,
        width: tinderCardWidth,
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 5,
      },

    image: {
      borderRadius: 15,
      height: 600
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

// const gesture = Gesture.Pan()
// .onBegin((event) => console.log('onBegin: '))
// .onFinalize((event) => console.log('onFinalize: '))
// .onChange((event) => {
//   translationX.value = event.translationX;
//   //activeIndex.value = interpolate();
// })
// .onUpdate((event) => console.log('onUpdate:', event))
// .onStart((event) => console.log('onStart: '))

// .onEnd((event) => {
//   translationX.value = withSpring(0);

//   if(Math.abs(event.velocityX) > 400){
//   translationX.value = withDecay({ velocity: event.velocityX });

//   activeIndex.value = activeIndex.value - 1;
//   }
// })