import { useRef, useEffect } from 'react';
import { Animated, Dimensions } from 'react-native';

const { height: screenHeight } = Dimensions.get('window');

export const useStoryAnimation = (visible: boolean) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current;

  const animateIn = () => {
    // Asegurar que empiecen en la posición correcta
    translateY.setValue(0);
    backgroundOpacity.setValue(0);
    
    Animated.timing(backgroundOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const animateOut = (onComplete: () => void) => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start(() => {
      // NO resetear aquí - solo llamar onComplete
      onComplete();
    });
  };

  const handleSwipeMove = (dy: number) => {
    const progress = Math.min(dy / 200, 1);
    translateY.setValue(dy);
    backgroundOpacity.setValue(1 - progress * 0.6);
  };

  const handleSwipeRelease = (dy: number, vy: number, onClose: () => void) => {
    if (dy > 100 || vy > 0.5) {
      animateOut(onClose);
    } else {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start();
    }
  };

  // IMPORTANTE: Solo resetear cuando el modal NO es visible
  useEffect(() => {
    if (visible) {
      animateIn();
    } else {
      // Reset inmediato cuando no visible (sin animación)
      translateY.setValue(0);
      backgroundOpacity.setValue(0);
    }
  }, [visible]);

  return {
    translateY,
    backgroundOpacity,
    animateOut,
    handleSwipeMove,
    handleSwipeRelease,
  };
};