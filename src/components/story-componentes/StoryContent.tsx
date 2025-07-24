import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { StoryLoadingIndicator } from './StoryLoadingIndicator';
import { StoryPauseIndicator } from './StoryPauseIndicator';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface StoryContentProps {
  imageUri: string;
  imageLoaded: boolean;
  isPaused: boolean;
  onImageLoad: () => void;
  onScreenTap: (event: any) => void;
  onLongPress: () => void;
  onPressOut: () => void;
}

export const StoryContent: React.FC<StoryContentProps> = ({
  imageUri,
  imageLoaded,
  isPaused,
  onImageLoad,
  onScreenTap,
  onLongPress,
  onPressOut,
}) => {
  return (
    <View style={styles.contentContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onScreenTap}
        onLongPress={onLongPress}
        onPressOut={onPressOut}
        style={styles.imageWrapper}
      >
        <Image
          source={{ uri: imageUri }}
          style={styles.storyImage}
          onLoad={onImageLoad}
          resizeMode="cover"
        />
        
        {!imageLoaded && <StoryLoadingIndicator />}
        {isPaused && imageLoaded && <StoryPauseIndicator />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 120,
    paddingBottom: 40,
  },
  imageWrapper: {
    width: screenWidth,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 8,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    maxHeight: screenHeight * 0.75,
    borderRadius: 12,
  },
});