import React from 'react';
import { Shield, Target, Award, Users, Compass, ArrowRight } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useCartStore();

  return (
    <div className="min-h-screen bg-[#09090b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Banner */}
        <div className="text-center space-y-4 pb-10 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono-numbers">
            <Shield className="w-3.5 h-3.5 text-rose-400" />
            <span>FOUNDER & VISION STATEMENT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Forged For Resilience. <br />
            Engineered For Pakistan.
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Founded by <strong className="text-white">Iman</strong>, IMVOR bridges the gap between high-end tactical equipment accessibility and absolute personal security for modern Pakistani civilians.
          </p>
        </div>

        {/* Narrative Section with Image Callout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
            <h2 className="text-xl font-bold text-white font-display">
              The Genesis of IMVOR
            </h2>
            <p>
              In rapidly expanding urban environments across Karachi, Lahore, Rawalpindi, and Peshawar, personal security and outdoor readiness have shifted from occasional considerations into indispensable daily priorities.
            </p>
            <p className="text-zinc-400 text-xs">
              Historically, Pakistani consumers faced an untenable choice: either unreliable, fragile counterfeit tools sold on street corners or exorbitantly marked-up overseas imports lacking customer support or legal clarity.
            </p>
            <p>
              IMVOR was launched to eliminate this compromise. Every blade profile, stun arc circuit, and pepper formula in our armory undergoes rigorous metallurgical, ergonomic, and regulatory benchmarking before civilian release.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-rose-500/30 bg-[#121217] p-2 shadow-2xl">
            <img
              src="/src/assets/images/hero_tactical_imvor_1791222158030.jpg"
              alt="IMVOR Craftsmanship"
              referrerPolicy="no-referrer"
              className="w-full aspect-[4/3] object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 z-10 text-xs font-mono-numbers text-zinc-300">
              <span className="text-rose-400 font-bold block">IMVOR ARCHITECTURAL METALLURGY</span>
              <span>Cryogenic Quenching & CNC Tolerance Verification</span>
            </div>
          </div>
        </div>

        {/* 4 Core Tenets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Target className="w-4 h-4" />
              <span>Uncompromising Materials</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              We employ authentic D2 cryo tool steel, VG-10, 4140 hardened chrome molybdenum, and aerospace 6061-T6 aluminum. No cheap pot metals or brittle alloys.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Award className="w-4 h-4" />
              <span>Pakistani Market Focus</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Native PKR currency engine, integrated local payment solutions (JazzCash, EasyPaisa, Raast), and expedited 24–48 hour delivery via TCS and Leopards.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Shield className="w-4 h-4" />
              <span>Lawful Civilian Security</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Strict adherence to age verification (18+) and automated CNIC identity audit for high-impact tools, fostering responsible ownership culture.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              <span>Founder Commitment</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Under Founder Iman's direct guidance, customer support and equipment servicing are handled directly from dispatch hubs in Karachi and Lahore.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <button
            onClick={() => setActivePage('catalog')}
            className="py-3.5 px-8 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] inline-flex items-center gap-2"
          >
            <span>Explore The Complete Armory</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
