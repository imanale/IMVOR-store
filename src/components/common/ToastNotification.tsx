import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const ToastNotification: React.FC = () => {
  const { toast, clearToast } = useCartStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-[#121217] border border-rose-500/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] text-white text-xs max-w-sm animate-fade-in backdrop-blur-md">
      {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
      {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />}
      {toast.type === 'info' && <Info className="w-4 h-4 text-rose-400 shrink-0" />}

      <span className="flex-1 font-medium">{toast.message}</span>

      <button
        onClick={clearToast}
        className="text-zinc-500 hover:text-white transition-colors"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
