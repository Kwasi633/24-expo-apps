import { View, StyleSheet, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import React, {useMemo, useState} from 'react'
import { Stack } from 'expo-router';
import BottomSheet, {BottomSheetFlatList } from '@gorhom/bottom-sheet';

import apartments from 'assets/data/day5/apartments.json'
import CustomMarker from '@/components/core/day5/CustomMarker';
import ApartmentListItem from '@/components/core/day5/ApartmentListItem';


const AirbnbScreen = () => {
  const [selected, setSelected] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 5.603716,
    longitude: -0.187000,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  })
  const snapPoints = useMemo(() => [75, '50%', '90%'], []);

  return (
    <View>
        <Stack.Screen options={{headerShown: false}}/>
      <MapView style={styles.map}
      region={mapRegion}
      >
        {apartments.map((apartment) => (
            <CustomMarker 
            key={apartment.id}
            latitude={apartment.latitude}
            longitude={apartment.longitude}
            title={apartment.title}
            price={apartment.price}
            onPress={() => setSelected(apartment)}
            />
        )
        )}
      </MapView>
      {
        selected === null ? 
        "" 
        : (
          <View style={{
            position: 'absolute',
            bottom: 90,
            left: 10,
            right: 10,
          }}>
            <ApartmentListItem 
          apartment={selected}
          />
          </View>
        )
      }

  <BottomSheet
        //ref={bottomSheetRef}
        //onChange={handleSheetChanges}
        
        index={0}
        snapPoints={snapPoints}
      >
        <View style={{ flex: 1}}>
          <Text style={styles.listTitle}>Over {apartments.length} places</Text>

          <BottomSheetFlatList
          contentContainerStyle={{ 
            gap: 10,
            padding: 10
          }} 
            data={apartments}
            renderItem={({item}) => <ApartmentListItem apartment={item}/> } 
          />
        </View>
      </BottomSheet>
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
    },

    listTitle: {
      fontFamily: 'InterSemi',
      fontSize: 16,
      textAlign: 'center',
      marginVertical: 5,
      marginBottom: 20
    }
})

export default AirbnbScreen;