import React from 'react';
import { ExternalLink, Zap, Trophy, Flame, Coins, MessageSquare, Gamepad2, TrendingUp, Gift, Landmark } from 'lucide-react';
import { AppView } from '../types';

interface HeroProps {
    onNavigate: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
         <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-club-purple/20 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute -bottom-1/2 -left-1/2 w-[800px] h-[800px] bg-club-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          Welcome to the <br />
          <span className="bg-gradient-to-r from-club-gold via-orange-400 to-club-purple bg-clip-text text-transparent">
            W Club Biggs
          </span>
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-300">
          The ultimate community hub for creatives and holders. 
          Collect on Zora, and HODL on Solana & Base.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="https://phantom.com/tokens/solana/82CBWvBN7fFJiuXhb4aQouxGiKc2r79ssTYtgNPKpump?referralId=g23mrdn4peq"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full bg-club-accent text-club-dark hover:bg-cyan-300 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(34,211,238,0.5)]"
          >
            Buy $TWCB <ExternalLink size={18} />
          </a>
          
          <a 
            href="https://phantom.com/tokens/base/0xfaac6a5816f2734f231119c2cf0b16227ee83328?referralId=hjc1mwd6uu"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold rounded-full bg-club-purple text-white hover:bg-purple-600 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(107,33,168,0.5)]"
          >
            Buy $THEWCLUBBIGGS <ExternalLink size={18} />
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-club-gold/50 transition-colors cursor-pointer" onClick={() => onNavigate(AppView.TOKEN)}>
                <Zap className="w-10 h-10 text-club-gold mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Token Stats</h3>
                <p className="text-gray-400 text-sm">Track $TWCB performance on Solana in real-time.</p>
            </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-violet-500/50 transition-colors cursor-pointer" onClick={() => onNavigate(AppView.DEFI)}>
                <Landmark className="w-10 h-10 text-violet-500 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">DeFi & Liquid Staking</h3>
                <p className="text-gray-400 text-sm">Stake, Lend, and Borrow $TWCB on Solana.</p>
            </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-400/50 transition-colors cursor-pointer" onClick={() => onNavigate(AppView.EARN)}>
                <Coins className="w-10 h-10 text-green-400 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Earn & Bounty</h3>
                <p className="text-gray-400 text-sm">Complete tasks and bounties to earn rewards.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer" onClick={() => onNavigate(AppView.MARKETS)}>
                <TrendingUp className="w-10 h-10 text-blue-500 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Pro Markets</h3>
                <p className="text-gray-400 text-sm">Bet on predictions, opinion polls, and flash candles.</p>
            </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-colors cursor-pointer" onClick={() => onNavigate(AppView.GAMES)}>
                <Gamepad2 className="w-10 h-10 text-pink-500 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">W Club Arcade</h3>
                <p className="text-gray-400 text-sm">Play mini-games and compete for high scores.</p>
            </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors cursor-pointer" onClick={() => onNavigate(AppView.TIPS)}>
                <Gift className="w-10 h-10 text-indigo-500 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Send Tips</h3>
                <p className="text-gray-400 text-sm">Send tokens to community members instantly.</p>
            </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-club-accent/50 transition-colors cursor-pointer" onClick={() => onNavigate(AppView.CHAT)}>
                <MessageSquare className="w-10 h-10 text-club-accent mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">Community Wall</h3>
                <p className="text-gray-400 text-sm">Drop alpha, memes, and chat with holders.</p>
            </div>
             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors cursor-pointer" onClick={() => onNavigate(AppView.PROMOTE)}>
                <Flame className="w-10 h-10 text-orange-500 mb-4 mx-auto animate-pulse" />
                <h3 className="text-xl font-bold mb-2">Burn & Promote</h3>
                <p className="text-gray-400 text-sm">Burn tokens to get featured on the dashboard.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;