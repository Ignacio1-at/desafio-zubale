import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const StoryPauseIndicator: React.FC = () => {
  return (
    <View style={styles.pauseOverlay}>
      <View style={styles.pauseIcon}>
        <Ionicons name="play" size={40} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pauseOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
  },
  pauseIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});