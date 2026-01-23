import { User, ChatSession, Message } from '../types';

// Simulating a Neon Postgres Database connection and logic locally
const STORAGE_KEYS = {
  USERS: 'chatbot_users',
  CURRENT_USER: 'chatbot_current_user',
  CHATS: 'chatbot_chats',
  MESSAGES: 'chatbot_messages_'
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDb = {
  // Auth
  async login(email: string, password: string): Promise<User> {
    await delay(800); // Simulate network
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (!user) throw new Error('Invalid credentials');
    
    const { password: _, ...safeUser } = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    return safeUser;
  },

  async signup(username: string, email: string, password: string): Promise<User> {
    await delay(800);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: 'user_' + Date.now(),
      username,
      email,
      password, // In real app, this would be hashed
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      status: 'Happy Valentine\'s Day! 💖',
      joinedDate: Date.now()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    const { password: _, ...safeUser } = newUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    
    // Seed generic friends
    mockDb.seedFriends(safeUser.id);
    
    return safeUser;
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return stored ? JSON.parse(stored) : null;
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    await delay(500);
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const idx = users.findIndex((u: User) => u.id === userId);
    
    if (idx === -1) throw new Error('User not found');
    
    const updatedUser = { ...users[idx], ...updates };
    users[idx] = updatedUser;
    
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    
    const { password: _, ...safeUser } = updatedUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(safeUser));
    
    return safeUser;
  },

  // Chat Data
  getChats(userId: string): ChatSession[] {
    const key = `${STORAGE_KEYS.CHATS}_${userId}`;
    const chats = localStorage.getItem(key);
    if (!chats) return [];
    return JSON.parse(chats).sort((a: ChatSession, b: ChatSession) => b.lastTimestamp - a.lastTimestamp);
  },

  getMessages(sessionId: string): Message[] {
    const msgs = localStorage.getItem(`${STORAGE_KEYS.MESSAGES}${sessionId}`);
    return msgs ? JSON.parse(msgs) : [];
  },

  async sendMessage(userId: string, sessionId: string, message: Message): Promise<void> {
    const msgKey = `${STORAGE_KEYS.MESSAGES}${sessionId}`;
    const msgs = this.getMessages(sessionId);
    msgs.push(message);
    localStorage.setItem(msgKey, JSON.stringify(msgs));

    // Update session preview
    const chats = this.getChats(userId);
    const sessionIdx = chats.findIndex(c => c.id === sessionId);
    if (sessionIdx > -1) {
      chats[sessionIdx].lastMessage = message.text || (message.attachments ? 'Sent a file' : '');
      chats[sessionIdx].lastTimestamp = message.timestamp;
      localStorage.setItem(`${STORAGE_KEYS.CHATS}_${userId}`, JSON.stringify(chats));
    }
  },

  // Helper to seed data
  seedFriends(userId: string) {
    const initialChats: ChatSession[] = [
      {
        id: 'chat_ai',
        partnerId: 'ai',
        partnerName: 'ChatAi',
        partnerAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ValentineBot',
        lastMessage: 'Welcome! I am your AI assistant.',
        lastTimestamp: Date.now(),
        unreadCount: 1,
        type: 'ai'
      },
      {
        id: 'chat_romeo',
        partnerId: 'user_romeo',
        partnerName: 'Romeo',
        partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Romeo',
        lastMessage: 'Hey! Did you see the photos?',
        lastTimestamp: Date.now() - 100000,
        unreadCount: 2,
        type: 'direct'
      },
      {
        id: 'chat_juliet',
        partnerId: 'user_juliet',
        partnerName: 'Juliet',
        partnerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juliet',
        lastMessage: 'Happy Valentine\'s Day!',
        lastTimestamp: Date.now() - 3600000,
        unreadCount: 0,
        type: 'direct'
      }
    ];
    localStorage.setItem(`${STORAGE_KEYS.CHATS}_${userId}`, JSON.stringify(initialChats));
  }
};