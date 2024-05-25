import { View, StyleSheet, Text } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React from 'react'
import { Stack } from 'expo-router';
import apartments from 'assets/data/day5/apartments.json'

import CustomMarker from '@/components/core/day5/CustomMarker';
import ApartmentListItem from '@/components/core/day5/ApartmentListItem';

const AirbnbScreen = () => {
    console.log(apartments);
    return (
    <View>
        <Stack.Screen options={{headerShown: false}}/>
      <MapView style={styles.map}
      initialRegion={{
        latitude: 5.603716,
        longitude: -0.187000,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
      >
        {apartments.map((apartment) => (
            <CustomMarker 
            key={apartment.id}
            latitude={apartment.latitude}
            longitude={apartment.longitude}
            title={apartment.title}
            price={apartment.price}
            />
        )
        )}
      </MapView>
      <ApartmentListItem 
      apartment={apartments[0]}
      />
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

export default AirbnbScreen;