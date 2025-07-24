import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StoryHeaderProps {
  story: {
    name: string;
    avatar: string;
    createdAt: string;
  };
  onClose: () => void;
  formatPostDate: (date: string) => string;
  getAlternativeAvatar: (name: string) => string;
}

export const StoryHeader: React.FC<StoryHeaderProps> = ({
  story,
  onClose,
  formatPostDate,
  getAlternativeAvatar,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: story.avatar.includes('cloudflare-ipfs')
              ? getAlternativeAvatar(story.name)
              : story.avatar
          }}
          style={styles.avatar}
        />
        <View style={styles.userDetails}>
          <Text style={styles.username}>{story.name}</Text>
          <Text style={styles.timestamp}>
            {formatPostDate(story.createdAt)}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={26} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 70 : 50, 
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 8, 
    zIndex: 100,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userDetails: {
    flex: 1,
  },
  username: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 1,
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
  },
});