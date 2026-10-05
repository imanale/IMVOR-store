import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, Lock, AlertTriangle } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const AgeVerificationModal: React.FC = () => {
  const { isAgeModalOpen, setIsAgeVerified, setIsAgeModalOpen } = useCartStore();
  const [hasExited, setHasExited] = useState(false);

  if (!isAgeModalOpen) return null;

  if (hasExited) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl">
        <div className="max-w-md w-full bg-[#121216] border border-zinc-800 rounded-xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800/80 text-zinc-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white font-display">Access Restricted</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            In compliance with Pakistan safety standards and legal guidelines, access to IMVOR catalog is restricted to individuals aged 18 and older.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setHasExited(false);
              }}
              className="text-xs text-rose-400 hover:text-rose-300 underline"
            >
              Return to Verification Screen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md">
      <div className="relative max-w-lg w-full bg-[#111116] border border-rose-500/30 rounded-xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Subtle decorative tactical scan accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-600 to-transparent" />
        
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded bg-rose-950/60 border border-rose-600/40 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-mono-numbers text-rose-400 uppercase tracking-wider block">
              Regulatory Compliance Standard
            </span>
            <h2 className="text-xl font-bold text-white font-display">
              Age Verification Required (18+)
            </h2>
          </div>
        </div>

        <div className="space-y-3 text-sm text-zinc-300 leading-relaxed mb-6">
          <p>
            Welcome to <strong className="text-white">IMVOR</strong>. Our catalog contains personal defense tools, EDC blades, pepper formulas, and precision tactical training instruments.
          </p>
          <p className="text-zinc-400 text-xs">
            In strict accordance with Pakistani retail regulations and lawful civilian protection codes, access to our equipment and digital inventory is restricted to verified adults.
          </p>
          <div className="p-3 rounded bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              High-impact items require National Identity Card (CNIC) validation at checkout prior to order dispatch across Pakistan.
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => setIsAgeVerified(true)}
            className="w-full sm:flex-1 py-3 px-4 rounded bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I am 18 or Older — Enter</span>
          </button>
          
          <button
            onClick={() => setHasExited(true)}
            className="w-full sm:w-auto py-3 px-6 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-sm font-medium border border-zinc-800 transition-colors"
          >
            Exit
          </button>
        </div>

        <p className="text-[11px] text-zinc-600 text-center mt-4">
          By proceeding, you agree to IMVOR Terms of Service and lawful self-defense compliance.
        </p>
      </div>
    </div>
  );
};
