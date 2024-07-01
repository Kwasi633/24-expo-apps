import { View, Text, StyleSheet, FlatList, FlatListProps } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import VideoPost from '../../../components/day12/VideoPost'
import { useCallback, useState, useRef, useEffect } from 'react';


const dummyPosts = [
    {
      id: '2',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4',
      caption: 'Caption of the post',
    },
    {
      id: '1',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/1.mp4',
      caption: 'Hey there',
    },
    {
      id: '3',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/3.mp4',
      caption: 'Hola',
    },
    {
      id: '4',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/4.mp4',
      caption: 'Piano practice',
    },
    {
      id: '5',
      video:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/5.mp4',
      caption: 'Hello World!',
    },
  ];

const FeedScreen = () => { 
  const [activePostId, setActivePostId] = useState(dummyPosts[0].id);

  const [posts, setPosts] = useState<typeof dummyPosts>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(dummyPosts)
    }
    fetchPosts();
  }, []);

  const onEndReached = () => {
    setPosts((currentPosts) => [...currentPosts, ...dummyPosts]);
  }

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: { itemVisiblePercentThreshold: 50},
      onViewableItemsChanged: ({ changed, viewableItems }) => {
        if(viewableItems.length > 0 && viewableItems[0].isViewable){
          setActivePostId(viewableItems[0].item.id);
        }
      }, 
    },
    ]);

  return (
    <View style={styles.container}>
    <StatusBar style='light' />
    <Stack.Screen options={{ headerShown: false}} />
      <FlatList 
        data={posts}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${item.id}-${index}` }
        onEndReached={onEndReached}
        onEndReachedThreshold={3}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={({ item }) => (
          <VideoPost post={item}
          activePostId={activePostId}
        />
        )}
      />
     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'color'
    }
})

export default FeedScreen;