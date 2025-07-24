import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';

interface PostHeaderProps {
  avatar: string;
  name: string;
  location: string;
}

export const PostHeader: React.FC<PostHeaderProps> = ({ avatar, name, location }) => {
  const [avatarError, setAvatarError] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));
  
  const getAlternativeAvatar = (name: string) => {
    const seed = name.toLowerCase().replace(/\s+/g, '');
    return `https://picsum.photos/80/80?random=${seed}`;
  };

  const handleAvatarError = () => {
    setAvatarError(true);
    setAvatarLoading(true);
    fadeAnim.setValue(0);
  };

  const handleAvatarLoad = () => {
    setAvatarLoading(false);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const avatarSource = avatarError 
    ? { uri: getAlternativeAvatar(name) }
    : { uri: avatar };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {/* Avatar del usuario */}
        <View style={styles.avatarContainer}>
          <Animated.Image
            source={avatarSource}
            style={[styles.avatar, { opacity: fadeAnim }]}
            onError={handleAvatarError}
            onLoad={handleAvatarLoad}
          />
          {avatarLoading && (
            <View style={styles.avatarPlaceholder}>
              <View style={styles.avatarShimmer} />
            </View>
          )}
        </View>
        
        <View style={styles.textContainer}>
          {/* Nombre del usuario */}
          <Text style={styles.username} numberOfLines={1}>{name}</Text>
          {/* Ubicación */}
          <Text style={styles.location} numberOfLines={1}>{location}</Text>
        </View>
      </View>
      
      {/* Botón de opciones (los 3 puntos) */}
      <View style={styles.optionsButton}>
        <Text style={styles.optionsText}>⋯</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  avatarPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  avatarShimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#8E8E8E',
  },
  optionsButton: {
    padding: 8,
    marginRight: -8,
  },
  optionsText: {
    fontSize: 18,
    color: '#8E8E8E',
    transform: [{ rotate: '90deg' }],
  },
});