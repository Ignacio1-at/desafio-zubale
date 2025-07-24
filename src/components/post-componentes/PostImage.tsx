import React, { useState } from 'react';
import { Image, StyleSheet, Dimensions, View, Text, Animated } from 'react-native';

interface PostImageProps {
  imageUrl: string;
}

const { width: screenWidth } = Dimensions.get('window');

const getFallbackImageUrl = (originalUrl: string, index: number = 0) => {
  const fallbackUrls = [
    `https://picsum.photos/640/640?random=${index}`,
    `https://via.placeholder.com/640x640/E1E1E1/FFFFFF?text=Imagen+${index + 1}`,
    `https://dummyimage.com/640x640/f0f0f0/999999&text=Post+${index + 1}`,
  ];
  
  if (originalUrl.includes('loremflickr.com')) {
    return fallbackUrls[0];
  }
  
  return originalUrl;
};

export const PostImage: React.FC<PostImageProps> = ({ imageUrl }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(imageUrl);
  const [attemptCount, setAttemptCount] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  const handleLoad = () => {
    setLoading(false);
    setError(false);
    // Animación de fade in suave
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleError = (e: any) => {
    if (attemptCount < 2) {
      const randomId = Math.floor(Math.random() * 1000);
      const fallbackUrl = getFallbackImageUrl(imageUrl, randomId);
      setCurrentUrl(fallbackUrl);
      setAttemptCount(prev => prev + 1);
      setLoading(true);
      fadeAnim.setValue(0); // Reset animation
    } else {
      setError(true);
      setLoading(false);
    }
  };

  if (error) {
    return (
      <View style={[styles.image, styles.errorContainer]}>
        <View style={styles.errorContent}>
          <Text style={styles.errorIcon}>📷</Text>
          <Text style={styles.errorText}>No se pudo cargar la imagen</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: currentUrl }}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="cover"
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingContent}>
            <View style={styles.shimmer} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    backgroundColor: '#f8f8f8',
  },
  errorContainer: {
    width: screenWidth,
    height: screenWidth,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContent: {
    alignItems: 'center',
    opacity: 0.6,
  },
  errorIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  errorText: {
    color: '#666',
    fontSize: 13,
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  loadingContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  shimmer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    position: 'relative',
    overflow: 'hidden',
  },
});