import React, { useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Post } from '../types/Post';
import { StoryModal } from './StoryModal';

interface StoriesSectionProps {
  posts: Post[];
}

interface StoryItemProps {
  user: {
    name: string;
    avatar: string;
  };
  isViewed: boolean; 
  onPress: () => void;
}

const StoryItem: React.FC<StoryItemProps> = ({ user, isViewed, onPress }) => {
  const [avatarError, setAvatarError] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  const getAlternativeAvatar = (name: string) => {
    const seed = name.toLowerCase().replace(/\s+/g, '');
    return `https://picsum.photos/80/80?random=${seed}`;
  };

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  const handleAvatarLoad = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const avatarSource = avatarError
    ? { uri: getAlternativeAvatar(user.name) }
    : { uri: user.avatar };

  const firstName = user.name.split(' ')[0];

  return (
    <TouchableOpacity onPress={onPress} style={styles.storyItem}>
      <View style={styles.storyImageContainer}>
        <View style={[
          styles.storyBorder,
          // CAMBIAR COLOR SEGÚN SI FUE VISTA
          { borderColor: isViewed ? '#DBDBDB' : '#E1306C' }
        ]}>
          <Animated.Image
            source={avatarSource}
            style={[styles.storyImage, { opacity: fadeAnim }]}
            onError={handleAvatarError}
            onLoad={handleAvatarLoad}
          />
        </View>
      </View>
      <Text style={styles.storyName} numberOfLines={1}>
        {firstName}
      </Text>
    </TouchableOpacity>
  );
};

export const StoriesSection: React.FC<StoriesSectionProps> = ({ posts }) => {
  const [storyModalVisible, setStoryModalVisible] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
  const [viewedStories, setViewedStories] = useState<Set<number>>(new Set());

  // Obtener usuarios únicos para las stories
  const uniqueUsers = posts
    .filter((post, index, self) =>
      index === self.findIndex(p => p.name === post.name)
    )
    .slice(0, 10)
    .map(post => ({
      name: post.name,
      avatar: post.avatar,
      createdAt: post.createdAt,
      image: post.image,
    }));

  const handleStoryPress = (index: number) => {
    setSelectedStoryIndex(index);
    setStoryModalVisible(true);
  };

  const closeStoryModal = () => {
    setStoryModalVisible(false);
  };

  // Manejar cuando una story es vista
  const handleStoryViewed = (storyIndex: number) => {
    setViewedStories(prev => new Set([...prev, storyIndex]));
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {uniqueUsers.map((user, index) => (
            <StoryItem
              key={`${user.name}-${index}`}
              user={user}
              isViewed={viewedStories.has(index)} // PASAR SI FUE VISTA
              onPress={() => handleStoryPress(index)}
            />
          ))}
        </ScrollView>
      </View>

      <StoryModal
        visible={storyModalVisible}
        stories={uniqueUsers}
        initialIndex={selectedStoryIndex}
        onClose={closeStoryModal}
        onStoryViewed={handleStoryViewed} 
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  storyImageContainer: {
    marginBottom: 6,
  },
  storyBorder: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2,
    borderWidth: 2,
    // borderColor se asigna dinámicamente arriba
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
  },
  storyName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    fontWeight: '400',
  },
});