import React from 'react';
import { KarambitScrubber360 } from '../home/KarambitScrubber360';
import { ArrowLeft, ShieldAlert, Award, Compass, Layers } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const KarambitLabPage: React.FC = () => {
  const { setActivePage } = useCartStore();

  return (
    <div className="min-h-screen bg-[#09090b] py-8">
      {/* Back button bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={() => setActivePage('home')}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </button>
      </div>

      {/* Embedded 360 Interactive Scrubber */}
      <KarambitScrubber360 />

      {/* Ergonomic & Tactical Engineering Deep-Dive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/80 border border-rose-600/40 flex items-center justify-center text-rose-400">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Hawkbill Geometry & Redirection
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The ancient sickle curve was adopted by maritime Indonesian navigators and refined for tactical close-quarters defense. The deep concave belly channels kinetic cutting force inward, preventing blade slippage.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Index Finger Safety Retention Ring
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              A 25.4mm chamfered safety ring guarantees continuous weapon retention even if fingers are covered in mud or water, or when wrestling to prevent weapon disarming in close confrontations.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">
              Cryogenic D2 & Cerakote Coating
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sub-zero cryo-treatment hardens the matrix to 60-62 HRC, preserving surgical edge retention through hundreds of abrasive impact cycles while matte Cerakote repels saltwater corrosion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
