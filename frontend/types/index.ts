export interface User {
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

export interface Channel {
  id: number;
  name: string;
  username: string;
  avatar?: string;
  banner?: string;
  followers: number;
  isLive: boolean;
  isFollowing?: boolean;
  isSubscribed?: boolean;
  description?: string;
}

export interface Stream {
  id: number;
  title: string;
  thumbnail: string;
  channel: Channel;
  viewers: number;
  isLive: boolean;
  category?: Category;
  duration?: string;
}

export interface Category {
  id: number;
  name: string;
  thumbnail: string;
  viewerCount?: number;
}

export interface Schedule {
  id: number;
  channel: Channel;
  title: string;
  category: Category;
  scheduledAt: string;
  description?: string;
}

export interface Cybermahalla {
  id: number;
  name: string;
  logo: string;
  banner: string;
  description: string;
  members: number;
  isJoined: boolean;
  categories: string[];
  activeCompetitions: number;
  createdAt: string;
  isOnline?: boolean;
}
