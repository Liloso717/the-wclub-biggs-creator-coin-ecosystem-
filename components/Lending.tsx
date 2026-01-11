import React, { useState } from 'react';
import { Landmark, Wallet, ArrowUpRight, ArrowDownLeft, Percent, ShieldCheck, Loader2, Info, AlertTriangle } from 'lucide-react';

type Tab = 'SUPPLY' | 'BORROW';
type ActionType = 'DEPOSIT' | 'WITHDRAW' | 'BORROW' | 'REPAY';

const Lending: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('SUPPLY');
  const [amount, setAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // User Balances (Simulated)
  const [walletBalance, setWalletBalance] = useState(25000); // Available in wallet
  const [suppliedBalance, setSuppliedBalance] = useState(5000); // Currently supplied
  const [borrowedBalance, setBorrowedBalance] = useState(1200); // Currently borrowed

  // Market Constants
  const supplyAPY = 12.4;
  const borrowAPY = 15.8;
  const collateralFactor = 0.75; // Can borrow up to 75% of supplied value
  const totalLiquidity = '4,250,000';
  const utilizationRate = 68;

  // Derived Calculations
  const borrowLimit = suppliedBalance * collateralFactor;
  const borrowLimitUsed = (borrowedBalance / borrowLimit) * 100 || 0;
  const healthFactor = borrowedBalance > 0 ? borrowLimit / borrowedBalance : 100; // Simplified HF
  
  // Determine available action based on tab
  // If SUPPLY tab -> Deposit (default) or Withdraw toggle?
  // Let's use sub-tabs for actions to be clear.
  const [subTab, setSubTab] = useState<ActionType>('DEPOSIT');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setSubTab(tab === 'SUPPLY' ? 'DEPOSIT' : 'BORROW');
    setAmount('');
  };

  const getButtonText = () => {
    if (isLoading) return 'Processing...';
    switch (subTab) {
      case 'DEPOSIT': return 'Supply $TWCB';
      case 'WITHDRAW': return 'Withdraw $TWCB';
      case 'BORROW': return 'Borrow $TWCB';
      case 'REPAY': return 'Repay $TWCB';
    }
  };

  const getMaxAmount = () => {
    switch (subTab) {
      case 'DEPOSIT': return walletBalance;
      case 'WITHDRAW': return suppliedBalance;
      case 'BORROW': return Math.max(0, borrowLimit - borrowedBalance);
      case 'REPAY': return Math.min(walletBalance, borrowedBalance);
    }
  };

  const handleAction = async () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;
    
    // Validation
    if (subTab === 'DEPOSIT' && val > walletBalance) return alert("Insufficient wallet balance");
    if (subTab === 'WITHDRAW' && val > suppliedBalance) return alert("Insufficient supplied balance");
    if (subTab === 'BORROW' && val > (borrowLimit - borrowedBalance)) return alert("Exceeds borrow limit");
    if (subTab === 'REPAY' && val > walletBalance) return alert("Insufficient wallet balance for repayment");

    setIsLoading(true);
    // Simulate Network Delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update State
    switch (subTab) {
        case 'DEPOSIT':
            setWalletBalance(prev => prev - val);
            setSuppliedBalance(prev => prev + val);
            break;
        case 'WITHDRAW':
            // Check if withdrawal makes health factor unsafe
            if (borrowedBalance > 0) {
                const newSupply = suppliedBalance - val;
                const newLimit = newSupply * collateralFactor;
                if (borrowedBalance > newLimit) {
                    alert("Cannot withdraw: Health factor would fall below liquidation threshold.");
                    setIsLoading(false);
                    return;
                }
            }
            setSuppliedBalance(prev => prev - val);
            setWalletBalance(prev => prev + val);
            break;
        case 'BORROW':
            setBorrowedBalance(prev => prev + val);
            setWalletBalance(prev => prev + val);
            break;
        case 'REPAY':
            setBorrowedBalance(prev => Math.max(0, prev - val));
            setWalletBalance(prev => prev - val);
            break;
    }

    setAmount('');
    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-in">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Landmark className="text-violet-500" size={40} />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-white bg-clip-text text-transparent">
              DeFi Lending Protocol
            </span>
        </h2>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-club-accent/20 to-blue-500/20 border border-club-accent/30 text-club-accent text-sm font-bold mb-4">
             <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=026" className="w-4 h-4" alt="Solana" />
             Solana Network Only
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Supply $TWCB to earn yield or borrow against your holdings. 
          Manage your positions and health factor carefully to avoid liquidation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Stats & Health */}
        <div className="space-y-6">
            
            {/* Overview Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <Wallet size={20} className="text-club-gold" /> Your Position
                </h3>

                <div className="space-y-6">
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Supply Balance</p>
                        <div className="flex justify-between items-end">
                            <span className="text-2xl font-bold text-white">{suppliedBalance.toLocaleString()}</span>
                            <span className="text-sm font-bold text-violet-400">$TWCB</span>
                        </div>
                    </div>
                    
                    <div>
                        <p className="text-gray-400 text-sm mb-1">Borrow Balance</p>
                        <div className="flex justify-between items-end">
                            <span className="text-2xl font-bold text-white">{borrowedBalance.toLocaleString()}</span>
                            <span className="text-sm font-bold text-orange-400">$TWCB</span>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400 flex items-center gap-1"><ShieldCheck size={14} /> Health Factor</span>
                            <span className={`text-sm font-bold ${healthFactor < 1.1 ? 'text-red-500' : healthFactor < 1.5 ? 'text-yellow-500' : 'text-green-500'}`}>
                                {healthFactor === 100 ? '∞' : healthFactor.toFixed(2)}
                            </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${borrowLimitUsed > 90 ? 'bg-red-500' : borrowLimitUsed > 75 ? 'bg-orange-500' : 'bg-green-500'}`} 
                                style={{ width: `${Math.min(borrowLimitUsed, 100)}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                            <span>0%</span>
                            <span>Limit {borrowLimit.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Market Stats */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                 <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ArrowUpRight size={20} className="text-green-400" /> Market Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 rounded-xl">
                        <p className="text-xs text-gray-400 mb-1">Supply APY</p>
                        <p className="text-xl font-bold text-green-400">{supplyAPY}%</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl">
                        <p className="text-xs text-gray-400 mb-1">Borrow APY</p>
                        <p className="text-xl font-bold text-orange-400">{borrowAPY}%</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl col-span-2">
                        <p className="text-xs text-gray-400 mb-1">Total Liquidity</p>
                        <p className="text-xl font-bold text-white">${totalLiquidity}</p>
                    </div>
                </div>
            </div>

        </div>

        {/* Right Column: Interaction Panel */}
        <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 h-full">
                
                {/* Main Tabs */}
                <div className="flex mb-8 bg-black/20 p-1 rounded-xl">
                    <button 
                        onClick={() => handleTabChange('SUPPLY')}
                        className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all ${
                            activeTab === 'SUPPLY' 
                            ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/20' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Supply
                    </button>
                    <button 
                        onClick={() => handleTabChange('BORROW')}
                        className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all ${
                            activeTab === 'BORROW' 
                            ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Borrow
                    </button>
                </div>

                {/* Sub Tabs (Actions) */}
                <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
                    {activeTab === 'SUPPLY' ? (
                        <>
                            <button 
                                onClick={() => { setSubTab('DEPOSIT'); setAmount(''); }}
                                className={`text-sm font-bold pb-2 border-b-2 transition-colors ${subTab === 'DEPOSIT' ? 'text-violet-400 border-violet-400' : 'text-gray-500 border-transparent hover:text-white'}`}
                            >
                                Deposit
                            </button>
                            <button 
                                onClick={() => { setSubTab('WITHDRAW'); setAmount(''); }}
                                className={`text-sm font-bold pb-2 border-b-2 transition-colors ${subTab === 'WITHDRAW' ? 'text-violet-400 border-violet-400' : 'text-gray-500 border-transparent hover:text-white'}`}
                            >
                                Withdraw
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                onClick={() => { setSubTab('BORROW'); setAmount(''); }}
                                className={`text-sm font-bold pb-2 border-b-2 transition-colors ${subTab === 'BORROW' ? 'text-orange-400 border-orange-400' : 'text-gray-500 border-transparent hover:text-white'}`}
                            >
                                Borrow
                            </button>
                            <button 
                                onClick={() => { setSubTab('REPAY'); setAmount(''); }}
                                className={`text-sm font-bold pb-2 border-b-2 transition-colors ${subTab === 'REPAY' ? 'text-orange-400 border-orange-400' : 'text-gray-500 border-transparent hover:text-white'}`}
                            >
                                Repay
                            </button>
                        </>
                    )}
                </div>

                {/* Input Area */}
                <div className="space-y-6">
                    <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Amount</span>
                            <span className="flex items-center gap-1">
                                <Wallet size={12} /> 
                                {subTab === 'DEPOSIT' ? `Wallet: ${walletBalance.toLocaleString()}` :
                                 subTab === 'WITHDRAW' ? `Supplied: ${suppliedBalance.toLocaleString()}` :
                                 subTab === 'BORROW' ? `Available: ${(borrowLimit - borrowedBalance).toLocaleString()}` :
                                 `Owed: ${borrowedBalance.toLocaleString()}`}
                            </span>
                        </div>
                        
                        <div className="relative">
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-transparent text-3xl font-bold text-white focus:outline-none placeholder-gray-600"
                                disabled={isLoading}
                            />
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <button 
                                    onClick={() => setAmount(getMaxAmount().toString())}
                                    className="px-2 py-1 text-xs font-bold bg-white/10 rounded hover:bg-white/20 text-club-accent"
                                    disabled={isLoading}
                                >
                                    MAX
                                </button>
                                <span className="font-bold text-gray-400 text-lg">$TWCB</span>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Simulation / Info */}
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center text-gray-400">
                            <span>Transaction Rate</span>
                            <span className={activeTab === 'SUPPLY' ? 'text-green-400' : 'text-orange-400'}>
                                {activeTab === 'SUPPLY' ? supplyAPY : borrowAPY}% APY
                            </span>
                        </div>
                         <div className="flex justify-between items-center text-gray-400">
                            <span>Health Factor Impact</span>
                            <span className="flex items-center gap-1 text-white">
                                {healthFactor.toFixed(2)} 
                                <ArrowUpRight size={12} className="text-gray-600" /> 
                                {/* Simplified logic for preview */}
                                {amount ? '...' : healthFactor.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <button 
                        onClick={handleAction}
                        disabled={isLoading || !amount}
                        className={`w-full py-4 rounded-xl font-bold text-xl shadow-lg transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                            activeTab === 'SUPPLY' 
                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-violet-900/20' 
                            : 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-orange-900/20'
                        }`}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : getButtonText()}
                    </button>
                    
                    {activeTab === 'BORROW' && (
                        <div className="flex items-start gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg text-xs text-orange-300">
                            <AlertTriangle size={16} className="flex-shrink-0" />
                            <p>Borrowing increases liquidation risk. Keep your Health Factor above 1.5 to be safe from market volatility.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>

      </div>
    </div>
  );
};

export default Lending;