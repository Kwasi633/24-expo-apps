import { View, Text } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';


const ProtectedScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <Text style={{ fontFamily: 'Inter', fontSize: 20, marginBottom: 20}}>Use Fingerprint to unlock</Text>
<MaterialIcons 
name="lock" 
size={75} 
color="black" 
/>
</View>

  )
}

export default ProtectedScreen;