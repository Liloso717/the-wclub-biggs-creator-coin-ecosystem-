import React, { useState, useEffect } from 'react';
import { User, Edit2, Save, X, ShieldCheck, Trophy, Flame, Gift, Calendar, Wallet, Activity, ArrowLeft } from 'lucide-react';

interface UserProfileProps {
  username: string | null;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ username, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("Just a degen vibing in the W Club. HODLing $TWCB to the moon! 🚀");
  const [tempBio, setTempBio] = useState(bio);

  const currentUser = username || "Guest_User";
  const isMe = currentUser === "You" || currentUser === "Guest_User"; // Simple check for demo

  // Deterministic mock data based on username length to make it feel persistent
  const seed = currentUser.length;
  const rank = Math.floor(seed * 3.5) + 1;
  const holdings = (seed * 15420).toLocaleString();
  const tipsSent = Math.floor(seed * 120);
  const burnAmount = (seed * 500).toLocaleString();
  
  const badges = [
    { icon: <ShieldCheck size={16} />, label: "Verified", color: "text-blue-400 bg-blue-400/10" },
    { icon: <Trophy size={16} />, label: "Top 500", color: "text-club-gold bg-club-gold/10" },
    rank < 10 ? { icon: <Flame size={16} />, label: "OG Whale", color: "text-orange-500 bg-orange-500/10" } : null
  ].filter(Boolean);

  const activities = [
    { type: 'POST', text: 'Posted on Community Wall', time: '2h ago', icon: <Activity size={16} /> },
    { type: 'BURN', text: `Burned ${Math.floor(seed * 10)} $TWCB`, time: '1d ago', icon: <Flame size={16} /> },
    { type: 'TIP', text: 'Sent a tip to @BiggsFan', time: '3d ago', icon: <Gift size={16} /> },
    { type: 'GAME', text: 'Won 100 $TWCB in Arcade', time: '5d ago', icon: <Trophy size={16} /> },
  ];

  const handleSaveBio = () => {
    setBio(tempBio);
    setIsEditing(false);
  };

  const handleCancelBio = () => {
    setTempBio(bio);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back
      </button>

      {/* Header Profile Card */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
        {/* Background Blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-club-accent/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-club-dark to-gray-800 border-4 border-club-accent/30 flex items-center justify-center shadow-xl">
              <User size={64} className="text-club-accent" />
            </div>
            <div className="absolute bottom-0 right-0 bg-club-gold text-black font-bold text-xs px-2 py-1 rounded-full border border-white/20 shadow-lg">
              Lvl {seed}
            </div>
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                  {currentUser}
                  {badges.map((b, i) => (
                    <span key={i} title={b?.label} className={`p-1 rounded-full ${b?.color} border border-white/5`}>
                        {b?.icon}
                    </span>
                  ))}
                </h2>
                <div className="flex items-center gap-2 text-gray-400 mt-1">
                  <span className="text-sm font-mono">@{currentUser.toLowerCase().replace(/\s/g, '_')}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-sm flex items-center gap-1"><Calendar size={12} /> Joined Oct 2024</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                 {!isMe && (
                   <button className="px-6 py-2 bg-club-accent text-black font-bold rounded-xl hover:bg-cyan-300 transition-colors flex items-center gap-2">
                     <Gift size={18} /> Tip
                   </button>
                 )}
                 <button className="px-6 py-2 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                    Share Profile
                 </button>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-black/20 rounded-xl p-4 border border-white/5 relative group">
               {isEditing ? (
                 <div className="space-y-3">
                   <textarea 
                      value={tempBio}
                      onChange={(e) => setTempBio(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-gray-300 focus:outline-none focus:ring-1 focus:ring-club-accent resize-none h-24"
                      maxLength={160}
                   />
                   <div className="flex justify-end gap-2">
                     <button onClick={handleCancelBio} className="px-3 py-1 text-sm text-gray-400 hover:text-white">Cancel</button>
                     <button onClick={handleSaveBio} className="px-3 py-1 text-sm bg-club-accent text-black rounded font-bold hover:bg-cyan-300">Save</button>
                   </div>
                 </div>
               ) : (
                 <>
                    <p className="text-gray-300 leading-relaxed italic">"{bio}"</p>
                    {isMe && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="absolute top-2 right-2 p-1.5 text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-all bg-black/40 rounded-lg"
                        >
                            <Edit2 size={14} />
                        </button>
                    )}
                 </>
               )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col: Stats */}
        <div className="md:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-200">
                    <Wallet size={18} className="text-club-purple" /> Wallet Stats
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                        <span className="text-gray-400 text-sm">Rank</span>
                        <span className="font-bold text-white">#{rank}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                        <span className="text-gray-400 text-sm">Holdings</span>
                        <span className="font-bold text-club-accent">{holdings}</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-white/5">
                        <span className="text-gray-400 text-sm">Total Burned</span>
                        <span className="font-bold text-orange-500">{burnAmount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Tips Sent</span>
                        <span className="font-bold text-indigo-400">{tipsSent}</span>
                    </div>
                </div>
            </div>

             <div className="bg-gradient-to-br from-club-gold/10 to-orange-500/10 border border-club-gold/20 rounded-2xl p-6 text-center">
                <Trophy size={32} className="text-club-gold mx-auto mb-2" />
                <h4 className="font-bold text-white mb-1">Top Contributor</h4>
                <p className="text-xs text-gray-400">Awarded for being in the top 5% of community activity.</p>
             </div>
        </div>

        {/* Right Col: Activity Feed */}
        <div className="md:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-gray-200">
                    <Activity size={18} className="text-green-400" /> Recent Activity
                </h3>
                
                <div className="space-y-6">
                    {activities.map((item, idx) => (
                        <div key={idx} className="flex gap-4 group">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-white/30 transition-colors z-10 relative">
                                    {item.icon}
                                </div>
                                {idx !== activities.length - 1 && (
                                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10"></div>
                                )}
                            </div>
                            <div className="pb-6">
                                <p className="text-gray-200 font-medium group-hover:text-club-accent transition-colors">{item.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                            </div>
                        </div>
                    ))}
                    
                    <div className="text-center pt-4">
                        <button className="text-sm text-gray-400 hover:text-white transition-colors">Load More History</button>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;