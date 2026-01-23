import React, { useState } from 'react';
import { User } from '../types';
import { mockDb } from '../services/mockDatabase';
import { EditIcon, LockIcon, ShieldIcon, CameraIcon } from './Icons';

interface ProfileScreenProps {
  user: User;
  onUpdate: (user: User) => void;
  onLogout: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onUpdate, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    status: user.status || ''
  });

  const handleSave = async () => {
    try {
      const updatedUser = await mockDb.updateUser(user.id, formData);
      onUpdate(updatedUser);
      setIsEditing(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-full overflow-y-auto pb-20">
      <div className="bg-white p-6 pb-12 rounded-b-[3rem] shadow-sm relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-pink-400 to-red-500 opacity-90"></div>
        
        <div className="relative pt-12 flex flex-col items-center">
          <div className="relative group">
             <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
               <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
             </div>
             <button className="absolute bottom-1 right-1 bg-gray-900 text-white p-2 rounded-full shadow-md hover:bg-pink-600 transition-colors">
               <CameraIcon className="w-4 h-4" />
             </button>
          </div>
          
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Status Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700">About Me</h3>
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="text-pink-600 text-sm font-bold uppercase tracking-wider"
            >
              {isEditing ? 'Save' : 'Edit'}
            </button>
          </div>
          
          {isEditing ? (
             <div className="space-y-4">
                <div>
                   <label className="text-xs text-gray-400 uppercase font-bold">Username</label>
                   <input 
                      className="w-full border-b border-pink-200 py-2 outline-none text-gray-800 bg-transparent focus:border-pink-500"
                      value={formData.username}
                      onChange={e => setFormData({...formData, username: e.target.value})}
                   />
                </div>
                <div>
                   <label className="text-xs text-gray-400 uppercase font-bold">Status</label>
                   <input 
                      className="w-full border-b border-pink-200 py-2 outline-none text-gray-800 bg-transparent focus:border-pink-500"
                      value={formData.status}
                      onChange={e => setFormData({...formData, status: e.target.value})}
                   />
                </div>
             </div>
          ) : (
            <>
              <p className="text-gray-600 italic">"{user.status || 'No status set'}"</p>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
                 <span>Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
              </div>
            </>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="p-4 border-b border-gray-50 flex items-center gap-3 hover:bg-pink-50 transition-colors cursor-pointer">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                 <ShieldIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                 <h4 className="font-bold text-gray-700 text-sm">Privacy & Security</h4>
                 <p className="text-xs text-gray-500">Manage 2FA and encryption keys</p>
              </div>
           </div>
           
           <div className="p-4 flex items-center gap-3 hover:bg-pink-50 transition-colors cursor-pointer">
              <div className="bg-green-100 p-2 rounded-lg text-green-600">
                 <LockIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                 <h4 className="font-bold text-gray-700 text-sm">App Lock</h4>
                 <p className="text-xs text-gray-500">Biometric and Pin settings</p>
              </div>
           </div>
        </div>

        <button 
           onClick={onLogout}
           className="w-full py-4 text-red-500 font-bold bg-white rounded-2xl shadow-sm border border-red-50 hover:bg-red-50 transition-colors"
        >
           Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;