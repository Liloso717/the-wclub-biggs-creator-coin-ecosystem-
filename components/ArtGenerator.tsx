import React, { useState } from 'react';
import { generateClubArt } from '../services/geminiService';
import { Loader2, Download, RefreshCcw, Sparkles } from 'lucide-react';

const ArtGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const image = await generateClubArt(prompt);
      if (image) {
        setGeneratedImage(image);
      } else {
        setError('Failed to generate image. Try a different prompt.');
      }
    } catch (e) {
      setError('An error occurred while communicating with the AI.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-club-purple to-pink-500 bg-clip-text text-transparent">
              W Club Studio
            </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Create exclusive digital collectibles inspired by The W Club vibe. 
          Powered by Gemini AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Describe your masterpiece
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A golden cyber-skull wearing sunglasses in a neon city..."
              className="w-full h-32 bg-black/30 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-club-purple focus:outline-none resize-none"
            />
            
            <div className="mt-4 flex flex-wrap gap-2">
              {['Cyberpunk', 'Gold Chain', 'Vaporwave', 'Abstract'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setPrompt(p => p ? `${p}, ${tag}` : tag)}
                  className="px-3 py-1 text-xs rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  + {tag}
                </button>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="mt-6 w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-club-purple to-indigo-600 rounded-xl font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-900/20"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} /> Generate Art
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="flex flex-col items-center justify-center">
            <div className={`relative w-full aspect-square rounded-2xl overflow-hidden border-2 ${generatedImage ? 'border-club-gold/50 shadow-[0_0_30px_rgba(255,215,0,0.1)]' : 'border-white/5 bg-white/5'} flex items-center justify-center`}>
                {generatedImage ? (
                    <img 
                        src={generatedImage} 
                        alt="Generated Art" 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-center text-gray-500 p-8">
                        {isLoading ? (
                             <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 border-4 border-club-purple border-t-transparent rounded-full animate-spin"></div>
                                <p className="animate-pulse">Dreaming up pixels...</p>
                             </div>
                        ) : (
                            <>
                                <Palette className="w-16 h-16 mx-auto mb-4 opacity-20" />
                                <p>Your creation will appear here</p>
                            </>
                        )}
                    </div>
                )}
            </div>
            
            {generatedImage && (
                <div className="mt-4 flex gap-4">
                    <a 
                        href={generatedImage} 
                        download={`w-club-art-${Date.now()}.png`}
                        className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <Download size={18} /> Download
                    </a>
                    <button 
                        onClick={() => {
                            setGeneratedImage(null);
                            handleGenerate();
                        }}
                        className="flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        <RefreshCcw size={18} /> Retry
                    </button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

// Simple icon component for placeholder
const Palette = ({ className }: { className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="13.5" cy="6.5" r=".5"></circle>
      <circle cx="17.5" cy="10.5" r=".5"></circle>
      <circle cx="8.5" cy="7.5" r=".5"></circle>
      <circle cx="6.5" cy="12.5" r=".5"></circle>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.093 0-.679.52-1.217 1.218-1.217h1.218c3.04 0 5.5-2.46 5.5-5.5C21.996 5.86 17.525 2 12 2z"></path>
    </svg>
);

export default ArtGenerator;