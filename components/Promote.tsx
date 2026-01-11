import React, { useState, useEffect } from 'react';
import { Flame, Clock, TrendingUp, ExternalLink, AlertTriangle, Send, Trophy, Megaphone, User, History, Loader2 } from 'lucide-react';

interface Bid {
  id: string;
  user: string;
  amount: number;
  message: string;
  timestamp: number;
}

const Promote: React.FC = () => {
  const [currentBid, setCurrentBid] = useState<string>('');
  const [promoMessage, setPromoMessage] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 1 hour in seconds
  const [isBidding, setIsBidding] = useState(false);
  
  // Mock State
  const [highestBid, setHighestBid] = useState<number>(50000);
  const totalBurned = 4250000;
  
  const [recentBids, setRecentBids] = useState<Bid[]>([
    { id: '1', user: 'Whale_0x99', amount: 45000, message: 'Join the $TWCB raid now!', timestamp: Date.now() - 100000 },
    { id: '2', user: 'SolanaKing', amount: 32000, message: 'HODL strong fam', timestamp: Date.now() - 250000 },
    { id: '3', user: 'BiggsFan', amount: 15000, message: 'W Club for life', timestamp: Date.now() - 500000 },
  ]);

  // Previous winner mock data
  const previousWinner = {
    user: 'NFT_God_Sol',
    message: 'Just swept the floor on MagicEden! 🧹 Check my wallet.',
    amount: 48500,
    timestamp: Date.now() - 7200000 // ~2 hours ago
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBid = async () => {
    if (!currentBid || !promoMessage) return;
    const amount = parseInt(currentBid.replace(/,/g, ''));
    
    if (amount > highestBid) {
      setIsBidding(true);
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      setHighestBid(amount);
      const newBid: Bid = {
        id: Date.now().toString(),
        user: 'You (Pending)',
        amount: amount,
        message: promoMessage,
        timestamp: Date.now()
      };
      setRecentBids(prev => [newBid, ...prev]);
      setCurrentBid('');
      setPromoMessage('');
      setIsBidding(false);
      
      // In a real app, this would trigger a wallet transaction to burn tokens
      alert(`🔥 BURN INITIATED: ${amount.toLocaleString()} $TWCB being sent to dead address.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Flame className="text-orange-500 animate-pulse" size={40} />
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              Burn to Promote
            </span>
            <Flame className="text-orange-500 animate-pulse" size={40} />
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Bid and burn $TWCB to claim the Featured Slot for 1 hour. 
          Deflationary marketing for the community.
        </p>
      </div>

      {/* Prominent Total Burned Counter */}
      <div className="relative mb-16 mx-auto max-w-4xl transform hover:scale-[1.01] transition-transform duration-300">
        <div className="absolute inset-0 bg-orange-600/10 blur-2xl rounded-full animate-pulse"></div>
        <div className="relative bg-gradient-to-r from-orange-900/40 via-red-900/40 to-orange-900/40 border border-orange-500/30 rounded-3xl p-8 text-center backdrop-blur-sm shadow-[0_0_50px_rgba(234,88,12,0.15)]">
            <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-orange-300 font-bold tracking-[0.2em] text-sm uppercase mb-2 flex items-center gap-2">
                    <span className="w-12 h-[1px] bg-orange-500/50"></span>
                    Total $TWCB Burned Forever
                    <span className="w-12 h-[1px] bg-orange-500/50"></span>
                </p>
                <div className="text-5xl md:text-8xl font-black text-white flex flex-wrap items-center justify-center gap-2 md:gap-6 filter drop-shadow-[0_0_15px_rgba(234,88,12,0.6)] font-mono">
                     <Flame size={48} className="text-orange-500 animate-bounce hidden md:block" />
                     {totalBurned.toLocaleString()}
                     <Flame size={48} className="text-orange-500 animate-bounce hidden md:block" />
                </div>
                <p className="text-red-400/80 text-sm mt-2 italic">Deflation in action. Every bid reduces supply.</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Active Slot & Action */}
        <div className="space-y-8">
          
          {/* Active Featured Slot */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-club-gold to-club-accent rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative bg-club-dark border border-club-gold/30 rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 bg-club-gold text-black text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1">
                    <Megaphone size={12} /> LIVE NOW
                </div>
                
                <h3 className="text-gray-400 text-sm uppercase tracking-wider mb-4">Current Featured Spot</h3>
                
                <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border-2 border-club-gold">
                        <User className="text-club-gold" size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white">@AlphaCaller_Sol</h4>
                        <p className="text-club-accent mt-2 text-lg">
                            "The W Club is taking over! Join the discord before we moon! 🚀🌕"
                        </p>
                        <a href="#" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mt-3 transition-colors">
                            <ExternalLink size={14} /> View Profile
                        </a>
                    </div>
                </div>

                <div className="mt-6 bg-white/5 rounded-lg p-3 flex items-center justify-between">
                    <span className="text-sm text-gray-400">Time Remaining</span>
                    <span className="font-mono text-xl font-bold text-club-gold flex items-center gap-2">
                        <Clock size={18} /> {formatTime(timeLeft)}
                    </span>
                </div>
            </div>
          </div>

          {/* Previous Winner Slot */}
           <div className="bg-white/5 border border-white/5 rounded-xl p-4 opacity-75 grayscale hover:grayscale-0 transition-all hover:opacity-100">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-bold text-gray-500 flex items-center gap-1">
                        <History size={12} /> Previous Winner (1h ago)
                    </span>
                    <span className="text-xs font-mono text-gray-400">{previousWinner.amount.toLocaleString()} burned</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <User size={18} className="text-gray-400" />
                    </div>
                    <div>
                        <p className="font-bold text-sm text-gray-300">{previousWinner.user}</p>
                        <p className="text-xs text-gray-500 line-clamp-1">"{previousWinner.message}"</p>
                    </div>
                </div>
            </div>

          {/* Bidding Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-green-400" /> Auction for Next Slot
            </h3>

            <div className="space-y-4">
                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Current Highest Bid (To Burn)</span>
                        <span className="text-white font-bold">{highestBid.toLocaleString()} $TWCB</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                </div>

                <div className="pt-4 space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Your Message (Max 100 chars)</label>
                        <input 
                            type="text" 
                            maxLength={100}
                            value={promoMessage}
                            onChange={(e) => setPromoMessage(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Shill your bag or vibe with the club..."
                            disabled={isBidding}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1">Bid Amount ($TWCB)</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                value={currentBid}
                                onChange={(e) => setCurrentBid(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-16 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono text-lg"
                                placeholder={(highestBid + 1000).toString()}
                                disabled={isBidding}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">TWCB</span>
                        </div>
                    </div>

                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 flex items-start gap-3">
                        <AlertTriangle className="text-orange-500 flex-shrink-0 mt-0.5" size={16} />
                        <p className="text-xs text-orange-200">
                            Warning: Tokens bid are permanently burned. If you are outbid, you do not get the slot, but only the winner burns. (Simulation: In real app, bid is returned if outbid).
                        </p>
                    </div>

                    <button 
                        onClick={handleBid}
                        disabled={isBidding}
                        className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl font-bold text-white shadow-lg shadow-orange-900/20 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isBidding ? <Loader2 className="animate-spin" /> : <><Flame size={20} /> BURN & BID</>}
                    </button>
                </div>
            </div>
          </div>

        </div>

        {/* Right Column: Stats & History */}
        <div className="space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-sm text-gray-400 mb-1">24h Burned</p>
                    <p className="text-2xl font-bold font-mono text-orange-500">125K 🔥</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-sm text-gray-400 mb-1">Slots Filled</p>
                    <p className="text-2xl font-bold font-mono text-club-gold">842</p>
                </div>
            </div>

            {/* Recent Burns Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full min-h-[400px]">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Trophy className="text-club-gold" /> Recent Burners
                </h3>
                
                <div className="space-y-4">
                    {recentBids.map((bid) => (
                        <div key={bid.id} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-orange-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-gray-200">{bid.user}</span>
                                <span className="font-mono text-orange-500 font-bold flex items-center gap-1">
                                    {bid.amount.toLocaleString()} <Flame size={12} />
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 italic">"{bid.message}"</p>
                            <div className="mt-2 text-xs text-gray-600">
                                {new Date(bid.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    ))}
                    
                    {/* Placeholder for list effect */}
                    <div className="opacity-50 text-center py-4 text-sm text-gray-500">
                        ... load more history ...
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Promote;