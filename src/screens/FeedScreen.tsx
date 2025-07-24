import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../types/Post';
import { fetchPosts } from '../services/api';
import { PostItem } from '../components/post-componentes';
import { StoriesSection } from '../components/StoriesSection';

export const FeedScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Cargar posts al iniciar la pantalla
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los posts');
      console.error('Error cargando posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para refrescar los posts
  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  // Renderizar cada post
  const renderPost = ({ item }: { item: Post }) => (
    <PostItem post={item} />
  );

  // Header del feed
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Ícono de cámara */}
        <Ionicons name="camera-outline" size={28} color="#000" />
        
        {/* Título */}
        <Text style={styles.headerTitle}>CHALLENGE</Text>
        
        {/* Ícono de mensajes */}
        <Ionicons name="paper-plane-outline" size={26} color="#000" />
      </View>
    </View>
  );

  // Header de las stories como parte del FlatList
  const ListHeaderComponent = () => (
    <StoriesSection posts={posts} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header fijo */}
      {renderHeader()}
      
      {/* Feed con Stories */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={posts.length > 0 ? ListHeaderComponent : null}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#000',
  },
  listContainer: {
    paddingBottom: 20,
  },
});