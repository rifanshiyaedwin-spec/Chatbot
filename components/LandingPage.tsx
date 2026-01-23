import React from 'react';
import { HeartIcon, ShieldIcon, UserIcon } from './Icons';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-[#fff0f5] flex flex-col relative overflow-hidden">
      {/* Hero Background Shapes */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-pink-200 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-tr from-red-200 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
            <HeartIcon className="w-8 h-8 text-pink-600" fill={true} />
            <span className="font-romantic text-3xl text-gray-800 font-bold">Chatbot</span>
        </div>
        <button className="text-gray-600 font-medium hover:text-pink-600 transition-colors">Log In</button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 max-w-4xl mx-auto w-full">
        
        <div className="mb-8 relative">
           <div className="absolute inset-0 bg-pink-400 blur-2xl opacity-20 rounded-full"></div>
           <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-red-500 rounded-3xl rotate-12 flex items-center justify-center shadow-xl relative z-10 mx-auto">
              <HeartIcon className="w-12 h-12 text-white animate-pulse" fill={true} />
           </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Your Secure <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-600">Valentine Companion</span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
          Experience meaningful conversations with our advanced AI. 
          Private, secure, and always there to listen. 
          Celebrate connection in a safe space.
        </p>

        <button 
          onClick={onStart}
          className="group relative px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-pink-300/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 overflow-hidden"
        >
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <span className="relative z-10">Start Chatting Now</span>
          <HeartIcon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
        </button>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full text-left">
           <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                 <ShieldIcon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Secure & Private</h3>
              <p className="text-sm text-gray-500">End-to-end encryption ensures your conversations stay only between you and your AI companion.</p>
           </div>
           
           <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 mb-4">
                 <HeartIcon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Valentine Theme</h3>
              <p className="text-sm text-gray-500">Immerse yourself in a beautifully crafted romantic interface designed for love and friendship.</p>
           </div>

           <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                 <UserIcon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Personalized</h3>
              <p className="text-sm text-gray-500">Adapts to your mood and conversation style, providing a truly unique chatting experience.</p>
           </div>
        </div>
      </main>
      
      <footer className="p-6 text-center text-gray-400 text-sm">
         <p>© 2024 Valentine Chatbot. Securely powered by Neon & Gemini.</p>
      </footer>
    </div>
  );
};

export default LandingPage;