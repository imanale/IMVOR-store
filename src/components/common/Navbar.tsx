import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShoppingBag, 
  Search, 
  Heart, 
  Menu, 
  X, 
  Database,
  RotateCcw
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    items, 
    wishlist,
    setIsCartOpen, 
    setIsWishlistOpen,
    setIsDbModalOpen,
    searchQuery,
    setSearchQuery
  } = useCartStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [cartBadgeAnimate, setCartBadgeAnimate] = useState(false);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Trigger bounce animation whenever items count changes
  useEffect(() => {
    if (totalItemsCount > 0) {
      setCartBadgeAnimate(true);
      const timer = setTimeout(() => setCartBadgeAnimate(false), 600);
      return () => clearTimeout(timer);
    }
  }, [totalItemsCount]);

  interface NavItem {
    id: 'catalog' | 'karambit-lab' | 'safety' | 'about' | 'contact';
    label: string;
    highlight?: boolean;
  }

  const navLinks: NavItem[] = [
    { id: 'catalog', label: 'Catalog' },
    { id: 'karambit-lab', label: 'Karambit 360°', highlight: true },
    { id: 'safety', label: 'Safety & Compliance' },
    { id: 'about', label: 'About IMVOR' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#09090b]/85 backdrop-blur-md">
      {/* Top micro bar for market and compliance */}
      <div className="bg-[#121216] border-b border-white/5 py-1 px-4 text-[11px] text-zinc-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-wide">Pakistan Lawful Defense Standard</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-300">All Prices in PKR (₨)</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button 
            onClick={() => setIsDbModalOpen(true)}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-rose-400 transition-colors text-[11px]"
          >
            <Database className="w-3 h-3 text-rose-500" />
            <span>PRD PostgreSQL Architecture</span>
          </button>
          <span className="text-zinc-600">·</span>
          <span>Courier Dispatch via TCS & Leopards</span>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single element brand wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="IMVOR Home"
          >
            <div className="w-8 h-8 rounded bg-gradient-to-br from-rose-600 to-rose-950 flex items-center justify-center border border-rose-500/40 shadow-[0_0_12px_rgba(225,29,72,0.35)] group-hover:shadow-[0_0_18px_rgba(225,29,72,0.6)] transition-all">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-widest text-white leading-none">
                IMVOR
              </span>
              <span className="text-[9px] tracking-[0.25em] text-zinc-400 uppercase font-mono-numbers">
                Tactical Systems
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-7">
          <button
            onClick={() => setActivePage('home')}
            className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
              activePage === 'home' 
                ? 'text-rose-400 border-b border-rose-500 pb-0.5' 
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            Home
          </button>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setActivePage(link.id)}
              className={`text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 ${
                activePage === link.id
                  ? 'text-rose-400 border-b border-rose-500 pb-0.5'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              {link.highlight && (
                <RotateCcw className="w-3 h-3 text-rose-500 animate-spin-slow" />
              )}
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Zone 3: Search, Wishlist, Cart & Mobile Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative">
            {isSearchExpanded ? (
              <div className="flex items-center bg-zinc-900/90 border border-zinc-700/60 rounded-md px-2.5 py-1">
                <Search className="w-3.5 h-3.5 text-zinc-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search gear, specs, airguns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      setActivePage('catalog');
                    }
                  }}
                  autoFocus
                  className="bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none w-36 sm:w-52"
                />
                <button 
                  onClick={() => setIsSearchExpanded(false)}
                  className="text-zinc-500 hover:text-white ml-1 text-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsSearchExpanded(true);
                  if (activePage !== 'catalog') setActivePage('catalog');
                }}
                className="p-2 text-zinc-400 hover:text-white transition-colors rounded hover:bg-zinc-800/60"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="p-2 text-zinc-400 hover:text-rose-400 transition-colors relative rounded hover:bg-zinc-800/60"
            aria-label="Armory Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#09090b]" />
            )}
          </button>

          {/* Cart Icon with ID for particle trajectory landing */}
          <button
            id="nav-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded bg-zinc-900 border border-zinc-700/60 hover:border-rose-500/50 hover:bg-zinc-850 transition-all ${
              cartBadgeAnimate ? 'scale-105 border-rose-500 bg-rose-950/30' : ''
            }`}
            aria-label={`Shopping Cart with ${totalItemsCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-zinc-200" />
              {totalItemsCount > 0 && (
                <span className={`absolute -top-1.5 -right-2 bg-rose-600 text-white font-mono-numbers text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transition-transform ${
                  cartBadgeAnimate ? 'scale-125' : 'scale-100'
                }`}>
                  {totalItemsCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline-block text-xs font-semibold tracking-wider uppercase text-zinc-200">
              Cart
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0d0d11] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => {
              setActivePage('home');
              setIsMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded text-sm font-medium text-zinc-200 hover:bg-zinc-800"
          >
            Home
          </button>
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActivePage(link.id);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 rounded text-sm font-medium text-zinc-200 hover:bg-zinc-800 flex items-center justify-between"
            >
              <span>{link.label}</span>
              {link.highlight && (
                <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-mono-numbers">
                  INTERACTIVE
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between px-3">
            <button
              onClick={() => {
                setIsDbModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-xs text-rose-400 flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5" />
              <span>PostgreSQL PRD Schema</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
