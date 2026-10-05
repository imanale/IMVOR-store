import React from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Lock, 
  AlertTriangle, 
  Truck, 
  FileText, 
  UserCheck 
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const SafetyCompliancePage: React.FC = () => {
  const { setActivePage } = useCartStore();

  return (
    <div className="min-h-screen bg-[#09090b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono-numbers">
            <Scale className="w-3.5 h-3.5 text-rose-400" />
            <span>LEGAL FRAMEWORK & REGULATORY STANDARDS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Safety & Legal Compliance
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            IMVOR operates in rigorous compliance with domestic trade statutes, responsible civilian security guidelines, and verified age governance across Pakistan.
          </p>
        </div>

        {/* 6 Core Compliance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Age Verification */}
          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/80 border border-rose-600/40 flex items-center justify-center text-rose-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white font-display">
              Strict 18+ Age Verification
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              In accordance with retail standards, access to IMVOR catalog items (folding EDC knives, tactical tools, pepper spray canisters, and air rifles) is strictly limited to adults. Verification is audited at store entry and confirmed with identity checks during purchase.
            </p>
          </div>

          {/* 2. Pakistani Legal Defense Framework */}
          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white font-display">
              Right to Private Defense (PPC 96–106)
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every civilian in Pakistan is endowed with the inherent legal right of private defense under Sections 96 through 106 of the Pakistan Penal Code (PPC). IMVOR equipment is curated solely for deterrence, safety preservation, and emergency personal protection.
            </p>
          </div>

          {/* 3. National CNIC Registration */}
          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white font-display">
              CNIC Audit for Regulated Gear
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              High-impact defense items (including tactical fixed karambits, expandable batons, and .177 caliber airguns) mandate valid 13-digit Pakistani CNIC recording prior to dispatch. Records are maintained in encrypted PostgreSQL databases per PRD section 6.
            </p>
          </div>

          {/* 4. Safe Storage Protocols */}
          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white font-display">
              Owner Responsibility & Storage
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              All tactical and defensive instruments must be stored securely out of reach of minors. Blades should remain locked in sheaths or closed with liner-locks engaged. Chemical pepper gels should be kept in cool environments away from direct vehicular engine heat.
            </p>
          </div>

          {/* 5. Courier Transit Standards */}
          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-purple-400">
              <Truck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white font-display">
              Insured Courier Protocols (TCS / Leopards)
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dispatches are sealed in opaque, tamper-evident security cartons bearing no external weapon branding. All shipments are insured against theft and transit loss across Pakistani cargo networks with real-time consignment tracking.
            </p>
          </div>

          {/* 6. Unlawful Misuse Prohibitions */}
          <div className="p-6 rounded-xl bg-[#121217] border border-white/5 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-rose-950/60 border border-rose-600/40 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-white font-display">
              Zero Tolerance for Misuse
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              IMVOR products must never be brandished menacingly, utilized in offensive criminal enterprise, or carried into restricted government zones, airports, or judicial facilities. Unlawful weapon use is punishable under Pakistani law.
            </p>
          </div>
        </div>

        {/* Interactive Notice Callout */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-[#15151c] to-zinc-900 border border-rose-500/30 text-center space-y-4">
          <ShieldCheck className="w-8 h-8 text-rose-400 mx-auto" />
          <h3 className="text-lg font-bold text-white font-display">
            Need Guidance on Lawful Defense Gear?
          </h3>
          <p className="text-xs text-zinc-300 max-w-lg mx-auto">
            Our safety consulting desk is available to advise civilian buyers, security coordinators, and outdoor professionals regarding compliant equipment selection.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => setActivePage('contact')}
              className="px-5 py-2.5 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Contact Legal & Safety Desk
            </button>
            <button
              onClick={() => setActivePage('catalog')}
              className="px-5 py-2.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Browse Approved Gear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
