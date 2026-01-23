import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatSession, MediaType, Attachment } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { mockDb } from '../services/mockDatabase';
import { SendIcon, HeartIcon, ArrowLeftIcon, LockIcon, AttachmentIcon, CameraIcon, MicIcon, FileIcon } from './Icons';

interface ChatInterfaceProps {
  session: ChatSession;
  currentUserId: string;
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ session, currentUserId, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load messages
    const msgs = mockDb.getMessages(session.id);
    if (msgs.length === 0 && session.type === 'ai') {
        // Init welcome message for AI
        const welcome: Message = {
            id: 'welcome',
            role: 'model',
            text: "Hello! Happy Valentine's Day! 💖 I'm ChatAi. I can help you write poems, plan dates, or just chat. You can also send me photos!",
            timestamp: Date.now()
        };
        setMessages([welcome]);
        mockDb.sendMessage(currentUserId, session.id, welcome);
    } else {
        setMessages(msgs);
    }
    
    // Scroll
    setTimeout(scrollToBottom, 100);
  }, [session.id]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e?: React.FormEvent, attachment?: { type: MediaType, url: string, name: string }) => {
    e?.preventDefault();
    if ((!inputText.trim() && !attachment) || isTyping) return;

    let msgAttachments: Attachment[] | undefined;
    if (attachment) {
      msgAttachments = [{
        id: Date.now().toString() + '-att',
        ...attachment
      }];
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText.trim(),
      timestamp: Date.now(),
      attachments: msgAttachments
    };

    // Save locally
    await mockDb.sendMessage(currentUserId, session.id, userMsg);
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setShowAttachments(false);

    // If AI
    if (session.type === 'ai') {
        setIsTyping(true);
        try {
            const tempId = (Date.now() + 1).toString();
            setMessages((prev) => [...prev, { id: tempId, role: 'model', text: '', timestamp: Date.now() }]);

            // If attachment is image, we might want to handle it (future improvement for multimodal)
            // For now, stream text response
            const responseText = await streamChatResponse(
                messages, 
                userMsg.text || (attachment ? `[Sent ${attachment.type}] Describe this.` : "Hello"), 
                (chunk) => {
                     setMessages((prev) => prev.map(m => m.id === tempId ? { ...m, text: chunk } : m));
                }
            );
            
            // Save final AI response
            const aiMsg: Message = { id: tempId, role: 'model', text: responseText, timestamp: Date.now() };
            await mockDb.sendMessage(currentUserId, session.id, aiMsg);
            
        } catch (err) {
            console.error(err);
        } finally {
            setIsTyping(false);
        }
    } else {
        // Simulate Friend Reply
        setTimeout(async () => {
            const reply: Message = {
                id: Date.now().toString(),
                role: 'friend',
                text: "That's awesome! Happy Valentine's Day! 🌹",
                timestamp: Date.now()
            };
            await mockDb.sendMessage(currentUserId, session.id, reply);
            setMessages(prev => [...prev, reply]);
        }, 2000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
          const type = file.type.startsWith('image/') ? 'image' : 
                       file.type.startsWith('video/') ? 'video' : 
                       file.type.startsWith('audio/') ? 'audio' : 'pdf';
          
          handleSendMessage(undefined, {
              type: type as MediaType,
              url: reader.result as string,
              name: file.name
          });
      };
      reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col h-full bg-[#fff0f5] relative overflow-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 z-20 flex items-center justify-between sticky top-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-pink-100 rounded-full transition-colors text-pink-600">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="relative">
                <img src={session.partnerAvatar} alt="" className="w-10 h-10 rounded-full border border-pink-200" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h1 className="font-bold text-gray-800 text-sm flex items-center gap-1">
                 {session.partnerName}
                 {session.type === 'ai' && <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-[10px] px-1.5 rounded-md">AI</span>}
              </h1>
              <p className="text-xs text-gray-500">Active Now</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
           <LockIcon className="w-4 h-4" />
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 no-scrollbar pb-20">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm relative ${
                msg.role === 'user' ? 'bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-pink-100'
            }`}>
              {/* Attachments */}
              {msg.attachments?.map((att, idx) => (
                  <div key={idx} className="mb-2 rounded-lg overflow-hidden">
                      {att.type === 'image' && <img src={att.url} alt="attachment" className="w-full h-auto" />}
                      {att.type === 'audio' && <audio src={att.url} controls className="w-full" />}
                      {att.type === 'video' && <video src={att.url} controls className="w-full" />}
                      {att.type === 'pdf' && (
                          <div className="flex items-center gap-2 bg-black/10 p-2 rounded">
                              <FileIcon className="w-5 h-5" />
                              <span className="text-sm truncate">{att.name}</span>
                          </div>
                      )}
                  </div>
              ))}
              
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
              <span className={`text-[9px] absolute bottom-1 ${msg.role === 'user' ? 'right-3 text-pink-100' : 'left-3 text-gray-400'}`}>
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
           <div className="flex justify-start">
             <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-pink-100 shadow-sm flex items-center gap-1">
               <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-100"></div>
               <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-200"></div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white p-3 z-20 border-t border-pink-100 pb-2">
        {showAttachments && (
            <div className="absolute bottom-20 left-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex gap-4 animate-in slide-in-from-bottom-5">
                <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-600">
                    <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center"><CameraIcon className="w-5 h-5" /></div>
                    <span className="text-xs">Media</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-600">
                    <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center"><MicIcon className="w-5 h-5" /></div>
                    <span className="text-xs">Audio</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-gray-600 hover:text-pink-600">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center"><FileIcon className="w-5 h-5" /></div>
                    <span className="text-xs">File</span>
                </button>
            </div>
        )}
        
        <form onSubmit={(e) => handleSendMessage(e)} className="flex items-center gap-2">
          <button 
             type="button"
             onClick={() => setShowAttachments(!showAttachments)}
             className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
          >
             <AttachmentIcon className="w-6 h-6" />
          </button>
          
          <input 
             type="file" 
             ref={fileInputRef} 
             className="hidden" 
             onChange={handleFileUpload}
             accept="image/*,video/*,audio/*,application/pdf"
          />

          <div className="flex-1 bg-gray-50 rounded-full border border-gray-200 flex items-center px-4 py-2 focus-within:ring-2 focus-within:ring-pink-300 transition-all">
             <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Message..."
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
             />
          </div>

          <button
            type="submit"
            disabled={!inputText.trim() && !showAttachments}
            className="w-10 h-10 bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 rounded-full flex items-center justify-center text-white transition-colors shadow-md"
          >
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;