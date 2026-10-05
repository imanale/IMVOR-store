import React from 'react';
import { 
  Shield, 
  Database, 
  Truck, 
  CreditCard, 
  Lock, 
  Scale, 
  ExternalLink 
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const Footer: React.FC = () => {
  const { setActivePage, setIsDbModalOpen, setIsAgeModalOpen } = useCartStore();

  return (
    <footer className="border-t border-white/10 bg-[#070709] text-zinc-400 text-xs">
      {/* Top Value Strip */}
      <div className="border-b border-white/5 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-zinc-900 text-rose-500 border border-white/5 shrink-0">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white text-xs block">Lawful Civilian Defense</strong>
              <span className="text-[11px] text-zinc-500">
                Operating strictly within PPC Sections 96–106 protection rights in Pakistan.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-zinc-900 text-rose-500 border border-white/5 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white text-xs block">TCS & Leopards Delivery</strong>
              <span className="text-[11px] text-zinc-500">
                Nationwide 24–48h expedited dispatch in tamper-evident secure cargo packaging.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-zinc-900 text-rose-500 border border-white/5 shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white text-xs block">Pakistani Rupee Engine</strong>
              <span className="text-[11px] text-zinc-500">
                JazzCash, EasyPaisa, Raast instant IBFT, cards, and SMS-verified COD.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-zinc-900 text-rose-500 border border-white/5 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <strong className="text-white text-xs block">18+ Age & CNIC Audit</strong>
              <span className="text-[11px] text-zinc-500">
                Strict age verification and CNIC verification for regulated tactical items.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Brand Column (2 cols) */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-rose-600 to-rose-950 flex items-center justify-center border border-rose-500/40">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-widest text-white">
              IMVOR
            </span>
          </div>

          <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
            High-end tactical personal defense, cryogenic EDC blades, and safety equipment platform engineered for Pakistan. Denominated strictly in Pakistani Rupees (₨).
          </p>

          <div className="space-y-1 text-[11px] text-zinc-500">
            <div>Founder & Lead: <strong className="text-zinc-300">Iman</strong></div>
            <div>Operations: Karachi · Lahore · Islamabad</div>
            <div>Currency Standard: Pakistani Rupees (PKR / ₨)</div>
          </div>
        </div>

        {/* Divisions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
            Tactical Divisions
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActivePage('catalog')} className="hover:text-rose-400 transition-colors">
                Karambit Knives (5 PRD Models)
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('catalog')} className="hover:text-rose-400 transition-colors">
                EDC Folding Pocket Knives
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('catalog')} className="hover:text-rose-400 transition-colors">
                Arc Stun Flashlights & Tasers
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('catalog')} className="hover:text-rose-400 transition-colors">
                Crossfire Pepper Gel Canisters
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('catalog')} className="hover:text-rose-400 transition-colors">
                .177 Caliber Tactical Airguns
              </button>
            </li>
          </ul>
        </div>

        {/* Governance & Compliance */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
            Compliance & System
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActivePage('safety')} className="hover:text-rose-400 transition-colors">
                Safety & Legal Compliance
              </button>
            </li>
            <li>
              <button onClick={() => setIsAgeModalOpen(true)} className="hover:text-rose-400 transition-colors">
                18+ Age Verification Policy
              </button>
            </li>
            <li>
              <button onClick={() => setIsDbModalOpen(true)} className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-rose-500" />
                <span>PostgreSQL & Redis PRD Schema</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('about')} className="hover:text-rose-400 transition-colors">
                Brand Genesis & Founder Story
              </button>
            </li>
            <li>
              <button onClick={() => setActivePage('karambit-lab')} className="hover:text-rose-400 transition-colors">
                360° Interactive Scrubber Lab
              </button>
            </li>
          </ul>
        </div>

        {/* Support & Logistics */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
            Logistics & Support
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => setActivePage('contact')} className="hover:text-rose-400 transition-colors">
                Customer Support Desk
              </button>
            </li>
            <li>
              <span className="text-zinc-500 block">TCS Express Priority</span>
            </li>
            <li>
              <span className="text-zinc-500 block">Leopards Cargo Logistics</span>
            </li>
            <li>
              <span className="text-zinc-500 block">JazzCash & EasyPaisa Engine</span>
            </li>
            <li>
              <span className="text-zinc-500 block">Raast Instant IBFT Verification</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-4 px-4 sm:px-6 lg:px-8 bg-black/60 text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>
          © {new Date().getFullYear()} IMVOR Tactical Systems (Pvt) Ltd. All rights reserved. Pakistan.
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <span>Frontend Prototype Demo</span>
          <span className="text-zinc-600">·</span>
          <span>Founder: Iman</span>
          <span className="text-zinc-600">·</span>
          <button onClick={() => setIsDbModalOpen(true)} className="hover:text-rose-400 underline">
            View PRD Schema
          </button>
        </div>
      </div>
    </footer>
  );
};
