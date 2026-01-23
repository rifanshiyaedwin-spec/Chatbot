export type MediaType = 'text' | 'image' | 'audio' | 'video' | 'pdf';

export interface Attachment {
  id: string;
  type: MediaType;
  url: string; // Base64 data URI for this demo
  name: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'friend';
  text: string;
  attachments?: Attachment[];
  timestamp: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  status?: string;
  joinedDate: number;
}

export interface ChatSession {
  id: string;
  partnerId: string; // 'ai' or user ID
  partnerName: string;
  partnerAvatar?: string;
  lastMessage: string;
  lastTimestamp: number;
  unreadCount: number;
  type: 'ai' | 'direct';
}

export enum AppScreen {
  SPLASH = 'SPLASH',
  LANDING = 'LANDING',
  AUTH = 'AUTH',
  MAIN = 'MAIN',
  CHAT = 'CHAT' // Individual chat screen
}

export enum MainTab {
  CHATS = 'CHATS',
  AI = 'AI',
  PROFILE = 'PROFILE'
}