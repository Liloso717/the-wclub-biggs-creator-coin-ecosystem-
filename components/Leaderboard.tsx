import React, { useState } from 'react';
import { Trophy, Medal, TrendingUp, Megaphone, Crown, Wallet, Activity, Gift } from 'lucide-react';

interface LeaderboardProps {
    onProfileClick: (username: string) => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ onProfileClick }) => {
  const [network, setNetwork] = useState<'SOL' | 'BASE'>('SOL');

  // Mock Data for Solana ($TWCB)
  const solHolders = [
    { rank: 1, address: '8xF3...9a2B', amount: '15,000,000', change: 0 },
    { rank: 2, address: '4kL9...m2Xp', amount: '12,450,000', change: 1 },
    { rank: 3, address: '9pQ1...z8R4', amount: '9,200,000', change: -1 },
    { rank: 4, address: '2mN5...k7Y1', amount: '8,100,000', change: 2 },
    { rank: 5, address: '5hJ8...v3C6', amount: '7,500,000', change: 0 },
  ];

  const solVolume = [
    { rank: 1, address: 'Trader_Whale', volume: '$452,000', change: 2 },
    { rank: 2, address: 'SolanaSniper', volume: '$380,500', change: -1 },
    { rank: 3, address: 'DiamondHands', volume: '$210,000', change: 0 },
    { rank: 4, address: 'W_Club_OG', volume: '$195,000', change: 4 },
    { rank: 5, address: 'DegenLife', volume: '$150,000', change: -2 },
  ];

  const solTippers = [
    { rank: 1, address: 'Generous_Whale', amount: '50,000', change: 1 },
    { rank: 2, address: 'Charity_Dao', amount: '35,000', change: 0 },
    { rank: 3, address: 'Community_Lead', amount: '25,000', change: 2 },
    { rank: 4, address: 'Biggs_Helper', amount: '15,000', change: -1 },
    { rank: 5, address: 'W_Giver', amount: '10,000', change: 0 },
  ];

  // Mock Data for Base ($THEWCLUBBIGGS)
  const baseHolders = [
    { rank: 1, address: '0x71...9e21', amount: '8,400,000', change: 0 },
    { rank: 2, address: '0x3a...b1c4', amount: '6,250,000', change: 2 },
    { rank: 3, address: '0x9c...f2d9', amount: '5,100,000', change: -1 },
    { rank: 4, address: '0x2b...a8e3', amount: '4,800,000', change: 1 },
    { rank: 5, address: '0x5d...c7f6', amount: '3,900,000', change: 0 },
  ];

  const baseVolume = [
    { rank: 1, address: 'BaseGod_01', volume: '$152,000', change: 1 },
    { rank: 2, address: 'L2_Enjoyer', volume: '$98,500', change: -1 },
    { rank: 3, address: 'Coinbase_Chad', volume: '$87,000', change: 2 },
    { rank: 4, address: 'Eth_Maxi_Convert', volume: '$65,000', change: 0 },
    { rank: 5, address: 'Blue_Dot_Whale', volume: '$50,000', change: -2 },
  ];

  const baseTippers = [
    { rank: 1, address: 'Base_Angel', amount: '20,000', change: 0 },
    { rank: 2, address: 'L2_Donor', amount: '18,500', change: 1 },
    { rank: 3, address: 'Early_Adopter', amount: '12,000', change: 3 },
    { rank: 4, address: 'W_Club_Base', amount: '8,000', change: -1 },
    { rank: 5, address: 'Supporter_01', amount: '5,000', change: 0 },
  ];

  const topPromoters = [
    { rank: 1, handle: '@CryptoKing_W', points: '15,400', level: 'Legend' },
    { rank: 2, handle: '@BiggsFan01', points: '12,200', level: 'Diamond' },
    { rank: 3, handle: '@SolanaRaider', points: '10,150', level: 'Platinum' },
    { rank: 4, handle: '@ClubMember88', points: '9,800', level: 'Gold' },
    { rank: 5, handle: '@BasedBiggs', points: '8,500', level: 'Gold' },
  ];

  const currentHolders = network === 'SOL' ? solHolders : baseHolders;
  const currentVolume = network === 'SOL' ? solVolume : baseVolume;
  const currentTippers = network === 'SOL' ? solTippers : baseTippers;
  const tokenSymbol = network === 'SOL' ? '$TWCB' : '$THEWCLUBBIGGS';
  const themeColor = network === 'SOL' ? 'text-blue-400' : 'text-purple-400';
  const themeBorder = network === 'SOL' ? 'hover:border-blue-400/30' : 'hover:border-purple-400/30';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 fade-in">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Community Leaderboard
            </span>
        </h2>
        <p className="text-gray-400">Recognizing the legends of The W Club</p>
      </div>

      {/* Network Toggle */}
      <div className="flex justify-center mb-12">
        <div className="bg-white/10 p-1 rounded-xl flex gap-1 border border-white/5">
            <button
                onClick={() => setNetwork('SOL')}
                className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                    network === 'SOL' 
                    ? 'bg-club-accent text-black shadow-lg shadow-cyan-900/20' 
                    : 'text-gray-400 hover:text-white'
                }`}
            >
                Solana ($TWCB)
            </button>
            <button
                onClick={() => setNetwork('BASE')}
                className={`px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                    network === 'BASE' 
                    ? 'bg-club-purple text-white shadow-lg shadow-purple-900/20' 
                    : 'text-gray-400 hover:text-white'
                }`}
            >
                Base ($THEWCLUBBIGGS)
            </button>
        </div>
      </div>

      {/* Bag Worker of the Month Spotlight */}
      <div 
        className="mb-16 relative cursor-pointer group"
        onClick={() => onProfileClick("BasedChad_99")}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-club-purple via-club-accent to-club-gold opacity-20 blur-3xl rounded-3xl group-hover:opacity-30 transition-opacity"></div>
        <div className="relative bg-white/5 border border-club-gold/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 overflow-hidden group-hover:border-club-gold/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 bg-club-gold text-club-dark font-bold rounded-bl-2xl shadow-lg">
                🏆 BAG WORKER OF THE MONTH
            </div>
            
            <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-club-gold shadow-[0_0_30px_rgba(255,215,0,0.5)] overflow-hidden bg-club-dark flex items-center justify-center">
                    <Crown size={64} className="text-club-gold animate-pulse" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-club-accent text-club-dark text-xs font-bold px-3 py-1 rounded-full border border-white">
                    LVL 99
                </div>
            </div>

            <div className="text-center md:text-left flex-1">
                <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-club-gold transition-colors">BasedChad_99</h3>
                <p className="text-club-gold text-lg mb-4 font-medium">"The Raid General"</p>
                <p className="text-gray-300 max-w-xl">
                    Awarded for relentless community engagement, organizing 50+ raids on X, and onboarding 200+ new holders this month. A true pillar of the $TWCB ecosystem.
                </p>
                <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/10">
                        <span className="text-gray-400 text-xs uppercase block">Reward</span>
                        <span className="text-club-accent font-bold">100k {tokenSymbol}</span>
                    </div>
                    <div className="px-4 py-2 bg-white/10 rounded-lg border border-white/10">
                        <span className="text-gray-400 text-xs uppercase block">Raid Points</span>
                        <span className="text-green-400 font-bold">+50,000 XP</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Leaderboard Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Most Held */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <Wallet className={themeColor} />
                <h3 className="text-xl font-bold">Most Held ({tokenSymbol})</h3>
            </div>
            <div className="space-y-4">
                {currentHolders.map((item, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => onProfileClick(item.address)}
                        className={`flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 ${themeBorder} transition-colors cursor-pointer group`}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                                item.rank === 1 ? 'bg-yellow-500 text-black' : 
                                item.rank === 2 ? 'bg-gray-400 text-black' : 
                                item.rank === 3 ? 'bg-orange-700 text-white' : 'bg-white/10 text-gray-400'
                            }`}>
                                {item.rank}
                            </span>
                            <span className="font-mono text-sm text-gray-200 group-hover:text-white group-hover:underline">{item.address}</span>
                        </div>
                        <span className={`font-bold ${themeColor}`}>{item.amount}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Most Volume */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <Activity className="text-green-400" />
                <h3 className="text-xl font-bold">Top Volume (24h)</h3>
            </div>
            <div className="space-y-4">
                {currentVolume.map((item, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => onProfileClick(item.address)}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-green-400/30 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                                item.rank === 1 ? 'bg-yellow-500 text-black' : 
                                item.rank === 2 ? 'bg-gray-400 text-black' : 
                                item.rank === 3 ? 'bg-orange-700 text-white' : 'bg-white/10 text-gray-400'
                            }`}>
                                {item.rank}
                            </span>
                            <span className="font-medium text-sm text-gray-200 group-hover:text-white group-hover:underline">{item.address}</span>
                        </div>
                        <span className="font-bold text-green-400">{item.volume}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Most Promoted */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <Megaphone className="text-pink-500" />
                <h3 className="text-xl font-bold">Top Promoters</h3>
            </div>
            <div className="space-y-4">
                {topPromoters.map((item, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => onProfileClick(item.handle)}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-pink-500/30 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                                item.rank === 1 ? 'bg-yellow-500 text-black' : 
                                item.rank === 2 ? 'bg-gray-400 text-black' : 
                                item.rank === 3 ? 'bg-orange-700 text-white' : 'bg-white/10 text-gray-400'
                            }`}>
                                {item.rank}
                            </span>
                            <div className="flex flex-col">
                                <span className="font-medium text-sm text-gray-200 group-hover:text-white group-hover:underline">{item.handle}</span>
                                <span className="text-[10px] text-gray-500 uppercase">{item.level}</span>
                            </div>
                        </div>
                        <span className="font-bold text-pink-500">{item.points}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* Top Tippers */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-3 mb-6">
                <Gift className="text-indigo-400" />
                <h3 className="text-xl font-bold">Top Tippers</h3>
            </div>
            <div className="space-y-4">
                {currentTippers.map((item, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => onProfileClick(item.address)}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-400/30 transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-3">
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                                item.rank === 1 ? 'bg-yellow-500 text-black' : 
                                item.rank === 2 ? 'bg-gray-400 text-black' : 
                                item.rank === 3 ? 'bg-orange-700 text-white' : 'bg-white/10 text-gray-400'
                            }`}>
                                {item.rank}
                            </span>
                            <span className="font-mono text-sm text-gray-200 group-hover:text-white group-hover:underline">{item.address}</span>
                        </div>
                        <span className="font-bold text-indigo-400">{item.amount}</span>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;