import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
  id: number;
  phone: string;
  username: string;
  displayName: string;
  bio: string;
  avatar?: string;
  links: {
    discord?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    telegram?: string;
    linkedin?: string;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (phone: string, password: string) => {
        // Mock login - replace with actual API call
        if (phone === '+10000000000' && password === 'guest123') {
          const mockUser: User = {
            id: 1,
            phone: '+10000000000',
            username: 'AndrewAimsley',
            displayName: 'AndrewAimsley',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
            links: {
              discord: 'https://discord.gg/AndrewAimsley',
              youtube: 'https://youtube.com/channel/AndrewAimsley',
              twitter: 'https://twitter.com/AndrewAimsley',
              instagram: 'https://instagram.com/AndrewAimsley',
            },
          };
          const mockToken = 'mock-jwt-token-123456';

          Cookies.set('auth_token', mockToken, { expires: 7 });

          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },

      logout: () => {
        Cookies.remove('auth_token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (user: User) => {
        set({ user });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
