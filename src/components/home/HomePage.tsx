import React, { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  Crosshair, 
  RotateCcw, 
  Truck, 
  Check, 
  Star, 
  Lock, 
  Sparkles,
  Zap,
  Award,
  ChevronRight
} from 'lucide-react';
import { HeroSection } from './HeroSection';
import { KarambitScrubber360 } from './KarambitScrubber360';
import { ProductCard } from '../catalog/ProductCard';
import { PRODUCTS } from '../../data/products';
import { useCartStore } from '../../store/cartStore';

export const HomePage: React.FC = () => {
  const { setActivePage, setCategoryFilter, showToast } = useCartStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Featured 4 items
  const featuredProducts = PRODUCTS.slice(0, 4);

  const categoriesOverview = [
    {
      id: 'karambit',
      title: 'Karambit Combat Knives',
      desc: '5 PRD Variants · D2 Cryo Tool Steel · Hawkbill Curves',
      priceFrom: '₨ 3,500',
      image: '/src/assets/images/product_karambit_talon_1791222316800.jpg',
    },
    {
      id: 'stun-taser',
      title: 'Stun Guns & Arc Flashlights',
      desc: 'High-Voltage Defense · 1,200 Lumen · T6061 Aerospace Alloy',
      priceFrom: '₨ 7,000',
      image: '/src/assets/images/product_stun_taser_1791222330635.jpg',
    },
    {
      id: 'pepper-spray',
      title: 'Pepper Spray & Gels',
      desc: '18ft Crossfire Stream · UV Marking Dye · Zero Blowback',
      priceFrom: '₨ 1,800',
      image: '/src/assets/images/product_pepper_spray_1791222348204.jpg',
    },
    {
      id: 'pocket-knives',
      title: 'EDC Tactical Folders',
      desc: 'Ceramic Caged Bearings · Liner-Lock · Tungsten Glass Breaker',
      priceFrom: '₨ 2,500',
      image: '/src/assets/images/hero_tactical_imvor_1791222158030.jpg',
    },
  ] as const;

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      showToast('Tactical briefing dispatched! Use code IMVOR10 for 10% off', 'success');
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Tactical Systems Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-numbers text-rose-400 uppercase tracking-widest mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Priority Armory Inventory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Featured Tactical Collection
            </h2>
          </div>
          <button
            onClick={() => setActivePage('catalog')}
            className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-400 hover:text-rose-300 transition-colors"
          >
            <span>View Complete Master Catalog</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 3. Karambit 360° Interactive Scrubber Section (PRD Section 3.1) */}
      <KarambitScrubber360 />

      {/* 4. Divisions & Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono-numbers text-rose-400 uppercase tracking-widest block mb-1">
            Engineered Tactical Divisions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Specialized Equipment Categories
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Categorized directly according to the IMVOR PRD tactical matrix with calibrated PKR pricing brackets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesOverview.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setCategoryFilter(cat.id as any);
                setActivePage('catalog');
              }}
              className="group relative h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-rose-500/60 cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-end p-5"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

              {/* Text content */}
              <div className="relative z-10 space-y-1.5">
                <span className="text-[11px] font-mono-numbers text-rose-400 font-bold">
                  Starts from {cat.priceFrom}
                </span>
                <h3 className="text-lg font-bold text-white font-display group-hover:text-rose-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-300 line-clamp-2">
                  {cat.desc}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                  <span>Explore Division</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why IMVOR Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#121217] to-[#0c0c10] border border-white/10 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl">
            <span className="text-xs font-mono-numbers text-rose-400 uppercase tracking-widest block mb-2">
              Architectural Security Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight text-balance">
              Why Pakistani Civilians & Professionals Rely on IMVOR
            </h2>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
              Founded by Iman, IMVOR was established to eradicate unreliable counterfeit defense gear in Pakistan, delivering certified cryogenic metallurgy, non-lethal deterrent tech, and rigorous legal alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-rose-950/80 border border-rose-600/40 flex items-center justify-center text-rose-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Cryogenic Steel & Mil-Spec Anodizing
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Forged from D2, VG-10, and 4140 steel alloys quenched at sub-zero temperatures to ensure extreme fracture resistance and edge retention.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Automated 18+ & CNIC Compliance
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Operating under Pakistan Penal Code sections 96–106. High-impact instruments require customer identity audit to prevent unauthorized procurement.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-white/5 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-400">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-display">
                TCS & Leopards Discreet Logistics
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Tamper-evident unmarked security boxes dispatched with real-time tracking across 1,500+ Pakistani postal destinations within 24 to 48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter with Instant Promo Code Unlock */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative rounded-2xl bg-gradient-to-r from-rose-950/40 via-zinc-900 to-rose-950/40 border border-rose-500/30 p-8 sm:p-10 text-center space-y-5 overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-rose-600/20 border border-rose-500/50 flex items-center justify-center text-rose-400 mx-auto">
            <Zap className="w-6 h-6" />
          </div>

          <div>
            <span className="text-xs font-mono-numbers text-rose-400 uppercase tracking-widest block mb-1">
              ARMORY DISPATCH BRIEFING
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Join the IMVOR Defense Network
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
              Subscribe for equipment release schedules, maintenance guides, and activate promo code <strong className="text-rose-400 font-mono-numbers">IMVOR10</strong> for 10% off your first order.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 max-w-md mx-auto text-xs text-emerald-300 font-mono-numbers">
              Tactical code activated: <strong>IMVOR10</strong> (Apply in cart drawer for 10% off)
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 bg-black/70 border border-zinc-700 rounded-lg px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="py-2.5 px-6 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(225,29,72,0.4)] whitespace-nowrap"
              >
                Claim 10% Off
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
