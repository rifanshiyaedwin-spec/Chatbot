import React, { useState } from 'react';
import { LockIcon, ShieldIcon, UserIcon, HeartIcon } from './Icons';

interface AuthModalProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onSuccess, onCancel }) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
    
    // Check if full pin
    if (index === 3 && value) {
        // Mock validation
        setTimeout(() => onSuccess(), 500);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl relative overflow-hidden">
        {/* Background decorative */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-red-500"></div>
        
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 mb-2">
            <LockIcon className="w-8 h-8" />
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Secure Access</h2>
            <p className="text-gray-500 text-sm">Enter your PIN to access your private romantic conversations.</p>
          </div>

          <div className="flex gap-4 mb-4">
            {pin.map((digit, idx) => (
              <input
                key={idx}
                id={`pin-${idx}`}
                type="password"
                inputMode="numeric"
                value={digit}
                onChange={(e) => handlePinChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 border-2 border-gray-200 rounded-xl text-center text-2xl font-bold focus:border-pink-500 focus:ring-4 focus:ring-pink-100 outline-none transition-all"
                autoFocus={idx === 0}
              />
            ))}
          </div>
          
          <button 
             onClick={onSuccess} // Bypass for demo
             className="text-pink-500 text-sm font-medium hover:underline"
          >
             Use FaceID (Demo)
          </button>

          <div className="w-full border-t border-gray-100 pt-6 mt-2">
             <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldIcon className="w-4 h-4" />
                <span>256-bit AES Encryption Active</span>
             </div>
          </div>
          
          <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
             ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;