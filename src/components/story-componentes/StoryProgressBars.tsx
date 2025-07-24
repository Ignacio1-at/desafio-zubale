import React from 'react';
import { View, Animated, StyleSheet, Platform, SafeAreaView } from 'react-native';

interface StoryProgressBarsProps {
  stories: any[];
  currentIndex: number;
  progressValues: Animated.Value[];
}

export const StoryProgressBars: React.FC<StoryProgressBarsProps> = ({
  stories,
  currentIndex,
  progressValues,
}) => {
  return (
    <SafeAreaView style={styles.progressSection}>
      <View style={styles.progressContainer}>
        {stories.map((_, index) => (
          <View key={index} style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBar,
                {
                  width: index === currentIndex
                    ? progressValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      })
                    : index < currentIndex 
                      ? '100%' 
                      : '0%'
                },
              ]}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  progressSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  progressContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 2,
  },
  progressBarBackground: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
});