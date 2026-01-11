import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TokenDataPoint } from '../types';

// Mock data generator
const generateMockData = (startPrice: number, volatility: number, trend: number): TokenDataPoint[] => {
  const data: TokenDataPoint[] = [];
  let price = startPrice;
  for (let i = 0; i < 24; i++) {
    const change = (Math.random() - 0.5 + trend) * volatility;
    price = Math.max(0.000001, price + change);
    data.push({
      time: `${i}:00`,
      price: price,
      volume: Math.floor(Math.random() * 10000) + 5000
    });
  }
  return data;
};

const TokenDashboard: React.FC<{
    tokenName: string;
    tokenSymbol: string;
    data: TokenDataPoint[];
    color: string;
    accentColor: string;
    holders: string;
    change: string;
}> = ({ tokenName, tokenSymbol, data, color, accentColor, holders, change }) => {
    const currentPrice = data[data.length - 1].price.toFixed(6);
    
    return (
        <div className="mb-16 last:mb-0">
             <div className="mb-6 flex items-baseline gap-4">
                <h2 className="text-3xl font-bold" style={{ color: color }}>{tokenSymbol} Dashboard</h2>
                <span className="text-gray-400 text-sm">{tokenName} Live Data</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Current Price</p>
                    <div className="text-3xl font-bold font-mono" style={{ color: color }}>${currentPrice}</div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">24h Change</p>
                    <div className={`text-3xl font-bold font-mono ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                        {change}
                    </div>
                </div>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-sm text-gray-400 mb-1">Holders</p>
                    <div className="text-3xl font-bold font-mono text-club-gold">{holders}</div>
                </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 border border-white/10 shadow-xl">
                <h3 className="text-xl font-bold mb-6">Price History (24h)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id={`colorPrice-${tokenSymbol}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor={color} stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="time" stroke="#666" tick={{fontSize: 12}} />
                            <YAxis 
                                domain={['auto', 'auto']} 
                                stroke="#666" 
                                tickFormatter={(val) => `$${val.toFixed(4)}`} 
                                width={80}
                                tick={{fontSize: 12}}
                            />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#333', color: '#fff' }}
                                itemStyle={{ color: color }}
                                formatter={(value: number) => [`$${value.toFixed(6)}`, 'Price']}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="price" 
                                stroke={color} 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill={`url(#colorPrice-${tokenSymbol})`} 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

const TokenStats: React.FC = () => {
  // Generate data with slight differences to look realistic
  const twcbData = React.useMemo(() => generateMockData(0.0042, 0.0005, 0.1), []);
  const biggsData = React.useMemo(() => generateMockData(0.0008, 0.0001, 0.05), []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 fade-in">
      <TokenDashboard 
        tokenName="The W Club Biggs (Solana)"
        tokenSymbol="$TWCB"
        data={twcbData}
        color="#22D3EE" // club-accent (cyan)
        accentColor="#22D3EE"
        holders="1,337"
        change="+12.4%"
      />
      
      <div className="border-t border-white/10 my-8"></div>

      <TokenDashboard 
        tokenName="The W Club Biggs (Base)"
        tokenSymbol="$THEWCLUBBIGGS"
        data={biggsData}
        color="#A855F7" // Purple-500
        accentColor="#A855F7"
        holders="842"
        change="+5.2%"
      />
    </div>
  );
};

export default TokenStats;