import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export const useStoryProgress = (
  stories: any[],
  currentIndex: number,
  duration: number,
  isPaused: boolean,
  imageLoaded: boolean,
  onComplete: () => void
) => {
  const progressRef = useRef<Animated.CompositeAnimation | null>(null);
  const progressValues = useRef(stories.map(() => new Animated.Value(0))).current;

  const startProgress = () => {
    if (isPaused || !imageLoaded) return;

    const currentProgress = progressValues[currentIndex];
    
    progressRef.current = Animated.timing(currentProgress, {
      toValue: 1,
      duration,
      useNativeDriver: false,
    });

    progressRef.current.start(({ finished }) => {
      if (finished && !isPaused) {
        onComplete();
      }
    });
  };

  const pauseProgress = () => {
    progressRef.current?.stop();
  };

  const resumeProgress = () => {
    if (imageLoaded) {
      startProgress();
    }
  };

  const resetProgress = (index: number) => {
    progressValues[index].setValue(0);
  };

  const completeProgress = (index: number) => {
    progressValues[index].setValue(1);
  };

  useEffect(() => {
    if (imageLoaded && !isPaused) {
      const timer = setTimeout(startProgress, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, imageLoaded, isPaused]);

  useEffect(() => {
    return () => {
      progressRef.current?.stop();
    };
  }, []);

  return {
    progressValues,
    startProgress,
    pauseProgress,
    resumeProgress,
    resetProgress,
    completeProgress,
  };
};