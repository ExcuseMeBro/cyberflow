import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export type UserType = 'user' | 'parent';

interface User {
  id: number;
  phone: string;
  username: string;
  displayName: string;
  bio: string;
  avatar?: string;
  userType: UserType;
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
  userType: UserType | null;
  login: (phone: string, password: string, userType: UserType) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      userType: null,

      login: async (phone: string, password: string, userType: UserType) => {
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone, password, userType }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Login failed');
          }

          const { user, token } = data;

          // Save token in cookies
          Cookies.set('auth_token', token, { expires: 7 });

          // Map database user to User interface
          const mappedUser: User = {
            id: user.id,
            phone: user.phone,
            username: user.username,
            displayName: user.display_name,
            bio: user.bio || '',
            userType: user.user_type,
            avatar: user.avatar,
            links: user.links || {},
          };

          set({
            user: mappedUser,
            token,
            isAuthenticated: true,
            userType: user.user_type,
          });
        } catch (error: any) {
          throw new Error(error.message || 'Invalid credentials');
        }
      },

      logout: () => {
        Cookies.remove('auth_token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          userType: null,
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
