import React from 'react';
import { ShoppingBag, Share2, ExternalLink, Shirt, Tag } from 'lucide-react';

const Merch: React.FC = () => {
  const storeUrl = "https://wclubbiggs.printify.me/";
  
  const featuredProducts = [
    {
      id: 1,
      name: "W Club OG Hoodie",
      price: "$45.00",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=500", // Placeholder
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Biggs Vibe Tee",
      price: "$25.00",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=500", // Placeholder
      tag: "New Arrival"
    },
    {
      id: 3,
      name: "HODL Cap",
      price: "$22.00",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=500", // Placeholder
    },
    {
      id: 4,
      name: "Club Mug",
      price: "$15.00",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=500", // Placeholder
    }
  ];

  const handleShare = () => {
    const text = "Check out the official The W Club Biggs Merch! Wear the vibe. #TWCB 🚀";
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(storeUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 fade-in">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden mb-12 bg-white/5 border border-white/10">
         <div className="absolute inset-0 bg-gradient-to-r from-club-purple/80 to-club-accent/80 z-10"></div>
         <img 
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1600" 
            alt="Merch Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
         />
         
         <div className="relative z-20 px-8 py-20 text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg">
                Official Merch
            </h2>
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto font-light">
                Wear the vibe. Rep the club. High quality apparel for high quality holders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                    href={storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                >
                    <ShoppingBag size={20} /> Visit Full Store
                </a>
                <button 
                    onClick={handleShare}
                    className="px-8 py-4 bg-black/40 backdrop-blur-sm border border-white/20 text-white font-bold rounded-full hover:bg-black/60 transition-colors flex items-center justify-center gap-2"
                >
                    <Share2 size={20} /> Share on X
                </button>
            </div>
         </div>
      </div>

      {/* Featured Products */}
      <div className="mb-8 flex items-center justify-between">
          <h3 className="text-3xl font-bold flex items-center gap-2">
              <Shirt className="text-club-accent" /> Featured Drops
          </h3>
          <a href={storeUrl} target="_blank" rel="noreferrer" className="text-club-accent hover:text-white flex items-center gap-1 transition-colors">
              View All <ExternalLink size={16} />
          </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-club-accent/50 transition-all duration-300 hover:-translate-y-2">
                  <div className="relative aspect-square overflow-hidden bg-white/5">
                      {product.tag && (
                          <div className="absolute top-3 left-3 z-10 bg-club-accent text-black text-xs font-bold px-2 py-1 rounded">
                              {product.tag}
                          </div>
                      )}
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <a 
                             href={storeUrl} 
                             target="_blank" 
                             rel="noreferrer"
                             className="px-6 py-2 bg-white text-black font-bold rounded-full transform scale-90 group-hover:scale-100 transition-transform"
                          >
                              Buy Now
                          </a>
                      </div>
                  </div>
                  <div className="p-4">
                      <h4 className="text-lg font-bold text-white mb-1 truncate">{product.name}</h4>
                      <p className="text-gray-400 font-mono">{product.price}</p>
                  </div>
              </div>
          ))}
      </div>

      {/* Trust Badges */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-gray-400">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <Tag className="w-8 h-8 mx-auto mb-3 text-club-gold" />
              <h4 className="font-bold text-white mb-1">Premium Quality</h4>
              <p className="text-sm">Only the best materials for our community.</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <Share2 className="w-8 h-8 mx-auto mb-3 text-club-purple" />
              <h4 className="font-bold text-white mb-1">Community First</h4>
              <p className="text-sm">Designs voted on by $TWCB holders.</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <ShoppingBag className="w-8 h-8 mx-auto mb-3 text-green-400" />
              <h4 className="font-bold text-white mb-1">Secure Checkout</h4>
              <p className="text-sm">Powered by Printify. Fast shipping.</p>
          </div>
      </div>

    </div>
  );
};

export default Merch;