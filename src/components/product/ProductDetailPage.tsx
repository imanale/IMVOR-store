import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  RotateCcw, 
  Star, 
  Truck, 
  Check, 
  AlertCircle,
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { formatPKR } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';
import { ProductCard } from '../catalog/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, setActivePage, addToCart, wishlist, toggleWishlist, showToast } = useCartStore();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Find product or fallback
  const product = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const isWishlisted = wishlist.includes(product.id);

  // Related products
  const relatedProducts = PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  // Fallback related if not enough in same category
  const displayRelated = relatedProducts.length > 0 
    ? relatedProducts 
    : PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    addToCart(product, quantity, {
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActivePage('catalog')}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Link copied to clipboard', 'info');
              }}
              className="p-2 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors text-xs flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#121217] border border-white/10 overflow-hidden shadow-2xl">
              <img
                src={product.gallery[selectedImageIndex] || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                {product.badge && (
                  <span className="text-[11px] font-mono-numbers uppercase tracking-wider font-bold text-rose-300 bg-black/80 backdrop-blur px-3 py-1 rounded border border-rose-500/40">
                    {product.badge}
                  </span>
                )}
                {product.isRestrictedItem && (
                  <span className="text-[11px] font-mono-numbers uppercase tracking-wider font-semibold text-amber-300 bg-black/80 backdrop-blur px-3 py-1 rounded border border-amber-500/40 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>CNIC Required</span>
                  </span>
                )}
              </div>

              {/* 360 viewer jump for Karambit */}
              {product.category === 'karambit' && (
                <button
                  onClick={() => setActivePage('karambit-lab')}
                  className="absolute bottom-4 right-4 z-10 py-2 px-3.5 rounded-lg bg-black/85 backdrop-blur border border-rose-500/60 hover:bg-rose-950/80 text-rose-300 text-xs font-mono-numbers flex items-center gap-2 transition-all shadow-lg"
                >
                  <RotateCcw className="w-4 h-4 text-rose-400 animate-spin-slow" />
                  <span>Launch 360° Scrubber</span>
                </button>
              )}
            </div>

            {/* Thumbnail Switchers if gallery > 1 */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-3">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-rose-500 shadow-[0_0_12px_rgba(225,29,72,0.4)]'
                        : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Tactical Integrity Note */}
            <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 flex items-start gap-3 text-xs text-zinc-400">
              <Truck className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-zinc-200 block mb-0.5">Nationwide Insured Delivery</strong>
                Dispatched via TCS Priority Logistics or Leopards Courier Network in discreet, tamper-evident security packaging within 24–48 hours across Pakistan.
              </div>
            </div>
          </div>

          {/* Right Purchase Module (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono-numbers mb-2">
                <span className="uppercase text-rose-400 font-bold tracking-wider">{product.categoryLabel}</span>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
                {product.name}
              </h1>

              {/* Pricing in PKR */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold font-mono-numbers text-white">
                  {formatPKR(product.pricePKR)}
                </span>
                {product.originalPricePKR && (
                  <span className="text-sm font-mono-numbers text-zinc-500 line-through">
                    {formatPKR(product.originalPricePKR)}
                  </span>
                )}
                <span className="text-xs text-emerald-400 font-mono-numbers bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                  In Stock · Pakistan
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                  Tactical Highlights
                </span>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CNIC Compliance Notice */}
            {product.isRestrictedItem && (
              <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-300 block mb-0.5">High-Impact Verification Required</strong>
                  This item is designated as controlled tactical equipment. Pakistani CNIC number will be collected during checkout for regulatory compliance.
                </div>
              </div>
            )}

            {/* Quantity Selector & Primary Buy Action */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Quantity:</span>
                <div className="flex items-center border border-zinc-700 rounded bg-zinc-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono-numbers font-bold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm text-zinc-300 hover:text-white hover:bg-zinc-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_30px_rgba(225,29,72,0.6)] flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart ({formatPKR(product.pricePKR * quantity)})</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-lg border transition-all ${
                    isWishlisted
                      ? 'bg-rose-950 border-rose-500 text-rose-400'
                      : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                Technical Specifications
              </span>
              <div className="rounded-lg bg-zinc-900/80 border border-zinc-800 overflow-hidden text-xs font-mono-numbers divide-y divide-zinc-800">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="flex justify-between px-3.5 py-2.5">
                    <span className="text-zinc-400">{spec.label}</span>
                    <span className="text-zinc-200 font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="pt-12 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-display">Verified Field Testimonials</h2>
              <p className="text-xs text-zinc-400">Feedback from Pakistani civilian and security practitioners</p>
            </div>
            <div className="flex items-center gap-1.5 text-sm font-mono-numbers text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold">{product.rating}</span>
              <span className="text-zinc-400">/ 5.0</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#121217] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Hamza K.</span>
                <span className="text-zinc-500 font-mono-numbers">Karachi, Clifton</span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                "Arrived via TCS in 2 days. The build quality and edge retention are top-tier. Exceptional ergonomics on the ring grip."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121217] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Major (R) Tariq M.</span>
                <span className="text-zinc-500 font-mono-numbers">Lahore, DHA</span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                "Solid metallurgy and genuine D2 tool steel. Glad to see an authentic Pakistani store enforcing proper CNIC compliance."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#121217] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Zainab R.</span>
                <span className="text-zinc-500 font-mono-numbers">Islamabad, F-7</span>
              </div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                "Discrete delivery and excellent peace of mind for daily commutes. The customer service answered all queries regarding legal use."
              </p>
            </div>
          </div>
        </section>

        {/* Related Gear */}
        <section className="pt-12 border-t border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white font-display">Complementary Tactical Equipment</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayRelated.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
