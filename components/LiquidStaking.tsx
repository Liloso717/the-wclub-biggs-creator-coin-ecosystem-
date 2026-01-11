import React, { useState } from 'react';
import { Layers, ArrowRightLeft, Lock, Wallet, Info, ArrowDown, Droplets, Loader2 } from 'lucide-react';

const LiquidStaking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STAKE' | 'UNSTAKE'>('STAKE');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock Balances
  const [twcbBalance, setTwcbBalance] = useState(100000);
  const [lstwcbBalance, setLstwcbBalance] = useState(0);

  // Stats
  const exchangeRate = 1.0542; // 1 LSTWCB = 1.0542 TWCB
  const apy = 14.5;
  const tvl = '2,450,000';

  const calculateReceiveAmount = (inputAmount: number) => {
    if (activeTab === 'STAKE') {
      return inputAmount / exchangeRate;
    } else {
      return inputAmount * exchangeRate;
    }
  };

  const handleAction = async () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;

    if (activeTab === 'STAKE') {
      if (val > twcbBalance) return alert("Insufficient $TWCB balance");
    } else {
      if (val > lstwcbBalance) return alert("Insufficient $LSTWCB balance");
    }

    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (activeTab === 'STAKE') {
      const received = val / exchangeRate;
      setTwcbBalance(prev => prev - val);
      setLstwcbBalance(prev => prev + received);
    } else {
      const received = val * exchangeRate;
      setLstwcbBalance(prev => prev - val);
      setTwcbBalance(prev => prev + received);
    }
    setAmount('');
    setIsLoading(false);
  };

  const setMax = () => {
    if (activeTab === 'STAKE') setAmount(twcbBalance.toString());
    else setAmount(lstwcbBalance.toString());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Droplets className="text-cyan-400" size={40} />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Liquid Staking
            </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Stake your $TWCB to receive $LSTWCB. Earn auto-compounding rewards while keeping your tokens liquid for use in DeFi.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-1">Annual Percentage Yield</p>
            <p className="text-3xl font-bold text-green-400">{apy}%</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-1">Total Value Locked</p>
            <p className="text-3xl font-bold text-club-gold">${tvl}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-1">Exchange Rate</p>
            <p className="text-lg font-bold text-white">1 $LSTWCB ≈ {exchangeRate} $TWCB</p>
        </div>
      </div>

      {/* Staking Card */}
      <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/10">
        
        {/* Tabs */}
        <div className="flex border-b border-white/10">
            <button 
                onClick={() => setActiveTab('STAKE')}
                className={`flex-1 py-4 font-bold text-lg transition-colors ${activeTab === 'STAKE' ? 'bg-club-accent/10 text-club-accent' : 'text-gray-400 hover:text-white'}`}
            >
                Stake
            </button>
            <button 
                onClick={() => setActiveTab('UNSTAKE')}
                className={`flex-1 py-4 font-bold text-lg transition-colors ${activeTab === 'UNSTAKE' ? 'bg-club-purple/10 text-club-purple' : 'text-gray-400 hover:text-white'}`}
            >
                Unstake
            </button>
        </div>

        <div className="p-6 space-y-6">
            
            {/* Input Section */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                    <span>{activeTab === 'STAKE' ? 'You Stake' : 'You Unstake'}</span>
                    <span className="flex items-center gap-1">
                        <Wallet size={12} /> 
                        Balance: {activeTab === 'STAKE' ? twcbBalance.toLocaleString() : lstwcbBalance.toLocaleString()}
                    </span>
                </div>
                
                <div className="relative">
                    <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-4 pr-24 py-4 text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        disabled={isLoading}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                         <button 
                            onClick={setMax}
                            className="px-2 py-1 text-xs font-bold bg-white/10 rounded hover:bg-white/20 text-cyan-400"
                            disabled={isLoading}
                        >
                            MAX
                        </button>
                        <span className="font-bold text-gray-400">
                            {activeTab === 'STAKE' ? '$TWCB' : '$LSTWCB'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="flex justify-center -my-3 relative z-10">
                <div className="bg-club-dark border border-white/20 rounded-full p-2">
                    <ArrowDown size={20} className="text-gray-400" />
                </div>
            </div>

            {/* Output Section */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                    <span>You Receive</span>
                </div>
                
                <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-white">
                        {amount ? calculateReceiveAmount(parseFloat(amount)).toLocaleString(undefined, {maximumFractionDigits: 4}) : '0.00'}
                    </span>
                    <span className="font-bold text-gray-400">
                         {activeTab === 'STAKE' ? '$LSTWCB' : '$TWCB'}
                    </span>
                </div>
            </div>

            {/* Details */}
            <div className="bg-white/5 rounded-xl p-4 text-sm space-y-2">
                <div className="flex justify-between text-gray-400">
                    <span>Exchange Rate</span>
                    <span className="text-white">1 $LSTWCB = {exchangeRate} $TWCB</span>
                </div>
                 <div className="flex justify-between text-gray-400">
                    <span>Transaction Cost</span>
                    <span className="text-white">~0.000005 SOL</span>
                </div>
                 <div className="flex justify-between text-gray-400">
                    <span>Reward Fee</span>
                    <span className="text-white">0%</span>
                </div>
            </div>

            <button 
                onClick={handleAction}
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                    activeTab === 'STAKE' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-cyan-900/20' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-purple-900/20'
                }`}
            >
                {isLoading ? <Loader2 className="animate-spin" /> : (activeTab === 'STAKE' ? 'Liquid Stake' : 'Unstake')}
            </button>

            <p className="text-center text-xs text-gray-500 flex items-center justify-center gap-1">
                <Info size={12} />
                $LSTWCB increases in value relative to $TWCB as rewards accrue.
            </p>

        </div>
      </div>

    </div>
  );
};

export default LiquidStaking;