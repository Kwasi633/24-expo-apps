import { Platform, View, Text } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import { Slot } from 'expo-router'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AntDesign } from '@expo/vector-icons';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

const AppWithNotificationsLayout = () => {
    const [expoPushToken, setExpoPushToken] = useState<String>();
    const [notification, setNotification] = useState<Notifications.Notification>();
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();


    useEffect(() => {
        registerForPushNotificationsAsync().then((token) => 
            setExpoPushToken(token)
        );

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
          });

          return () => {
            notificationListener.current &&
              Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
              Notifications.removeNotificationSubscription(responseListener.current);
          };

    }, [])

    console.log("Token:", expoPushToken)
    console.log(notification)

  return (
    <>
    <Slot />
    {
        notification ? 
        <View style={{ 
            position: "absolute",  
            justifyContent: 'center',
            bottom: 30,
            left: 10,
            right: 10,
            backgroundColor: "gainsboro",
            padding: 10,
            borderRadius: 10
            }}>
            <Text style={{fontFamily: 'InterBold'}}>Title: {notification && notification.request.content.title} </Text>
            <Text>Body: {notification && notification.request.content.body}</Text>
            <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
            <AntDesign 
            style={{position: 'absolute', top: 10, right: 10}} 
            name="close" 
            size={24} 
            color="black" 
            onPress={() => setNotification(undefined)}
            />
            
          </View>
          :
          null
    
    }
    
    </>
    
  )
};

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId: "",
          })
        ).data;
        console.log(token);
      } 
    else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

export default AppWithNotificationsLayout;

//1:01:32