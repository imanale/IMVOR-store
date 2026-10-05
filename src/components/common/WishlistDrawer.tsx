import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { PRODUCTS } from '../../data/products';
import { formatPKR } from '../../utils/formatters';

export const WishlistDrawer: React.FC = () => {
  const { 
    isWishlistOpen, 
    setIsWishlistOpen, 
    wishlist, 
    toggleWishlist, 
    addToCart,
    openProductDetail,
    setActivePage 
  } = useCartStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-[8px]"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e13] border-l border-zinc-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800 bg-[#121217] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="text-base font-bold text-white font-display">
                Saved Tactical Gear ({wishlistedProducts.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white font-display">No saved gear</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Click the heart icon on any tactical blade or tool to save it to your wishlist.
                </p>
                <button
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setActivePage('catalog');
                  }}
                  className="mt-2 py-2 px-4 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div 
                  key={product.id}
                  className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 flex gap-3.5 items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded object-cover bg-black shrink-0 border border-white/5"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 
                      onClick={() => {
                        setIsWishlistOpen(false);
                        openProductDetail(product.id);
                      }}
                      className="text-xs font-bold text-white truncate cursor-pointer hover:text-rose-400"
                    >
                      {product.name}
                    </h4>
                    <span className="text-[10px] text-zinc-400 font-mono-numbers block">
                      {product.categoryLabel}
                    </span>
                    <span className="text-xs font-bold font-mono-numbers text-white mt-1 block">
                      {formatPKR(product.pricePKR)}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        addToCart(product, 1, {
                          clientX: rect.left + rect.width / 2,
                          clientY: rect.top + rect.height / 2
                        });
                      }}
                      className="p-2 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-rose-400"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
