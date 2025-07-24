import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Animated,
  PanResponder,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { formatPostDate } from '../utils/dateFormatter';
import { useStoryProgress } from '../hooks/useStoryProgress';
import { useStoryAnimation } from '../hooks/useStoryAnimation';
import { StoryContent, StoryHeader, StoryProgressBars } from './story-componentes';

const { width: screenWidth } = Dimensions.get('window');
const STORY_DURATION = 4000;

interface StoryUser {
  name: string;
  avatar: string;
  createdAt: string;
  image: string;
}

interface StoryModalProps {
  visible: boolean;
  stories: StoryUser[];
  initialIndex: number;
  onClose: () => void;
  onStoryViewed: (storyIndex: number) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  visible,
  stories,
  initialIndex,
  onClose,
  onStoryViewed,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentStory = stories[currentIndex];

  // Custom hooks
  const { translateY, backgroundOpacity, animateOut, handleSwipeMove, handleSwipeRelease } =
    useStoryAnimation(visible);

  const { progressValues, pauseProgress, resumeProgress, resetProgress, completeProgress } =
    useStoryProgress(stories, currentIndex, STORY_DURATION, isPaused, imageLoaded, () => {
      onStoryViewed(currentIndex);
      nextStory();
    });

  // PanResponder
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      pauseProgress();
      setIsPaused(true);
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        handleSwipeMove(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      handleSwipeRelease(gestureState.dy, gestureState.vy, onClose);
      if (gestureState.dy <= 100 && gestureState.vy <= 0.5) {
        resumeProgress();
        setIsPaused(false);
      }
    },
  });

  // Story navigation
  const nextStory = () => {
    onStoryViewed(currentIndex);

    if (currentIndex < stories.length - 1) {
      completeProgress(currentIndex);
      setCurrentIndex(prev => prev + 1);
      setImageLoaded(false);
      setIsPaused(false);
    } else {
      animateOut(onClose);
    }
  };

  const prevStory = () => {
    if (currentIndex > 0) {
      resetProgress(currentIndex);
      setCurrentIndex(prev => prev - 1);
      setImageLoaded(false);
      setIsPaused(false);
    }
  };

  // Event handlers
  const handleScreenTap = (event: any) => {
    const { locationX } = event.nativeEvent;

    if (!imageLoaded) return;

    if (locationX < screenWidth * 0.25) {
      prevStory();
    } else if (locationX > screenWidth * 0.75) {
      nextStory();
    } else {
      if (isPaused) {
        resumeProgress();
        setIsPaused(false);
      } else {
        pauseProgress();
        setIsPaused(true);
      }
    }
  };

  const handleLongPress = () => {
    if (imageLoaded) {
      pauseProgress();
      setIsPaused(true);
    }
  };

  const handlePressOut = () => {
    if (isPaused && imageLoaded) {
      resumeProgress();
      setIsPaused(false);
    }
  };

  const handleClose = () => {
    animateOut(onClose);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Utility functions
  const getAlternativeImage = (name: string) => {
    const seed = name.toLowerCase().replace(/\s+/g, '');
    return `https://picsum.photos/400/700?random=${seed}`;
  };

  const getAlternativeAvatar = (name: string) => {
    const seed = name.toLowerCase().replace(/\s+/g, '');
    return `https://picsum.photos/80/80?random=${seed}`;
  };

  // Effects
  useEffect(() => {
    if (visible) {
      setCurrentIndex(initialIndex);
      setIsPaused(false);
      setImageLoaded(false);
      progressValues.forEach((progress, index) => {
        if (index < initialIndex) {
          progress.setValue(1);
        } else {
          progress.setValue(0);
        }
      });
    }
  }, [visible, initialIndex]);

  useEffect(() => {
    if (visible && imageLoaded) {
      onStoryViewed(currentIndex);
    }
  }, [visible, imageLoaded, currentIndex]);

  if (!currentStory) return null;

  const imageUri = currentStory.image.includes('loremflickr.com')
    ? getAlternativeImage(currentStory.name)
    : currentStory.image;

  return (
    <Modal
      visible={visible}
      animationType="none"
      statusBarTranslucent
      transparent={true}
      onRequestClose={handleClose}
      presentationStyle="overFullScreen"
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Animated.View
        style={[styles.backgroundOverlay, { opacity: backgroundOpacity }]}
      />

      <Animated.View
        style={[styles.container, { transform: [{ translateY }] }]}
        {...panResponder.panHandlers}
      >
        <StoryProgressBars
          stories={stories}
          currentIndex={currentIndex}
          progressValues={progressValues}
        />

        <StoryHeader
          story={currentStory}
          onClose={handleClose}
          formatPostDate={formatPostDate}
          getAlternativeAvatar={getAlternativeAvatar}
        />

        <StoryContent
          imageUri={imageUri}
          imageLoaded={imageLoaded}
          isPaused={isPaused}
          onImageLoad={handleImageLoad}
          onScreenTap={handleScreenTap}
          onLongPress={handleLongPress}
          onPressOut={handlePressOut}
        />
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});