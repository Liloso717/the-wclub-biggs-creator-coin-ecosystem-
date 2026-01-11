import React, { useState } from 'react';
import { Gift, Wallet, Copy, Check, ArrowUpRight, ArrowDownLeft, Clock, Search, Loader2 } from 'lucide-react';

type Network = 'SOL' | 'BASE';

interface Transaction {
  id: string;
  type: 'SENT' | 'RECEIVED';
  user: string;
  amount: number;
  timestamp: number;
  token: string;
}

const Tips: React.FC = () => {
  const [network, setNetwork] = useState<Network>('SOL');
  const [balance, setBalance] = useState(15420);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const tokenSymbol = network === 'SOL' ? '$TWCB' : '$THEWCLUBBIGGS';
  const myAddress = network === 'SOL' ? '8xF3...9a2B' : '0x71...9e21';

  const [history, setHistory] = useState<Transaction[]>([
    { id: '1', type: 'RECEIVED', user: 'BiggsFan01', amount: 500, timestamp: Date.now() - 3600000, token: tokenSymbol },
    { id: '2', type: 'SENT', user: 'Admin_Biggs', amount: 1000, timestamp: Date.now() - 86400000, token: tokenSymbol },
    { id: '3', type: 'RECEIVED', user: 'SolanaWhale', amount: 2500, timestamp: Date.now() - 172800000, token: tokenSymbol },
  ]);

  const handleCopy = () => {
    navigator.clipboard.writeText(myAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async () => {
    if (!recipient || !amount) return;
    const val = parseFloat(amount);
    if (val > balance) return alert("Insufficient balance");
    
    setIsSending(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newTx: Transaction = {
      id: Date.now().toString(),
      type: 'SENT',
      user: recipient,
      amount: val,
      timestamp: Date.now(),
      token: tokenSymbol
    };
    
    setHistory([newTx, ...history]);
    setBalance(prev => prev - val);
    setAmount('');
    setRecipient('');
    setIsSending(false);
    alert(`Tip of ${val} ${tokenSymbol} sent to ${recipient}!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fade-in">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Gift className="text-indigo-500" size={40} />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Community Tipping
            </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Show some love. Send tips to community members, creators, or just random acts of kindness.
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Actions */}
        <div className="space-y-6">
            
            {/* Balance Card */}
            <div className={`rounded-2xl p-6 border ${network === 'SOL' ? 'bg-gradient-to-br from-club-accent/20 to-blue-900/20 border-club-accent/30' : 'bg-gradient-to-br from-club-purple/20 to-purple-900/20 border-club-purple/30'}`}>
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-gray-400 text-sm font-medium mb-1">Available Balance</p>
                        <h3 className="text-4xl font-bold text-white">{balance.toLocaleString()}</h3>
                        <p className={`font-bold text-sm mt-1 ${network === 'SOL' ? 'text-club-accent' : 'text-club-purple'}`}>{tokenSymbol}</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-full">
                        <Wallet className="text-white" size={24} />
                    </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-black/30 rounded-lg border border-white/10">
                    <span className="text-xs text-gray-500 font-mono flex-1 truncate">{myAddress}</span>
                    <button onClick={handleCopy} className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors">
                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    </button>
                </div>
            </div>

            {/* Send Form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                    <ArrowUpRight className="text-indigo-400" /> Send Tip
                </h3>
                
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 ml-1 mb-1 block">Recipient (Username or Address)</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                placeholder="e.g. BiggsFan01"
                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={isSending}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 ml-1 mb-1 block">Amount</label>
                        <div className="relative">
                            <input 
                                type="number" 
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="w-full bg-black/30 border border-white/10 rounded-xl pl-4 pr-16 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                                disabled={isSending}
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">{tokenSymbol}</span>
                        </div>
                        <div className="flex justify-end gap-2 mt-2">
                            {[100, 500, 1000].map(val => (
                                <button 
                                    key={val}
                                    onClick={() => setAmount(val.toString())}
                                    className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 rounded border border-white/10 text-gray-300"
                                    disabled={isSending}
                                >
                                    +{val}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={handleSend}
                        disabled={isSending}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-white shadow-lg shadow-indigo-900/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isSending ? <Loader2 className="animate-spin" /> : <><Gift size={20} /> Send Tip</>}
                    </button>
                </div>
            </div>
        </div>

        {/* Right Column: History */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full min-h-[500px]">
             <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                <Clock className="text-gray-400" /> Transaction History
            </h3>

            <div className="space-y-4">
                {history.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${tx.type === 'SENT' ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`}>
                                {tx.type === 'SENT' ? <ArrowUpRight size={18} /> : <ArrowDownLeft size={18} />}
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">
                                    {tx.type === 'SENT' ? `Sent to ${tx.user}` : `Received from ${tx.user}`}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(tx.timestamp).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <span className={`font-mono font-bold ${tx.type === 'SENT' ? 'text-white' : 'text-green-400'}`}>
                            {tx.type === 'SENT' ? '-' : '+'}{tx.amount.toLocaleString()}
                        </span>
                    </div>
                ))}
                
                {history.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No tips yet. Be the first to send one!
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
};

export default Tips;