import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatPostDate } from '../../utils/dateFormatter';

interface PostFooterProps {
  name: string;
  description: string;
  createdAt: string;
}

export const PostFooter: React.FC<PostFooterProps> = ({ name, description, createdAt }) => {
  return (
    <View style={styles.container}>
      {/* Caption del post */}
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          <Text style={styles.username}>{name}</Text>
          {' '}
          <Text style={styles.description}>{description}</Text>
        </Text>
      </View>

      {/* Fecha de creación */}
      <Text style={styles.timestamp}>
        {formatPostDate(createdAt)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 8,
  },
  captionContainer: {
    marginBottom: 6,
  },
  captionText: {
    fontSize: 14,
    lineHeight: 18,
  },
  username: {
    fontWeight: '600',
    color: '#000',
  },
  description: {
    color: '#000',
    fontWeight: '400',
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E8E',
    marginTop: 4,
  },
});