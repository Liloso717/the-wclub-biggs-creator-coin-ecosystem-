import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TokenStats from './components/TokenStats';
import CommunityChat from './components/CommunityChat';
import Leaderboard from './components/Leaderboard';
import Promote from './components/Promote';
import Earn from './components/Earn';
import MiniGames from './components/MiniGames';
import PredictionMarkets from './components/PredictionMarkets';
import DeFi from './components/DeFi';
import Tips from './components/Tips';
import OnboardingTour from './components/OnboardingTour';
import UserProfile from './components/UserProfile';
import { AppView } from './types';
import { Youtube, Globe, ShoppingBag } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [viewProfileUser, setViewProfileUser] = useState<string | null>(null);

  const handleProfileClick = (username: string) => {
    setViewProfileUser(username);
    setCurrentView(AppView.PROFILE);
  };

  const handleBackFromProfile = () => {
    // Basic back navigation - returns to leaderboard if that was previous, 
    // but for simplicity here we just go back to home or could implement a history stack.
    // For now, let's just go Home to ensure clean state, or ideally we'd track 'previousView'.
    setCurrentView(AppView.HOME); 
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.HOME:
        return <Hero onNavigate={setCurrentView} />;
      case AppView.TOKEN:
        return <TokenStats />;
      case AppView.DEFI:
        return <DeFi />;
      case AppView.MARKETS:
        return <PredictionMarkets />;
      case AppView.EARN:
        return <Earn />;
      case AppView.GAMES:
        return <MiniGames />;
      case AppView.TIPS:
        return <Tips />;
      case AppView.PROMOTE:
        return <Promote />;
      case AppView.LEADERBOARD:
        return <Leaderboard onProfileClick={handleProfileClick} />;
      case AppView.CHAT:
        return <CommunityChat onProfileClick={handleProfileClick} />;
      case AppView.PROFILE:
        return <UserProfile username={viewProfileUser} onBack={handleBackFromProfile} />;
      default:
        return <Hero onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-club-dark text-white font-sans selection:bg-club-accent selection:text-black">
      <OnboardingTour />
      <Navbar currentView={currentView} onChangeView={setCurrentView} onProfileClick={() => handleProfileClick('You')} />
      
      <main className="fade-in">
        {renderView()}
      </main>

      <footer className="border-t border-white/10 mt-12 py-8 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6">
             {/* X (Twitter) */}
             <a 
                href="https://x.com/thewclubbiggs" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-all text-gray-400"
                title="Follow on X"
             >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
             </a>
             
             {/* YouTube */}
             <a 
                href="https://www.youtube.com/@wclubbiggs?si=XzD1qJGn1NwqkGYo" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-red-600/20 hover:text-red-500 transition-all text-gray-400"
                title="Subscribe on YouTube"
             >
                <Youtube size={22} />
             </a>
             
             {/* TikTok */}
             <a 
                href="https://www.tiktok.com/@thewclubbiggs" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-pink-600/20 hover:text-pink-400 transition-all text-gray-400"
                title="Follow on TikTok"
             >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
             </a>
             
             {/* Zora */}
             <a 
                href="https://zora.co/@thewclubbiggs" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-blue-600/20 hover:text-blue-400 transition-all text-gray-400"
                title="Collect on Zora"
             >
                <Globe size={22} />
             </a>

             {/* Merch (Printify) */}
             <a 
                href="https://wclubbiggs.printify.me/" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/5 hover:bg-green-600/20 hover:text-green-400 transition-all text-gray-400"
                title="Shop Merch"
             >
                <ShoppingBag size={22} />
             </a>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} The W Club Biggs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;