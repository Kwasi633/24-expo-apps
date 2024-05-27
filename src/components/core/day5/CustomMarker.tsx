import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import MapView, {Marker} from 'react-native-maps';


const CustomMarker = (props) => {
  return (
    <View>
     <Marker 
            onPress={props.onPress}
            key={props.id}
            coordinate={{ 
                latitude: props.latitude, 
                longitude: props.longitude,
            }}
            title={props.title}
            description='Hello there'
            >
                <View style={styles.price}>
                <Text style={{ fontFamily: 'InterBold'}}>${props.price}</Text>
                </View>
            </Marker>
    </View>
  )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    },
    price: {
        backgroundColor: 'white',
        padding: 5,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20
    }
})

export default CustomMarker