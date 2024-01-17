import { Stack } from "expo-router";
import { useFonts, Inter_900Black, Inter_700Bold, Inter_600SemiBold, Inter_400Regular } from '@expo-google-fonts/inter';
import { AmaticSC_400Regular, AmaticSC_700Bold } from '@expo-google-fonts/amatic-sc';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";


SplashScreen.preventAutoHideAsync();

export default function RootLayout(){
    let [fontsLoaded, fontError] = useFonts({
        Inter: Inter_400Regular,
        InterSemi: Inter_600SemiBold,
        Amatic: AmaticSC_400Regular,
        AmaticBold: AmaticSC_700Bold,
        InterBlack: Inter_900Black,
        InterBold: Inter_900Black
      })
    
      useEffect(() => {
        if (fontsLoaded || fontError) {
          SplashScreen.hideAsync();
        }
    
      }, [fontsLoaded, fontError]) 
      
      if (!fontsLoaded && !fontError) {
        return null;
      }

    return (
      <GestureHandlerRootView style={{flex:1}}>
    <Stack>
        <Stack.Screen 
        name="index"
        options={{title: 'Devember'}}
        />
    </Stack>
    </GestureHandlerRootView>
    );
}
