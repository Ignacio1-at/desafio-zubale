import axios from 'axios';
import { Post } from '../types/Post';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('EXPO_PUBLIC_API_BASE_URL no esta definida');
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get<Post[]>('/posts');
    return response.data;
  } catch (error) {
    console.error('Error con los posts:', error);
    throw error;
  }
};