import React from 'react';
import { ShoppingBag, Eye, Heart, Star, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { formatPKR } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openProductDetail, wishlist, toggleWishlist } = useCartStore();

  const isWishlisted = wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(product, 1, {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2
    });
  };

  return (
    <div 
      onClick={() => openProductDetail(product.id)}
      className="group relative flex flex-col rounded-xl bg-[#121217] border border-white/5 hover:border-rose-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-5px_rgba(225,29,72,0.2)] cursor-pointer overflow-hidden"
    >
      {/* Visual Image Container (65-70% height) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18181f]">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tactical Dark Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Controls */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          {product.badge ? (
            <span className="text-[10px] font-mono-numbers uppercase tracking-wider font-semibold text-rose-300 bg-black/75 backdrop-blur px-2 py-0.5 rounded border border-rose-500/30">
              {product.badge}
            </span>
          ) : (
            <div />
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-1.5 rounded-full backdrop-blur transition-all ${
              isWishlisted
                ? 'bg-rose-600 text-white shadow-[0_0_10px_rgba(225,29,72,0.5)]'
                : 'bg-black/60 text-zinc-400 hover:text-white hover:bg-black/80'
            }`}
            aria-label={isWishlisted ? 'Remove from armory' : 'Save to armory'}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Stock / Lawful Status Quiet Kicker */}
        {product.isRestrictedItem && (
          <div className="absolute bottom-2 left-2.5 z-10 flex items-center gap-1 text-[10px] font-mono-numbers text-amber-400/90 bg-black/60 backdrop-blur px-1.5 py-0.5 rounded">
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>CNIC Verified Item</span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div>
          {/* Zero-Pill Metadata Discipline */}
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono-numbers mb-1">
            <span className="uppercase text-rose-400/90">{product.categoryLabel}</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <div className="flex items-center gap-1 text-zinc-300">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-rose-300 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="mt-1 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Bottom Price & Actions */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono-numbers text-base font-bold text-white tracking-tight">
                {formatPKR(product.pricePKR)}
              </span>
              {product.originalPricePKR && (
                <span className="font-mono-numbers text-xs text-zinc-500 line-through">
                  {formatPKR(product.originalPricePKR)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-zinc-500 font-mono-numbers">
              {product.inStock ? `${product.stockQty} in stock (Pakistan)` : 'Backordered'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                openProductDetail(product.id);
              }}
              className="p-2 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
              title="View Specifications"
              aria-label="View Details"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleAddToCart}
              className="py-1.5 px-3 rounded bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-all shadow-[0_0_12px_rgba(225,29,72,0.3)] hover:shadow-[0_0_18px_rgba(225,29,72,0.5)] flex items-center gap-1.5"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
