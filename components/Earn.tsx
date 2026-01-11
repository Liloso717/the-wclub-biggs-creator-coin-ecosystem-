import React, { useState, useEffect } from 'react';
import { Share2, BookOpen, Briefcase, CheckCircle, Clock, PlusCircle, Coins, ExternalLink, ChevronRight, Award, Youtube, Globe, Loader2 } from 'lucide-react';

type Tab = 'social' | 'learn' | 'bounty';
type Network = 'SOL' | 'BASE';

interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: number;
  creator: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
  applicants: number;
}

const Earn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('social');
  const [network, setNetwork] = useState<Network>('SOL');
  const [showCreateBounty, setShowCreateBounty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const tokenSymbol = network === 'SOL' ? '$TWCB' : '$THEWCLUBBIGGS';
  const themeColorText = network === 'SOL' ? 'text-club-accent' : 'text-club-purple';
  
  // Mock Bounty Data
  const [bounties, setBounties] = useState<Bounty[]>([
    { id: '1', title: 'Create a viral TikTok', description: 'Make a funny video about the token hitting 10M MC. Must use the club audio.', reward: 50000, creator: '@MarketingLead', status: 'OPEN', applicants: 12 },
    { id: '2', title: 'Translate Whitepaper', description: 'Translate our one-pager into Spanish and Japanese.', reward: 25000, creator: '@DevTeam', status: 'IN_PROGRESS', applicants: 3 },
    { id: '3', title: 'Discord Mod (Night Shift)', description: 'Looking for a mod active during UTC+8 to UTC+12.', reward: 100000, creator: '@CommunityMgr', status: 'OPEN', applicants: 45 },
  ]);

  // Form State
  const [newBounty, setNewBounty] = useState({ title: '', description: '', reward: '' });

  const handleCreateBounty = async () => {
    if (!newBounty.title || !newBounty.reward) return;
    
    setIsSubmitting(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const bounty: Bounty = {
      id: Date.now().toString(),
      title: newBounty.title,
      description: newBounty.description,
      reward: parseInt(newBounty.reward),
      creator: '@You', // In real app, get from wallet
      status: 'OPEN',
      applicants: 0
    };
    setBounties([bounty, ...bounties]);
    setNewBounty({ title: '', description: '', reward: '' });
    setShowCreateBounty(false);
    setIsSubmitting(false);
  };

  const learnModules = {
    SOL: [
        { title: 'Intro to $TWCB', desc: 'Understand the tokenomics and vision on Solana.', reward: '500', time: '5 min', color: 'from-blue-500 to-cyan-500' },
        { title: 'Phantom Wallet 101', desc: 'How to secure your assets on Solana.', reward: '1000', time: '10 min', color: 'from-emerald-500 to-teal-500' },
        { title: 'NFT Staking on Sol', desc: 'Maximize your yield by staking Biggs.', reward: '750', time: '8 min', color: 'from-orange-500 to-red-500' },
    ],
    BASE: [
        { title: 'Intro to $THEWCLUBBIGGS', desc: 'The vision for our Base Layer 2 expansion.', reward: '500', time: '5 min', color: 'from-blue-600 to-indigo-600' },
        { title: 'Bridging to Base', desc: 'Move ETH from Mainnet to Base cheaply.', reward: '1000', time: '10 min', color: 'from-purple-500 to-pink-500' },
        { title: 'Uniswap on Base', desc: 'How to provide liquidity and earn fees.', reward: '750', time: '8 min', color: 'from-pink-500 to-rose-500' },
    ]
  };

  const socialTasks = [
    { 
        title: 'Follow @thewclubbiggs on X', 
        reward: 500, 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
        link: 'https://x.com/thewclubbiggs'
    },
    { 
        title: 'Subscribe on YouTube', 
        reward: 500, 
        icon: <Youtube className="text-red-500" size={20} />, 
        link: 'https://www.youtube.com/@wclubbiggs?si=XzD1qJGn1NwqkGYo'
    },
    { 
        title: 'Follow on TikTok', 
        reward: 500, 
        icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-pink-500"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>, 
        link: 'https://www.tiktok.com/@thewclubbiggs'
    },
    { 
        title: 'Collect on Zora', 
        reward: 1000, 
        icon: <Globe className="text-blue-400" size={20} />, 
        link: 'https://zora.co/@thewclubbiggs'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 fade-in">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-club-accent to-blue-500 bg-clip-text text-transparent">
              Earn & Build
            </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Complete tasks, learn about the ecosystem, or contribute to community bounties to earn tokens.
        </p>
      </div>

      {/* Network Toggle */}
      <div className="flex justify-center mb-10">
        <div className="bg-white/10 p-1 rounded-xl flex gap-1 border border-white/5">
            <button
                onClick={() => setNetwork('SOL')}
                className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                    network === 'SOL' 
                    ? 'bg-club-accent text-black shadow-lg shadow-cyan-900/20' 
                    : 'text-gray-400 hover:text-white'
                }`}
            >
                Earn $TWCB (SOL)
            </button>
            <button
                onClick={() => setNetwork('BASE')}
                className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                    network === 'BASE' 
                    ? 'bg-club-purple text-white shadow-lg shadow-purple-900/20' 
                    : 'text-gray-400 hover:text-white'
                }`}
            >
                Earn $THEWCLUBBIGGS (BASE)
            </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="bg-white/10 p-1 rounded-xl flex gap-1 border border-white/5">
            <button onClick={() => setActiveTab('social')} className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'social' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Share2 size={18} /> Social Tasks
            </button>
            <button onClick={() => setActiveTab('learn')} className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'learn' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <BookOpen size={18} /> Learn to Earn
            </button>
            <button onClick={() => setActiveTab('bounty')} className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${activeTab === 'bounty' ? 'bg-club-gold text-black shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Briefcase size={18} /> Bounty Board
            </button>
        </div>
      </div>

      {/* SOCIAL TASKS VIEW */}
      {activeTab === 'social' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {socialTasks.map((task, i) => (
                <div key={i} className={`bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between transition-colors group ${network === 'SOL' ? 'hover:border-club-accent/50' : 'hover:border-club-purple/50'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 bg-white/5 rounded-full transition-colors ${network === 'SOL' ? 'group-hover:bg-club-accent/20' : 'group-hover:bg-club-purple/20'}`}>
                            {task.icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-white">{task.title}</h3>
                            <p className="text-sm text-gray-400">Reward: <span className={`${themeColorText} font-bold`}>{task.reward} {tokenSymbol}</span></p>
                        </div>
                    </div>
                    <a 
                        href={task.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${network === 'SOL' ? 'bg-club-accent text-black hover:bg-cyan-300' : 'bg-club-purple text-white hover:bg-purple-600'}`}
                    >
                        Visit
                    </a>
                </div>
            ))}
        </div>
      )}

      {/* LEARN TO EARN VIEW */}
      {activeTab === 'learn' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {learnModules[network].map((lesson, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-club-dark hover:-translate-y-2 transition-transform duration-300">
                    <div className={`h-32 bg-gradient-to-br ${lesson.color} relative`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute bottom-4 left-6">
                            <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/20 flex items-center gap-1 w-fit">
                                <Clock size={12} /> {lesson.time}
                            </span>
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                        <p className="text-gray-400 text-sm mb-6">{lesson.desc}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-club-gold font-bold">
                                <Coins size={16} /> {lesson.reward} {tokenSymbol}
                            </div>
                            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                <ChevronRight />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* BOUNTY BOARD VIEW */}
      {activeTab === 'bounty' && (
        <div className="max-w-5xl mx-auto">
            
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Briefcase className="text-club-gold" /> Active Bounties ({network})
                </h3>
                <button 
                    onClick={() => setShowCreateBounty(!showCreateBounty)}
                    className="flex items-center gap-2 px-6 py-2 bg-club-gold text-black rounded-xl font-bold hover:bg-yellow-400 transition-colors"
                >
                    {showCreateBounty ? 'Cancel' : 'Create Bounty'} <PlusCircle size={18} />
                </button>
            </div>

            {/* Create Bounty Form */}
            {showCreateBounty && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 animate-in slide-in-from-top-4">
                    <h4 className="font-bold text-lg mb-4">Post a Community Bounty</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input 
                            type="text" 
                            placeholder="Task Title (e.g. Create a Meme)" 
                            value={newBounty.title}
                            onChange={e => setNewBounty({...newBounty, title: e.target.value})}
                            className={`bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ${network === 'SOL' ? 'focus:ring-club-accent' : 'focus:ring-club-purple'}`}
                            disabled={isSubmitting}
                        />
                         <div className="relative">
                            <input 
                                type="number" 
                                placeholder="Reward Amount" 
                                value={newBounty.reward}
                                onChange={e => setNewBounty({...newBounty, reward: e.target.value})}
                                className={`w-full bg-black/30 border border-white/10 rounded-xl pl-4 pr-16 py-3 text-white focus:outline-none focus:ring-2 ${network === 'SOL' ? 'focus:ring-club-accent' : 'focus:ring-club-purple'}`}
                                disabled={isSubmitting}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-bold">{tokenSymbol}</span>
                        </div>
                    </div>
                    <textarea 
                        placeholder="Detailed description of what needs to be done..." 
                        value={newBounty.description}
                        onChange={e => setNewBounty({...newBounty, description: e.target.value})}
                        className={`w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 ${network === 'SOL' ? 'focus:ring-club-accent' : 'focus:ring-club-purple'} min-h-[100px] mb-4`}
                        disabled={isSubmitting}
                    />
                    <button 
                        onClick={handleCreateBounty}
                        disabled={isSubmitting}
                        className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${network === 'SOL' ? 'bg-club-accent text-black hover:bg-cyan-300' : 'bg-club-purple text-white hover:bg-purple-600'} disabled:opacity-70`}
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Post Bounty'}
                    </button>
                </div>
            )}

            {/* Bounty List */}
            <div className="space-y-4">
                {bounties.map((bounty) => (
                    <div key={bounty.id} className={`bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors ${network === 'SOL' ? 'hover:border-club-accent/30' : 'hover:border-club-purple/30'}`}>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-xl font-bold text-white">{bounty.title}</h4>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                    bounty.status === 'OPEN' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                                    bounty.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                                }`}>
                                    {bounty.status.replace('_', ' ')}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-3">{bounty.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Posted by <span className="text-white">{bounty.creator}</span></span>
                                <span>•</span>
                                <span>{bounty.applicants} Applicants</span>
                            </div>
                        </div>
                        
                        <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 min-w-[140px]">
                            <div className="text-right">
                                <span className="block text-xs text-gray-400 uppercase">Reward</span>
                                <span className={`text-xl font-bold font-mono ${themeColorText}`}>{bounty.reward.toLocaleString()} {tokenSymbol}</span>
                            </div>
                            <button className={`px-6 py-2 border rounded-lg font-bold transition-all w-full md:w-auto ${network === 'SOL' ? 'bg-club-accent/10 hover:bg-club-accent hover:text-black border-club-accent/50 text-club-accent' : 'bg-club-purple/10 hover:bg-club-purple hover:text-white border-club-purple/50 text-club-purple'}`}>
                                Apply
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      )}

    </div>
  );
};

export default Earn;