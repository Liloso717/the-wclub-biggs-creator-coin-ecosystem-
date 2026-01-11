import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, Zap, Clock, CheckCircle, AlertCircle, DollarSign, Vote, ArrowUp, ArrowDown, Loader2 } from 'lucide-react';

type MarketTab = 'opinion' | 'prediction' | 'flash';
type Network = 'SOL' | 'BASE';

const PredictionMarkets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MarketTab>('prediction');
  const [network, setNetwork] = useState<Network>('SOL');
  const [userBalance, setUserBalance] = useState(10000);
  const [isBetting, setIsBetting] = useState(false);

  const tokenSymbol = network === 'SOL' ? '$TWCB' : '$THEWCLUBBIGGS';
  const themeColor = network === 'SOL' ? 'text-club-accent' : 'text-club-purple';
  const themeBg = network === 'SOL' ? 'bg-club-accent' : 'bg-club-purple';

  // --- FLASH MARKET LOGIC ---
  const [flashTimeLeft, setFlashTimeLeft] = useState(300); // 5 minutes
  const [flashRound, setFlashRound] = useState(1);
  const [flashHistory, setFlashHistory] = useState<('UP' | 'DOWN')[]>(['UP', 'DOWN', 'UP', 'UP', 'DOWN']);
  const [currentFlashBet, setCurrentFlashBet] = useState<'UP' | 'DOWN' | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setFlashTimeLeft(prev => {
        if (prev <= 1) {
            // Round End Logic
            setFlashRound(r => r + 1);
            const outcome = Math.random() > 0.5 ? 'UP' : 'DOWN';
            setFlashHistory(prevH => [outcome, ...prevH.slice(0, 8)]);
            setCurrentFlashBet(null);
            return 300;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleFlashBet = async (direction: 'UP' | 'DOWN') => {
      if (currentFlashBet || isBetting) return;
      
      setIsBetting(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      setCurrentFlashBet(direction);
      setUserBalance(prev => prev - 500); // Fixed bet amount for demo
      setIsBetting(false);
  };

  // --- MOCK DATA ---
  const opinions = [
    { id: 1, question: "Should we prioritize CEX listings over new utility?", yes: 65, no: 35, vol: '1.2M' },
    { id: 2, question: "Is the current meme meta bullish for $TWCB?", yes: 88, no: 12, vol: '500K' },
    { id: 3, question: "Should we increase the burn rate on transactions?", yes: 45, no: 55, vol: '2.1M' },
  ];

  const predictions = [
    { id: 1, title: "$TWCB Market Cap > $10M by End of Month?", oddsYes: 2.1, oddsNo: 1.8, end: '3d 12h', pool: '$45,000' },
    { id: 2, title: "Will Bitcoin break $100k before Q2?", oddsYes: 1.5, oddsNo: 2.5, end: '14d 5h', pool: '$120,000' },
    { id: 3, title: "Will Base outperform Solana volume this week?", oddsYes: 3.2, oddsNo: 1.2, end: '1d 2h', pool: '$12,000' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 fade-in">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              W Club Markets
            </span>
        </h2>
        <p className="text-gray-400">Trade your beliefs. Predict the future. Win tokens.</p>
        
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <DollarSign className="text-green-400" size={16} />
            <span className="text-white font-bold">Balance: {userBalance.toLocaleString()} {tokenSymbol}</span>
        </div>
      </div>

      {/* Network Toggle */}
      <div className="flex justify-center mb-8">
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

      {/* Tab Nav */}
      <div className="flex justify-center mb-10 border-b border-white/10">
          <button 
            onClick={() => setActiveTab('prediction')}
            className={`px-6 py-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'prediction' ? 'border-blue-500 text-blue-500' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <TrendingUp size={18} /> Prediction Markets
          </button>
          <button 
            onClick={() => setActiveTab('opinion')}
            className={`px-6 py-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'opinion' ? 'border-pink-500 text-pink-500' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <Vote size={18} /> Opinion Polls
          </button>
          <button 
            onClick={() => setActiveTab('flash')}
            className={`px-6 py-3 font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'flash' ? 'border-club-gold text-club-gold' : 'border-transparent text-gray-500 hover:text-white'}`}
          >
            <Zap size={18} /> Flash Markets
          </button>
      </div>

      {/* CONTENT AREA */}
      
      {/* --- PREDICTION MARKETS --- */}
      {activeTab === 'prediction' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {predictions.map((market) => (
                <div key={market.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">{market.title}</h3>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center cursor-pointer hover:bg-green-500/20 transition-colors">
                            <span className="block text-green-400 font-bold text-sm">YES</span>
                            <span className="block text-white font-mono text-lg">x{market.oddsYes}</span>
                        </div>
                        <div className="flex-1 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center cursor-pointer hover:bg-red-500/20 transition-colors">
                            <span className="block text-red-400 font-bold text-sm">NO</span>
                            <span className="block text-white font-mono text-lg">x{market.oddsNo}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/5 pt-4">
                        <span className="flex items-center gap-1"><Clock size={12} /> Ends: {market.end}</span>
                        <span className="flex items-center gap-1"><Activity size={12} /> Vol: {market.pool}</span>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* --- OPINION MARKETS --- */}
      {activeTab === 'opinion' && (
        <div className="space-y-4 max-w-4xl mx-auto">
             {opinions.map((poll) => (
                 <div key={poll.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                         <h3 className="text-xl font-bold">{poll.question}</h3>
                         <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">Vol: {poll.vol}</span>
                    </div>

                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden mb-4">
                        <div className="absolute left-0 top-0 h-full bg-pink-500" style={{ width: `${poll.yes}%` }}></div>
                    </div>

                    <div className="flex justify-between items-center text-sm mb-6">
                        <span className="text-pink-400 font-bold">{poll.yes}% YES</span>
                        <span className="text-gray-400 font-bold">{poll.no}% NO</span>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex-1 py-2 bg-pink-500/20 text-pink-500 border border-pink-500 rounded-xl font-bold hover:bg-pink-500 hover:text-white transition-colors">
                            Vote YES
                        </button>
                        <button className="flex-1 py-2 bg-gray-500/20 text-gray-400 border border-gray-500 rounded-xl font-bold hover:bg-gray-500 hover:text-white transition-colors">
                            Vote NO
                        </button>
                    </div>
                 </div>
             ))}
        </div>
      )}

      {/* --- FLASH MARKETS --- */}
      {activeTab === 'flash' && (
        <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Game Area */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</span>
                    </div>
                    
                    <div className="text-center mb-8">
                        <h3 className="text-gray-400 uppercase tracking-widest text-sm mb-2">Round {flashRound} Ends In</h3>
                        <div className={`text-6xl font-black font-mono tabular-nums ${flashTimeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                            {formatTime(flashTimeLeft)}
                        </div>
                    </div>

                    <div className="flex gap-6 mb-8">
                        <button 
                            onClick={() => handleFlashBet('UP')}
                            disabled={currentFlashBet !== null || isBetting}
                            className={`flex-1 py-8 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                                currentFlashBet === 'UP' 
                                ? 'bg-green-500 text-white border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.4)] scale-105' 
                                : currentFlashBet === 'DOWN' 
                                    ? 'bg-white/5 border-white/5 opacity-50' 
                                    : 'bg-green-500/10 border-green-500/50 text-green-400 hover:bg-green-500 hover:text-white hover:scale-105'
                            } ${isBetting && 'opacity-70 cursor-wait'}`}
                        >
                            {isBetting && !currentFlashBet ? <Loader2 className="animate-spin mb-2" size={48} /> : <ArrowUp size={48} className="mb-2" />}
                            <span className="text-2xl font-black">UP</span>
                            <span className="text-sm opacity-75">Payout 1.95x</span>
                        </button>

                        <button 
                            onClick={() => handleFlashBet('DOWN')}
                            disabled={currentFlashBet !== null || isBetting}
                            className={`flex-1 py-8 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                                currentFlashBet === 'DOWN' 
                                ? 'bg-red-500 text-white border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.4)] scale-105' 
                                : currentFlashBet === 'UP' 
                                    ? 'bg-white/5 border-white/5 opacity-50' 
                                    : 'bg-red-500/10 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white hover:scale-105'
                            } ${isBetting && 'opacity-70 cursor-wait'}`}
                        >
                            {isBetting && !currentFlashBet ? <Loader2 className="animate-spin mb-2" size={48} /> : <ArrowDown size={48} className="mb-2" />}
                            <span className="text-2xl font-black">DOWN</span>
                            <span className="text-sm opacity-75">Payout 1.95x</span>
                        </button>
                    </div>

                    {currentFlashBet && (
                        <div className="text-center p-4 bg-white/5 rounded-xl animate-in fade-in">
                            <p className="text-gray-400">Bet Placed: <span className="text-white font-bold">{currentFlashBet}</span></p>
                            <p className="text-xs text-gray-500">Wait for round timer to end.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar Stats */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="font-bold text-gray-300 mb-4 flex items-center gap-2"><Activity size={16} /> Recent History</h3>
                        <div className="flex flex-wrap gap-2">
                            {flashHistory.map((outcome, idx) => (
                                <div 
                                    key={idx} 
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                                        outcome === 'UP' ? 'bg-green-500 text-black' : 'bg-red-500 text-white'
                                    }`}
                                >
                                    {outcome === 'UP' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-club-gold/10 to-orange-500/10 border border-club-gold/20 rounded-2xl p-6">
                        <h3 className="font-bold text-club-gold mb-2">How to Play</h3>
                        <ul className="text-sm text-gray-400 space-y-2 list-disc pl-4">
                            <li>Predict if price closes UP or DOWN in 5 minutes.</li>
                            <li>Winners get 1.95x payout.</li>
                            <li>Rounds run 24/7.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
      )}

    </div>
  );
};

export default PredictionMarkets;