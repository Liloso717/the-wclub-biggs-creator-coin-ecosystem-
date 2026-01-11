import React, { useState, useEffect, useRef } from 'react';
import { WallMessage } from '../types';
import { Send, User, MessageSquare, ThumbsUp, Tag, ShieldCheck, Filter, Loader2 } from 'lucide-react';

interface CommunityChatProps {
    onProfileClick: (username: string) => void;
}

const CommunityChat: React.FC<CommunityChatProps> = ({ onProfileClick }) => {
  // Mock Initial Data
  const [messages, setMessages] = useState<WallMessage[]>([
    {
      id: '1',
      sender: 'Admin_Biggs',
      text: "Welcome to the W Club Wall! 🏆 Keep it respectful, shill your bags in the right channels, and LFG! $TWCB to the moon. 🚀",
      timestamp: Date.now() - 10000000,
      likes: 420,
      tag: 'General',
      isVerified: true
    },
    {
      id: '2',
      sender: 'SolanaSniper',
      text: "Anyone seeing the volume on Base right now? Arbitrage opportunity looks juicy between the bridges.",
      timestamp: Date.now() - 3600000,
      likes: 12,
      tag: 'Alpha'
    },
    {
      id: '3',
      sender: 'MemeLord69',
      text: "When you sell the bottom and it pumps 50% in the next hour... 🤡💀",
      timestamp: Date.now() - 1800000,
      likes: 85,
      tag: 'Meme'
    },
    {
      id: '4',
      sender: 'DiamondHands',
      text: "Just swept 5 NFTs off the floor. Supply shock incoming! 🧹",
      timestamp: Date.now() - 900000,
      likes: 34,
      tag: 'Hype'
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [username, setUsername] = useState('');
  const [selectedTag, setSelectedTag] = useState<'General' | 'Hype' | 'Alpha' | 'Meme'>('General');
  const [filter, setFilter] = useState<string>('All');
  const [isPosting, setIsPosting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handlePost = async () => {
    if (!inputText.trim()) return;

    setIsPosting(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newMessage: WallMessage = {
      id: Date.now().toString(),
      sender: username.trim() || `Anon_${Math.floor(Math.random() * 9999)}`,
      text: inputText,
      timestamp: Date.now(),
      likes: 0,
      tag: selectedTag
    };

    setMessages(prev => [newMessage, ...prev]);
    setInputText('');
    setIsPosting(false);
  };

  const handleLike = (id: string) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    ));
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = (now - timestamp) / 1000; // seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const filteredMessages = filter === 'All' ? messages : messages.filter(m => m.tag === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 fade-in">
      
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <MessageSquare className="text-club-accent" size={32} />
            <span className="bg-gradient-to-r from-club-accent via-white to-club-purple bg-clip-text text-transparent">
              Community Wall
            </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          The heartbeat of The W Club. Drop alpha, share memes, or just hang out.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Sidebar: Post & Filters */}
        <div className="space-y-6">
            
            {/* Post Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Send size={20} className="text-club-gold" /> Post Message
                </h3>
                
                <div className="space-y-4">
                    <div>
                         <label className="text-xs text-gray-400 ml-1 mb-1 block">Username (Optional)</label>
                         <input 
                            type="text" 
                            placeholder="Anon_W_Club"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            maxLength={20}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-club-accent text-sm"
                            disabled={isPosting}
                        />
                    </div>
                    
                    <div>
                        <label className="text-xs text-gray-400 ml-1 mb-1 block">Tag</label>
                        <div className="flex flex-wrap gap-2">
                            {['General', 'Hype', 'Alpha', 'Meme'].map(tag => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag as any)}
                                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                                        selectedTag === tag 
                                        ? 'bg-club-accent text-black border-club-accent' 
                                        : 'bg-transparent text-gray-400 border-gray-600 hover:border-gray-400'
                                    }`}
                                    disabled={isPosting}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <textarea 
                            placeholder="What's on your mind?"
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                            maxLength={280}
                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-club-accent h-32 resize-none"
                            disabled={isPosting}
                        />
                         <div className="text-right text-xs text-gray-500 mt-1">
                            {inputText.length}/280
                        </div>
                    </div>

                    <button 
                        onClick={handlePost}
                        disabled={!inputText.trim() || isPosting}
                        className="w-full py-3 bg-gradient-to-r from-club-accent to-blue-600 rounded-xl font-bold text-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isPosting ? <Loader2 className="animate-spin" /> : 'Post to Wall'}
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hidden lg:block">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-300">
                    <Filter size={18} /> Filter Feed
                </h3>
                <div className="space-y-2">
                    {['All', 'General', 'Hype', 'Alpha', 'Meme'].map(f => (
                         <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                                filter === f ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:bg-white/5'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column: Feed */}
        <div className="lg:col-span-2 space-y-4">
            
            {/* Mobile Filter (visible only on small screens) */}
            <div className="lg:hidden flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                 {['All', 'General', 'Hype', 'Alpha', 'Meme'].map(f => (
                     <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${
                            filter === f ? 'bg-white text-black' : 'bg-white/10 text-gray-300'
                        }`}
                    >
                        {f}
                    </button>
                 ))}
            </div>

            {filteredMessages.map((msg) => (
                <div key={msg.id} className="bg-club-dark border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div 
                                onClick={() => onProfileClick(msg.sender)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold cursor-pointer hover:scale-105 transition-transform ${
                                msg.isVerified ? 'bg-club-gold text-black' : 'bg-white/10 text-gray-400'
                            }`}>
                                {msg.sender[0].toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={() => onProfileClick(msg.sender)}
                                        className={`font-bold hover:underline ${msg.isVerified ? 'text-club-gold' : 'text-white'}`}
                                    >
                                        {msg.sender}
                                    </button>
                                    {msg.isVerified && <ShieldCheck size={14} className="text-club-gold" />}
                                </div>
                                <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                            </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${
                            msg.tag === 'Alpha' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' :
                            msg.tag === 'Hype' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                            msg.tag === 'Meme' ? 'border-orange-500/30 text-orange-400 bg-orange-500/10' :
                            'border-gray-500/30 text-gray-400 bg-gray-500/10'
                        }`}>
                            {msg.tag}
                        </span>
                    </div>

                    <p className="text-gray-200 text-base leading-relaxed mb-4 whitespace-pre-wrap">
                        {msg.text}
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                        <button 
                            onClick={() => handleLike(msg.id)}
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-club-accent transition-colors group"
                        >
                            <ThumbsUp size={16} className="group-hover:scale-110 transition-transform" />
                            <span>{msg.likes}</span>
                        </button>
                        <button className="text-sm text-gray-500 hover:text-white transition-colors">
                            Reply
                        </button>
                        <button className="text-sm text-gray-500 hover:text-white transition-colors ml-auto">
                            Share
                        </button>
                    </div>
                </div>
            ))}

            {filteredMessages.length === 0 && (
                <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/5 border-dashed">
                    <p className="text-gray-500">No messages found in this category.</p>
                </div>
            )}
            
        </div>

      </div>
    </div>
  );
};

export default CommunityChat;