import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default function BiometricProtectedLayout() {
    const [unlocked, setUnlocked] = useState(false);
    
    useEffect(() => {
        authenticate();
    }, []);

    const authenticate = async () => {
const enrolled = await LocalAuthentication.getEnrolledLevelAsync();
const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
const hasHardware = await LocalAuthentication.hasHardwareAsync();

        console.log(`harware: `, hasHardware);

        if(!hasHardware){
            Alert.alert('Not supported');
            setUnlocked(true)
        }


        console.log('Supported', supported);
        console.log("Enrolled", enrolled);

        const res = await LocalAuthentication.authenticateAsync();
        console.log(res);
        if(res.success){
            setUnlocked(true);
        }
    }

    if(!unlocked){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontFamily: 'Inter', fontSize: 20, marginBottom: 20}}>Use Fingerprint to unlock</Text>
        <MaterialIcons 
        onPress={authenticate} 
        name="fingerprint" 
        size={75} 
        color="black" 
        />
        </View>

        ) 
    }
    
    return <Slot />
}