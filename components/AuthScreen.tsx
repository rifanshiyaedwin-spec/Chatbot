import React, { useState } from 'react';
import { HeartIcon, LockIcon, UserIcon } from './Icons';
import { mockDb } from '../services/mockDatabase';
import { User } from '../types';

interface AuthScreenProps {
  onSuccess: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let user: User;
      if (isLogin) {
        user = await mockDb.login(formData.email, formData.password);
      } else {
        user = await mockDb.signup(formData.username, formData.email, formData.password);
      }
      onSuccess(user);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#fff0f5] relative overflow-hidden p-6 justify-center items-center">
      {/* Decorative Background */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-pink-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-red-200 rounded-full blur-3xl opacity-50"></div>

      <div className="z-10 w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-pink-500 to-red-600 rounded-3xl rotate-6 flex items-center justify-center shadow-xl mx-auto mb-6">
            <HeartIcon className="w-10 h-10 text-white animate-pulse" fill={true} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 font-romantic mb-2">
            {isLogin ? 'Welcome Back!' : 'Join Chatbot'}
          </h1>
          <p className="text-gray-500">Secure. Private. Romantic.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Username"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all"
                  value={formData.username}
                  onChange={e => setFormData({...formData, username: e.target.value})}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div className="relative">
              <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-pink-500/30 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  {isLogin ? 'Log In' : 'Sign Up'}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-gray-500 hover:text-pink-600 font-medium text-sm transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;