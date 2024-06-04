import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { FlatList } from 'react-native-gesture-handler';
import ForecastItem from '@/components/core/day8/ForecastItem';
import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';

//const apiKey = '89db478bf29fa11674ab59688aa976a4';
const apiKey = process.env.EXPO_PUBLIC_apiKey;
const city = 'Accra';

//const BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const BASE_URL = `https://api.openweathermap.org/data/2.5`;
const bgImage = `https://visitghana.com/wp-content/uploads/2018/08/2347_Cape_Coast_Castle_Courtyard_02_Sept_2012.jpg`

type MainWeather = {
  main: {
    "temp": number,
    "feels_like": number,
    "temp_min": number,
    "temp_max": number,
    "pressure": number,
    "humidity": number,
    "sea_level": number,
    "grnd_level": number
  },
};

type Weather = {
  name: string;
  main: MainWeather;
  "weather": [
    {
      "id": number,
      "main": string,
      "description": string,
      "icon": string
    }
  ];
};

export type WeatherForecast = {
  main: MainWeather;
  dt: number;
}

const Weather = () => {
const [weather, setWeather] = useState<Weather>();
const [location, setLocation] = useState<Location.LocationObject>(null);
const [errorMsg, setErrorMsg] = useState(null);
const [forecast, setForecast] = useState<WeatherForecast[]>();

useEffect(() => {
  if(location){
    fetchWeather();
    fetchForecast();
  }
}, [location]);


useEffect(() => {
  (async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();
}, []);

const fetchWeather = async () => {
  if(!location){
    return;
  }
  
  const results = await fetch(`${BASE_URL}/weather?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${apiKey}&units=metric`)
  const data =  await results.json();
  //console.log(JSON.stringify(data, null, 2));
  setWeather(data);
}

const fetchForecast = async () => {
  if(!location){
    return;
  }

  const results = await fetch(`${BASE_URL}/forecast?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&appid=${apiKey}&units=metric`)
  const data =  await results.json();
  console.log(JSON.stringify(data, null, 2));
  setForecast(data.list)
}

if(!weather){
  return <ActivityIndicator />
}

return (

    <ImageBackground source={{ uri: bgImage}} style={styles.container}>
      <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)'}}/>

      <Stack.Screen options={{ headerShown: false}}/>
      <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
      


      <LottieView 
       source={ weather.weather[0] === 'Rain' 
       ?
      require('../../../../assets/lottie/rain.json')
      :
      require('../../../../assets/lottie/sunny.json')
    }
       style={{
        width: 200,
        aspectRatio: 1,
       }}
       autoPlay
       loop
      />
     
      <Text style={styles.location}>{weather.name}</Text>
      <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
     
      </View>
      
      <FlatList 
        data={forecast}
        horizontal
        style={{ 
          flexGrow: 0, 
          height: 200, 
          marginBottom: 40 
        }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          {
            gap: 10,
            paddingHorizontal: 10
          }}
        renderItem={({item}) => <ForecastItem forecast={item} />}
      />

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center'
  },

  temp: {
    fontFamily: "InterBlack",
    fontSize: 150,
    color: '#FEFEFE'
  },

  location: {
    fontSize: 30,
    fontFamily: 'Inter',
    color: 'lightgray'
  }

  
})

export default Weather;