import React from 'react';
import { Shield, ArrowRight, Crosshair, RotateCcw, CheckCircle, Truck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const HeroSection: React.FC = () => {
  const { setActivePage } = useCartStore();

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-white/10 bg-[#09090b]">
      {/* Background Hero Image with Tactical Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_tactical_imvor_1791222158030.jpg"
          alt="IMVOR Tactical Gear Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse-subtle"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/60 to-transparent" />
        <div className="absolute inset-0 tactical-grid opacity-25" />
        <div className="absolute inset-0 hud-scanline opacity-30 pointer-events-none" />
      </div>

      {/* Futuristic Tactical Reticle HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        {/* Outer Circular Reticle */}
        <div className="relative w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] rounded-full border border-rose-500/15 animate-spin-slow">
          {/* Degree markers */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-rose-500/40" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-0.5 bg-rose-500/40" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-0.5 bg-rose-500/40" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-0.5 bg-rose-500/40" />
        </div>

        {/* Center Crosshair lines */}
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent max-w-4xl" />
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-rose-500/20 to-transparent max-h-[600px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Readiness Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-rose-500/40 text-xs text-rose-300 font-mono-numbers mb-6 shadow-[0_0_20px_rgba(225,29,72,0.25)]">
          <Crosshair className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
          <span className="tracking-wider">DEFENSE READINESS · PAKISTAN SPECIFICATION</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase font-display max-w-4xl leading-[1.08] text-balance">
          Ready For <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-zinc-200 to-rose-400 bg-clip-text text-transparent">
            What's Next.
          </span>
        </h1>

        {/* Brand Description */}
        <p className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl font-normal leading-relaxed text-balance">
          Founded by Iman to engineer the highest standard of personal protection equipment, aerospace-grade EDC blades, and tactical security tools across Pakistan.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => setActivePage('catalog')}
            className="w-full sm:w-auto py-3.5 px-8 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(225,29,72,0.4)] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)] flex items-center justify-center gap-2 group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setActivePage('karambit-lab')}
            className="w-full sm:w-auto py-3.5 px-7 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-sm tracking-wider uppercase border border-zinc-700/80 hover:border-rose-500/50 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>360° Karambit Lab</span>
          </button>
        </div>

        {/* Tactical Badges / Adjacency */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-rose-400 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Lawful Defense</span>
              <span className="text-[11px] text-zinc-400 font-mono-numbers">Pakistani Legal Compliance</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-rose-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">TCS & Leopards</span>
              <span className="text-[11px] text-zinc-400 font-mono-numbers">24–48h Nationwide Cargo</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-rose-400 shrink-0">
              <Crosshair className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Cryo D2 & 4140</span>
              <span className="text-[11px] text-zinc-400 font-mono-numbers">Extreme Impact Standards</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-rose-400 shrink-0">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">PKR Native Engine</span>
              <span className="text-[11px] text-zinc-400 font-mono-numbers">JazzCash, Raast, COD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
