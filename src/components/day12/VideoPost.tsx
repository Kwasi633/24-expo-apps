import { View, Text, StyleSheet,useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

type VideoPost = {
    post: {
        id: string;
        video: string;
        caption: string;
    };
    activePostId: string;
}

const VideoPost = ({ post, activePostId }: VideoPost) => {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>()

  const isPlaying = status?.isLoaded && status.isPlaying;
  const {height} = useWindowDimensions();

  useEffect(() => {
    if(!video.current){
        return;
    }
    if(activePostId === post.id){
        video.current.playAsync();
    }
    if(activePostId !== post.id){
        video.current?.pauseAsync();
    }
  }, [activePostId, video.current])

  const onPress = () => {
    if(!video.current){
      return;
    }
    if(isPlaying){
      video.current.pauseAsync();
    } else{
      video.current.playAsync();
    } 
  }
 
  return (
    <View style={[styles.container, {height: height}]}>

    <Video style={[StyleSheet.absoluteFill, styles.video]}
        source={{ uri: post.video }}
        ref={video}
        resizeMode={ResizeMode.COVER}
        onPlaybackStatusUpdate={setStatus}
        isLooping
    />

<TouchableOpacity style={styles.content} onPress={onPress}>
<LinearGradient
        // Background Linear Gradient
        colors={['transparent', 'rgba(0,0,0,0.8)', ]}
        style={[StyleSheet.absoluteFillObject, {top: '50%'}]}
      />

   {!isPlaying && (
    <Ionicons 
    name="play" 
    size={70} 
    color="rgba(255, 255, 255, 0.6)" 
    style={{ position: 'absolute', alignSelf: 'center', top: '50%' }}
    />
   )}

    <SafeAreaView style={{ flex: 1 }}>
      
            <View style={styles.footer}>

            <View style={styles.leftColumn}>
                <Text style={styles.caption}>{post.caption}</Text>
            </View>

            <View style={styles.rightColumn}>
            <Ionicons name="heart" size={35} color="white" />
            <Ionicons name="share-social-sharp" size={35} color="white" />
            <Ionicons name="bookmark" size={35} color="white" />
            </View>
            </View>
    </SafeAreaView>
    </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    video: {},
    content: {
        flex: 1,
        padding: 10
        //backgroundColor: 'rgba(0,0,0,5)'
    },
    footer: {
      flexDirection: 'row',
        marginTop: 'auto',
      alignItems: 'flex-end'
      },
    leftColumn: {
      flex: 1
    },

    rightColumn: {
      gap: 10
    },

    caption: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Inter'
    }

})

export default VideoPost;