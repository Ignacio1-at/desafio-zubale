import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatLikesCount } from '../../utils/dateFormatter';

interface PostInteractionsProps {
  liked: boolean;
  saved: boolean;
  likes: number;
  comments: number;
}

export const PostInteractions: React.FC<PostInteractionsProps> = ({
  liked: initialLiked,
  saved: initialSaved,
  likes: initialLikes,
  comments
}) => {
  // Estados locales para manejar las interacciones
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [likesCount, setLikesCount] = useState(initialLikes);

  // Función para manejar el like
  const handleLike = () => {
    if (isLiked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  // Función para manejar el save
  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  // Función placeholder para comentarios
  const handleComment = () => {
    console.log('Abrir comentarios');
  };

  // Función placeholder para compartir
  const handleShare = () => {
    console.log('Compartir post');
  };

  // Función para ver comentarios
  const handleViewComments = () => {
    console.log('Ver todos los comentarios');
  };

  return (
    <View style={styles.container}>
      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <View style={styles.leftActions}>
          {/* Botón de like */}
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? "#FF3040" : "#000"}
            />
          </TouchableOpacity>

          {/* Botón de comentarios */}
          <TouchableOpacity onPress={handleComment} style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#000" />
          </TouchableOpacity>

          {/* Botón de compartir */}
          <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Botón de guardar */}
        <TouchableOpacity onPress={handleSave}>
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={24}
            color="#000"
          />
        </TouchableOpacity>
      </View>

      {/* Contador de likes */}
      <View style={styles.statsContainer}>
        <Text style={styles.likesText}>
          {formatLikesCount(likesCount)} me gusta
        </Text>
        
        {/* Contador de comentarios */}
        {comments > 0 && (
          <TouchableOpacity onPress={handleViewComments} style={styles.commentsButton}>
            <Text style={styles.commentsText}>
              Ver los {formatLikesCount(comments)} comentarios
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 15,
  },
  statsContainer: {
    marginTop: 4,
  },
  likesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  commentsButton: {
    marginTop: 2,
  },
  commentsText: {
    fontSize: 14,
    color: '#8E8E8E',
    fontWeight: '400',
  },
});