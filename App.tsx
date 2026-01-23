import React, { useState, useEffect } from 'react';
import { User, AppScreen, MainTab, ChatSession } from './types';
import LandingPage from './components/LandingPage';
import AuthScreen from './components/AuthScreen';
import ProfileScreen from './components/ProfileScreen';
import ChatInterface from './components/ChatInterface';
import { mockDb } from './services/mockDatabase';
import { HeartIcon, ChatIcon, SparklesIcon, UserIcon } from './components/Icons';

function App() {
  const [screen, setScreen] = useState<AppScreen>(AppScreen.SPLASH);
  const [activeTab, setActiveTab] = useState<MainTab>(MainTab.CHATS);
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);

  // Initial Load
  useEffect(() => {
    const currentUser = mockDb.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setScreen(AppScreen.MAIN);
      loadChats(currentUser.id);
    } else {
      setScreen(AppScreen.LANDING);
    }
  }, []);

  const loadChats = (userId: string) => {
    const loadedChats = mockDb.getChats(userId);
    setChats(loadedChats);
  };

  const handleLoginSuccess = (u: User) => {
    setUser(u);
    setScreen(AppScreen.MAIN);
    loadChats(u.id);
  };

  const handleLogout = () => {
    mockDb.logout();
    setUser(null);
    setScreen(AppScreen.LANDING);
  };

  const openChat = (session: ChatSession) => {
    setActiveSession(session);
    setScreen(AppScreen.CHAT);
  };

  const openChatAi = () => {
     // Find or create AI chat
     let aiChat = chats.find(c => c.type === 'ai');
     if (!aiChat && user) {
         // Should have been seeded, but just in case
         aiChat = {
             id: 'chat_ai',
             partnerId: 'ai',
             partnerName: 'ChatAi',
             partnerAvatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ValentineBot',
             lastMessage: 'Hi!',
             lastTimestamp: Date.now(),
             unreadCount: 0,
             type: 'ai'
         };
     }
     if (aiChat) openChat(aiChat);
  };

  // --- Renders ---

  if (screen === AppScreen.CHAT && activeSession && user) {
      return (
          <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
             <div className="w-full h-full md:max-w-md md:h-[90vh] md:rounded-3xl md:shadow-2xl overflow-hidden bg-white relative">
                 <ChatInterface 
                    session={activeSession} 
                    currentUserId={user.id}
                    onBack={() => {
                        setScreen(AppScreen.MAIN);
                        loadChats(user.id);
                    }} 
                 />
             </div>
          </div>
      );
  }

  return (
    <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full h-full md:max-w-md md:h-[90vh] md:rounded-3xl md:shadow-2xl overflow-hidden bg-white relative flex flex-col">
        
        {screen === AppScreen.LANDING && (
           <LandingPage onStart={() => setScreen(AppScreen.AUTH)} />
        )}

        {screen === AppScreen.AUTH && (
           <AuthScreen onSuccess={handleLoginSuccess} />
        )}

        {screen === AppScreen.MAIN && user && (
           <>
              {/* Main Content Area */}
              <div className="flex-1 overflow-hidden relative">
                 {activeTab === MainTab.CHATS && (
                    <div className="h-full overflow-y-auto p-4 bg-[#fff0f5]">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
                            <div className="bg-white p-2 rounded-full shadow-sm"><HeartIcon className="w-5 h-5 text-pink-500" fill={true} /></div>
                        </div>

                        {/* Pinned AI Tool */}
                        <div 
                           onClick={openChatAi}
                           className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-4 mb-6 shadow-lg shadow-pink-200 cursor-pointer relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <div className="relative flex items-center gap-4 text-white">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                                   <SparklesIcon className="w-6 h-6 text-pink-300" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">ChatAi Assistant</h3>
                                    <p className="text-gray-400 text-xs">Your personal AI companion</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat List */}
                        <div className="space-y-3">
                            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Recent Chats</h2>
                            {chats.filter(c => c.type !== 'ai').map(chat => (
                                <div 
                                    key={chat.id}
                                    onClick={() => openChat(chat)}
                                    className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-transparent hover:border-pink-200 transition-all cursor-pointer"
                                >
                                    <div className="relative">
                                        <img src={chat.partnerAvatar} alt="" className="w-12 h-12 rounded-full bg-gray-100" />
                                        {Math.random() > 0.5 && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold text-gray-800 text-sm truncate">{chat.partnerName}</h3>
                                            <span className="text-[10px] text-gray-400">{new Date(chat.lastTimestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">{chat.lastMessage || 'Sent an attachment'}</p>
                                    </div>
                                    {chat.unreadCount > 0 && (
                                        <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                                            {chat.unreadCount}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                 )}

                 {activeTab === MainTab.AI && (
                    <div className="h-full flex items-center justify-center bg-[#fff0f5] p-6 text-center">
                        <div>
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mx-auto mb-4">
                                <SparklesIcon className="w-10 h-10 text-pink-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2">ChatAi is Ready</h2>
                            <p className="text-gray-500 mb-6">Start a conversation with your intelligent assistant.</p>
                            <button onClick={openChatAi} className="px-8 py-3 bg-gray-900 text-white rounded-xl shadow-lg font-bold">Start Chatting</button>
                        </div>
                    </div>
                 )}

                 {activeTab === MainTab.PROFILE && (
                    <ProfileScreen user={user} onUpdate={setUser} onLogout={handleLogout} />
                 )}
              </div>

              {/* Bottom Navigation */}
              <div className="bg-white border-t border-gray-100 p-2 pb-safe">
                 <div className="flex justify-around items-center">
                    <button 
                        onClick={() => setActiveTab(MainTab.CHATS)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeTab === MainTab.CHATS ? 'text-pink-600 bg-pink-50' : 'text-gray-400'}`}
                    >
                        <ChatIcon className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Chats</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab(MainTab.AI)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeTab === MainTab.AI ? 'text-pink-600 bg-pink-50' : 'text-gray-400'}`}
                    >
                        <SparklesIcon className="w-6 h-6" />
                        <span className="text-[10px] font-medium">ChatAi</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab(MainTab.PROFILE)}
                        className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${activeTab === MainTab.PROFILE ? 'text-pink-600 bg-pink-50' : 'text-gray-400'}`}
                    >
                        <UserIcon className="w-6 h-6" />
                        <span className="text-[10px] font-medium">Profile</span>
                    </button>
                 </div>
              </div>
           </>
        )}

      </div>
    </div>
  );
}

export default App;