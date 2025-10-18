import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  login: (phone: string, password: string) =>
    api.post('/auth/login/', { phone, password }),
  register: (phone: string, password: string) =>
    api.post('/auth/register/', { phone, password }),
  logout: () => api.post('/auth/logout/'),
};

// User endpoints
export const userAPI = {
  getProfile: () => api.get('/users/me/'),
  updateProfile: (data: any) => api.patch('/users/me/', data),
};

// Channel endpoints
export const channelAPI = {
  getChannel: (id: string) => api.get(`/channels/${id}/`),
  followChannel: (id: string) => api.post(`/channels/${id}/follow/`),
  unfollowChannel: (id: string) => api.post(`/channels/${id}/unfollow/`),
  subscribeChannel: (id: string) => api.post(`/channels/${id}/subscribe/`),
};

// Stream endpoints
export const streamAPI = {
  getLiveStreams: () => api.get('/streams/live/'),
  getRecommended: () => api.get('/streams/recommended/'),
  getContinueWatching: () => api.get('/streams/continue-watching/'),
};

// Category endpoints
export const categoryAPI = {
  getAll: () => api.get('/categories/'),
  getFollowed: () => api.get('/categories/followed/'),
};

export default api;
