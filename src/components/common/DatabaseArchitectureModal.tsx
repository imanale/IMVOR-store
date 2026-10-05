import React, { useState } from 'react';
import { Database, Server, X, Check, ShieldCheck, Zap } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const DatabaseArchitectureModal: React.FC = () => {
  const { isDbModalOpen, setIsDbModalOpen } = useCartStore();
  const [activeTab, setActiveTab] = useState<'tables' | 'redis' | 'compliance'>('tables');

  if (!isDbModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-[#0d0d12] border border-zinc-700 rounded-xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-rose-950/80 border border-rose-600/50 flex items-center justify-center text-rose-400">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-display">
                  IMVOR PRD Database & Backend Specification
                </h3>
                <span className="text-[10px] font-mono-numbers px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  PostgreSQL + Redis
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Founder Iman · Technical Architecture & CNIC Regulatory Schema
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDbModalOpen(false)}
            className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-zinc-800 bg-[#09090c]">
          <button
            onClick={() => setActiveTab('tables')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'tables' 
                ? 'border-rose-500 text-rose-400' 
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            PostgreSQL Relational Schema
          </button>
          <button
            onClick={() => setActiveTab('redis')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'redis' 
                ? 'border-rose-500 text-rose-400' 
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            Redis Session & Cart Hold
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'compliance' 
                ? 'border-rose-500 text-rose-400' 
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            CNIC Regulatory Engine
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'tables' && (
            <div className="space-y-5">
              <p className="text-xs text-zinc-400">
                Directly from Section 6 of the IMVOR PRD: High-availability relational database schema maintaining rigorous transaction isolation and audit compliance for defense equipment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono-numbers text-xs">
                {/* Users Table */}
                <div className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-700/50">
                    <span className="font-bold text-rose-400 text-sm">Table: users</span>
                    <span className="text-[10px] text-zinc-500">PostgreSQL</span>
                  </div>
                  <ul className="space-y-1.5 text-zinc-300">
                    <li><span className="text-amber-400">user_id</span>: UUID PRIMARY KEY</li>
                    <li><span className="text-zinc-400">full_name</span>: VARCHAR(255) NOT NULL</li>
                    <li><span className="text-zinc-400">email</span>: VARCHAR(255) UNIQUE NOT NULL</li>
                    <li><span className="text-zinc-400">password_hash</span>: VARCHAR(255) NOT NULL</li>
                    <li><span className="text-zinc-400">phone_number</span>: VARCHAR(32)</li>
                    <li><span className="text-rose-300 font-semibold">cnic_number</span>: VARCHAR(15) INDEX</li>
                    <li><span className="text-zinc-500">created_at</span>: TIMESTAMPTZ DEFAULT NOW()</li>
                  </ul>
                </div>

                {/* Products Table */}
                <div className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-700/50">
                    <span className="font-bold text-rose-400 text-sm">Table: products</span>
                    <span className="text-[10px] text-zinc-500">PostgreSQL</span>
                  </div>
                  <ul className="space-y-1.5 text-zinc-300">
                    <li><span className="text-amber-400">product_id</span>: VARCHAR(64) PRIMARY KEY</li>
                    <li><span className="text-zinc-400">name</span>: VARCHAR(255) NOT NULL</li>
                    <li><span className="text-zinc-400">category</span>: VARCHAR(64) NOT NULL</li>
                    <li><span className="text-emerald-400 font-semibold">price_pkr</span>: DECIMAL(12, 2) NOT NULL</li>
                    <li><span className="text-zinc-400">stock_qty</span>: INTEGER DEFAULT 0</li>
                    <li><span className="text-rose-400 font-semibold">is_restricted_item</span>: BOOLEAN</li>
                  </ul>
                </div>

                {/* Orders Table */}
                <div className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-700/50">
                    <span className="font-bold text-rose-400 text-sm">Table: orders</span>
                    <span className="text-[10px] text-zinc-500">PostgreSQL</span>
                  </div>
                  <ul className="space-y-1.5 text-zinc-300">
                    <li><span className="text-amber-400">order_id</span>: VARCHAR(32) PRIMARY KEY</li>
                    <li><span className="text-amber-400">user_id</span>: UUID REFERENCES users(user_id)</li>
                    <li><span className="text-emerald-400 font-semibold">total_pkr</span>: DECIMAL(12, 2) NOT NULL</li>
                    <li><span className="text-zinc-400">payment_method</span>: VARCHAR(32)</li>
                    <li><span className="text-zinc-400">payment_status</span>: VARCHAR(32)</li>
                    <li><span className="text-zinc-400">shipping_address</span>: TEXT NOT NULL</li>
                    <li><span className="text-zinc-500">created_at</span>: TIMESTAMPTZ DEFAULT NOW()</li>
                  </ul>
                </div>

                {/* Order Items Table */}
                <div className="p-4 rounded-lg bg-zinc-900/70 border border-zinc-800">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-700/50">
                    <span className="font-bold text-rose-400 text-sm">Table: order_items</span>
                    <span className="text-[10px] text-zinc-500">PostgreSQL</span>
                  </div>
                  <ul className="space-y-1.5 text-zinc-300">
                    <li><span className="text-amber-400">item_id</span>: UUID PRIMARY KEY</li>
                    <li><span className="text-amber-400">order_id</span>: VARCHAR(32) REFERENCES orders</li>
                    <li><span className="text-amber-400">product_id</span>: VARCHAR(64) REFERENCES products</li>
                    <li><span className="text-zinc-400">quantity</span>: INTEGER NOT NULL</li>
                    <li><span className="text-emerald-400 font-semibold">unit_price_pkr</span>: DECIMAL(12, 2)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'redis' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-800/40 text-xs text-rose-200 flex items-start gap-3">
                <Zap className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-sm">10-Minute High-Demand Stock Lock</h4>
                  <p className="mt-1 leading-relaxed">
                    According to PRD Section 4: High-demand tactical equipment (such as Talon-V Combat Karambits and .177 Airguns) is reserved in Redis with a 600-second TTL (Time-To-Live). This prevents stock hoarding while ensuring genuine buyers have guaranteed allocation during checkout.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 font-mono-numbers text-xs space-y-2">
                <div className="text-zinc-400">Redis Key Patterns:</div>
                <div className="text-emerald-400">cart:hold:user_{`{uid}`}:{`{product_id}`} &rarr; EXPIRE 600</div>
                <div className="text-zinc-300">session:token:{`{session_id}`} &rarr; JSON(cart_items, verified_cnic)</div>
                <div className="text-amber-400">rate_limit:cod_otp:{`{phone}`} &rarr; MAX 3 attempts / 15m</div>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300 leading-relaxed space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>National CNIC Verification Requirement (Pakistan)</span>
                </div>
                <p>
                  As mandated in PRD Section 7, all high-impact defense items (including air rifles, combat karambits, and heavy stun batons) require an automated CNIC check at checkout. The system records the 13-digit Pakistani identification number to comply with domestic lawful civilian trade guidelines.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-400 block text-[11px]">Format Standard</span>
                    <strong className="text-white font-mono-numbers text-xs">XXXXX-XXXXXXX-X</strong>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-400 block text-[11px]">Minimum Age</span>
                    <strong className="text-white font-mono-numbers text-xs">18+ Years</strong>
                  </div>
                  <div className="p-2.5 rounded bg-zinc-950 border border-zinc-800">
                    <span className="text-zinc-400 block text-[11px]">Audit Retention</span>
                    <strong className="text-white font-mono-numbers text-xs">Encrypted at Rest</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-[#09090c] flex items-center justify-between text-xs text-zinc-500">
          <span>IMVOR Architecture Engine · Founder: Iman</span>
          <button
            onClick={() => setIsDbModalOpen(false)}
            className="px-4 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-white font-medium"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
