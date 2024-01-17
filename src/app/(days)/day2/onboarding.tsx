import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Link, Stack, router } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';
import { Directions, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

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
        icon: 'people-arrows',
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

    const endOnboarding = () => {
        setScreenIndex(0);
        router.back();
    };

    const fling = Gesture.Fling()
    .direction(Directions.RIGHT | Directions.LEFT)
    .onBegin((event) => {
        console.log('Fling Start', event)
    })
    .onEnd((event) => {
        console.log('Fling', event);
        onContinue();
    })


    return (
        <SafeAreaView style={styles.page}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar hidden />

            <View style={styles.stepIndicatorContainer}>
                {onboardingSteps.map((step, index) => (
                    <View style={[
                        styles.stepIndicator,
                        { backgroundColor: index === screenIndex ? '#CEF202' : styles.stepIndicator.backgroundColor }
                    ]} />
                ))}
            </View>
            <GestureDetector gesture={fling}>
            <View style={styles.pageContent}>
                <FontAwesome5
                    style={styles.image}
                    name={data.icon}
                    size={100}
                    color="#CEF202"
                />

                <View style={styles.footer}>
                    <Text style={styles.title}>{data.title}</Text>
                    <Text style={styles.description}>{data.description}</Text>
                    <View style={styles.buttonsRow}>
                        <Text onPress={endOnboarding} style={styles.buttonText}>Skip</Text>
                        <TouchableOpacity
                            onPress={onContinue}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        margin: 20,
        marginTop: 30
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
