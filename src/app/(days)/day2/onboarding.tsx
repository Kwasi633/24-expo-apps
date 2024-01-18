import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Stack, router } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { Directions, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated,  { SlideInLeft, BounceIn, SlideInRight } from 'react-native-reanimated';

const onboardingSteps = [
    {
        icon: 'snowflake',
        title: 'Welcome #DEVember',
        description: `Daily React Native tutorials in December`
    },
    {
        icon: 'people-arrows',
        title: 'Learn and Grow together',
        description: 'Learn by building 24 projects with React Native and Expo'
    },
    {
        icon: 'book-reader',
        title: 'Education For Children',
        description: 'Contribute to the fundraiser "Education for Children" to help Save the Children in the effort of providing education to every child'
    },
];

export default function OnboardingScreen() {
    const [screenIndex, setScreenIndex] = useState(0);
    const data = onboardingSteps[screenIndex];

    const onContinue = () => {
        const isLastScreen = screenIndex === onboardingSteps.length - 1;
        if (isLastScreen) {
            endOnboarding();
        } else {
            setScreenIndex(screenIndex + 1);
        }
    };

    const onBack = () => {
        const isFirstScreen = screenIndex === 0;
        if (isFirstScreen) {
            endOnboarding();
        } else {
            setScreenIndex(screenIndex - 1);
        }
    };

    const endOnboarding = () => {
        setScreenIndex(0);
        router.back();
    };

    const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(onContinue)

    const swipeBack = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(onBack)

    const swipes = Gesture.Simultaneous(swipeBack, swipeForward)

    return (
        <SafeAreaView style={styles.page}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar hidden />

            <View style={styles.stepIndicatorContainer}>
                {onboardingSteps.map((step, index) => (
                    <View 
                    key={index}
                    style={[
                        styles.stepIndicator,
                        { backgroundColor: index === screenIndex ? '#CEF202' : styles.stepIndicator.backgroundColor }
                    ]} />
                ))}
            </View>
            
            <GestureDetector gesture={swipes}>
            
            <Animated.View 
            style={styles.pageContent}
            key={screenIndex}
            >
                <Animated.View
                entering={BounceIn}
                >
                    <FontAwesome5
                        style={styles.image}
                        name={data.icon}
                        size={150}
                        color="#CEF202"
                    />
                </Animated.View>
                

                <View style={styles.footer}>
                    <Animated.Text 
                    entering={SlideInLeft}
                    style={styles.title}>{data.title}</Animated.Text>
                    
                    <Animated.Text 
                    entering={SlideInRight.delay(100)}
                    style={styles.description}>{data.description}</Animated.Text>
                    <View style={styles.buttonsRow}>
                        <Text onPress={endOnboarding} style={styles.buttonText}>Skip</Text>
                        <TouchableOpacity
                            onPress={onContinue}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animated.View>
            </GestureDetector>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#15141A',
    },

    pageContent: {
        padding: 20,
        flex: 1,
    },
    image: {
        alignSelf: 'center',
        marginTop: 70
    },
    title: {
        color: '#FDFDFD',
        fontSize: 50,
        fontFamily: 'InterBlack',
        letterSpacing: 1.3,
        marginVertical: 10,
    },
    description: {
        color: 'gray',
        lineHeight: 28,
        fontSize: 20,
        fontFamily: 'Inter'
    },

    footer: {
        marginTop: 'auto'
    },
    button: {
        backgroundColor: '#302E38',
        borderRadius: 50,
        alignItems: 'center',
        width: 280
    },
    buttonsRow: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonText: {
        color: '#FDFDFD',
        fontFamily: 'InterSemi',
        fontSize: 16,
        padding: 15,
    },
    stepIndicatorContainer: {
        flexDirection: 'row',
        gap: 8,
        marginHorizontal: 15,
    },
    stepIndicator: {
        flex: 1,
        height: 3,
        backgroundColor: 'gray',
        borderRadius: 10,
    }
});
