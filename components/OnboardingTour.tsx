import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Zap, MessageSquare, Coins, Rocket, Landmark } from 'lucide-react';

const TOUR_KEY = 'wclub_tour_completed_v1';

const OnboardingTour: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem(TOUR_KEY);
    if (!hasSeenTour) {
      // Small delay to allow app to load before showing tour
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(TOUR_KEY, 'true');
  };

  const steps = [
    {
      title: "Welcome to The W Club",
      description: "The ultimate hub for $TWCB holders. Connect, earn, and grow your bags on Solana & Base.",
      icon: <Rocket size={48} className="text-club-gold" />,
      color: "from-club-gold to-orange-500"
    },
    {
      title: "Track & Analyze",
      description: "Get real-time token stats for both chains. Check the 'Stats' tab for charts and holder data.",
      icon: <Zap size={48} className="text-club-accent" />,
      color: "from-cyan-400 to-blue-500"
    },
    {
      title: "DeFi & Staking",
      description: "Put your $TWCB to work. Visit the 'DeFi' tab to liquid stake for yield or borrow against your assets.",
      icon: <Landmark size={48} className="text-violet-500" />,
      color: "from-violet-500 to-fuchsia-500"
    },
    {
      title: "Connect & Vibe",
      description: "Chat on the Community Wall, send Tips to friends, and check the Leaderboard for top holders.",
      icon: <MessageSquare size={48} className="text-pink-500" />,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Earn Rewards",
      description: "Complete bounties, learn about the ecosystem, or play mini-games to earn tokens.",
      icon: <Coins size={48} className="text-green-400" />,
      color: "from-green-400 to-emerald-600"
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-club-dark border border-white/10 rounded-3xl p-1 overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        
        {/* Progress Bar Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
        {/* Active Progress */}
        <div 
          className={`absolute top-0 left-0 h-1 bg-gradient-to-r ${step.color} transition-all duration-300`}
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />

        <div className="bg-white/5 rounded-[22px] p-8 relative">
          
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="flex flex-col items-center text-center space-y-6 mt-4">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} p-[2px] shadow-[0_0_30px_rgba(0,0,0,0.5)]`}>
                <div className="w-full h-full bg-club-dark rounded-full flex items-center justify-center">
                    {step.icon}
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                <p className="text-gray-400 leading-relaxed text-sm">
                    {step.description}
                </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between w-full pt-4">
                <div className="flex gap-1">
                    {steps.map((_, idx) => (
                        <div 
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-colors ${idx === currentStep ? 'bg-white' : 'bg-white/20'}`}
                        />
                    ))}
                </div>

                <div className="flex gap-3">
                    {currentStep > 0 && (
                        <button 
                            onClick={handlePrev}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <button 
                        onClick={handleNext}
                        className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 bg-gradient-to-r ${step.color}`}
                    >
                        {currentStep === steps.length - 1 ? "Let's Go!" : "Next"}
                        {currentStep !== steps.length - 1 && <ChevronRight size={16} />}
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;