import { View, Text, Button } from 'react-native'
import React, {useState, useRef} from 'react'
import * as Notifications from 'expo-notifications';

const NotificationsHomeScreen = () => {
  
  return (
    <View>
      <Text>Notification</Text>

      <Button title="Schedule Text Notification" 
      onPress={schedulePushNotification}
      />
    </View>
  )
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Checkout Tinder Swipe project!  📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', url: '/day14/notifications' },
    },
    trigger: { seconds: 10 },
  });
}

export default NotificationsHomeScreen;