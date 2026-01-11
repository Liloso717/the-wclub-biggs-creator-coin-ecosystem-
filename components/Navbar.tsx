import React from 'react';
import { AppView } from '../types';
import { Home, ChartBar, MessageSquare, Trophy, Flame, Coins, Gamepad2, TrendingUp, Landmark, Gift, User } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
  onProfileClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, onProfileClick }) => {
  const navItems = [
    { view: AppView.HOME, label: 'Home', icon: <Home size={20} /> },
    { view: AppView.TOKEN, label: 'Stats', icon: <ChartBar size={20} /> },
    { view: AppView.DEFI, label: 'DeFi', icon: <Landmark size={20} /> },
    { view: AppView.MARKETS, label: 'Markets', icon: <TrendingUp size={20} /> },
    { view: AppView.EARN, label: 'Earn', icon: <Coins size={20} /> },
    { view: AppView.GAMES, label: 'Arcade', icon: <Gamepad2 size={20} /> },
    { view: AppView.TIPS, label: 'Tips', icon: <Gift size={20} /> },
    { view: AppView.PROMOTE, label: 'Promote', icon: <Flame size={20} /> },
    { view: AppView.LEADERBOARD, label: 'Leaderboard', icon: <Trophy size={20} /> },
    { view: AppView.CHAT, label: 'Club Wall', icon: <MessageSquare size={20} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-club-dark/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onChangeView(AppView.HOME)}>
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-club-gold to-club-accent bg-clip-text text-transparent">
                THE W CLUB
              </span>
            </div>
          </div>
          
          <div className="hidden xl:flex items-center gap-4">
            <div className="flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => onChangeView(item.view)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === item.view
                      ? 'bg-white/10 text-club-accent'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </div>
            
            {/* Profile Button */}
            {onProfileClick && (
                <button 
                    onClick={onProfileClick}
                    className={`ml-2 p-2 rounded-full transition-colors ${currentView === AppView.PROFILE ? 'bg-club-accent text-black' : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'}`}
                    title="My Profile"
                >
                    <User size={20} />
                </button>
            )}
          </div>
          
          {/* Mobile Menu Button (simplified) */}
          <div className="xl:hidden flex items-center gap-2">
             <div className="flex space-x-1 overflow-x-auto scrollbar-hide max-w-[70vw]">
                {navItems.map((item) => (
                    <button
                    key={item.view}
                    onClick={() => onChangeView(item.view)}
                    className={`p-2 rounded-md flex-shrink-0 ${
                        currentView === item.view ? 'text-club-accent bg-white/10' : 'text-gray-400'
                    }`}
                    >
                    {item.icon}
                    </button>
                ))}
             </div>
             {onProfileClick && (
                <button 
                    onClick={onProfileClick}
                    className={`p-2 rounded-full flex-shrink-0 ${currentView === AppView.PROFILE ? 'bg-club-accent text-black' : 'bg-white/10 text-gray-400'}`}
                >
                    <User size={20} />
                </button>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;