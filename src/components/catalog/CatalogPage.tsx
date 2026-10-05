import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ShieldCheck, 
  X,
  Filter
} from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCategory } from '../../types';
import { ProductCard } from './ProductCard';
import { formatPKR } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';

export const CatalogPage: React.FC = () => {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter } = useCartStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(160000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlyRestricted, setOnlyRestricted] = useState<boolean>(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const categories: { id: ProductCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Tactical Systems' },
    { id: 'karambit', label: 'Karambit Knives' },
    { id: 'pocket-knives', label: 'Pocket Knives' },
    { id: 'stun-taser', label: 'Stun Guns & Tasers' },
    { id: 'pepper-spray', label: 'Pepper Sprays' },
    { id: 'airguns', label: 'Airguns' },
    { id: 'gadgets', label: 'Defense Gadgets' },
  ];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (categoryFilter !== 'all' && product.category !== categoryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.categoryLabel.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      // Price filter
      if (product.pricePKR > maxPrice) {
        return false;
      }
      // Stock filter
      if (onlyInStock && !product.inStock) {
        return false;
      }
      // Restricted filter
      if (onlyRestricted && !product.isRestrictedItem) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePKR - b.pricePKR;
      if (sortBy === 'price-desc') return b.pricePKR - a.pricePKR;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [categoryFilter, searchQuery, maxPrice, onlyInStock, onlyRestricted, sortBy]);

  return (
    <div className="min-h-screen bg-[#09090b] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Catalog Banner */}
        <div className="pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono-numbers text-rose-400 uppercase tracking-widest block mb-1">
              IMVOR Master Inventory · Pakistan Standard
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Tactical Catalog & Armory
            </h1>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
              Authentic combat knives, defense electro-flashlights, certified pepper gels, and training airguns strictly priced in Pakistani Rupees (₨).
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden py-2 px-3.5 rounded bg-zinc-900 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center gap-2"
            >
              <Filter className="w-3.5 h-3.5 text-rose-400" />
              <span>Filters ({filteredProducts.length})</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700/60 rounded px-3 py-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured" className="bg-[#121217]">Featured Gear</option>
                <option value="price-asc" className="bg-[#121217]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#121217]">Price: High to Low</option>
                <option value="rating" className="bg-[#121217]">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Bar (Interactive segmented buttons) */}
        <div className="py-4 border-b border-white/5 overflow-x-auto no-scrollbar flex items-center gap-2">
          {categories.map((cat) => {
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]'
                    : 'bg-zinc-900/80 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filters (Desktop) */}
          <aside className={`lg:block ${isMobileFilterOpen ? 'block' : 'hidden'} space-y-6`}>
            <div className="p-5 rounded-xl bg-[#121217] border border-white/5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
                  <SlidersHorizontal className="w-4 h-4 text-rose-500" />
                  <span>Refine Parameters</span>
                </div>
                {(searchQuery || categoryFilter !== 'all' || maxPrice < 160000 || onlyInStock || onlyRestricted) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('all');
                      setMaxPrice(160000);
                      setOnlyInStock(false);
                      setOnlyRestricted(false);
                    }}
                    className="text-[11px] text-rose-400 hover:underline"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Keyword Search */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                  Keyword Search
                </label>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search model, steel, FPS..."
                    className="w-full bg-zinc-900/90 border border-zinc-700/60 rounded px-3 py-2 pl-9 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400 uppercase tracking-wider font-semibold">Max Price</span>
                  <span className="font-mono-numbers font-bold text-white">{formatPKR(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="160000"
                  step="1000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <div className="flex justify-between text-[10px] font-mono-numbers text-zinc-500">
                  <span>₨ 2,000</span>
                  <span>₨ 160,000</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-2 border-t border-white/5">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-rose-600 focus:ring-0 w-4 h-4"
                  />
                  <span>Show In-Stock Only</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs text-zinc-300">
                  <input
                    type="checkbox"
                    checked={onlyRestricted}
                    onChange={(e) => setOnlyRestricted(e.target.checked)}
                    className="rounded bg-zinc-900 border-zinc-700 text-rose-600 focus:ring-0 w-4 h-4"
                  />
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>CNIC Verified Gear Only</span>
                  </div>
                </label>
              </div>

              {/* PRD Compliance Callout Box */}
              <div className="p-3 rounded bg-zinc-950/60 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
                <strong className="text-zinc-200 block mb-1">Pakistan Lawful Defense</strong>
                All listed tactical items comply with civil defense statutes. High impact instruments require CNIC submission prior to fulfillment.
              </div>
            </div>
          </aside>

          {/* Product Grid Area (3 cols desktop) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-[#121217] border border-white/5 space-y-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">No tactical gear matched</h3>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Try adjusting your search criteria, widening the price slider, or selecting another equipment division.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setMaxPrice(160000);
                  }}
                  className="px-4 py-2 rounded bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
