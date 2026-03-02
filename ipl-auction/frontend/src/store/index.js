import { create } from 'zustand';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Auth store
export const useAuthStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.post(`${API}/auth/login`, { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user, token: data.token, loading: false });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },

  isAdmin: () => get().user?.role === 'admin',
}));

// Get axios instance with auth header
export const getApi = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: API,
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Theme store
export const useThemeStore = create((set) => ({
  darkMode: true,
  toggleTheme: () => set((s) => ({ darkMode: !s.darkMode })),
}));
