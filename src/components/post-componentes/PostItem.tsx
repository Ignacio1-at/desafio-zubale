import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Post } from '../../types/Post';
import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import { PostInteractions } from './PostInteractions';
import { PostFooter } from './PostFooter';

interface PostItemProps {
  post: Post;
}

export const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <View style={styles.container}>
      {/* Header: avatar + nombre */}
      <PostHeader 
        avatar={post.avatar} 
        name={post.name} 
        location={post.location} 
      />
      
      {/* Imagen del post */}
      <PostImage imageUrl={post.image} />
      
      {/* Botones de interacción: like, comment, save */}
      <PostInteractions 
        liked={post.liked}
        saved={post.saved}
        likes={post.likes}
        comments={post.comments}
      />
      
      {/* Footer: caption + fecha */}
      <PostFooter 
        name={post.name}
        description={post.description}
        createdAt={post.createdAt}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
});