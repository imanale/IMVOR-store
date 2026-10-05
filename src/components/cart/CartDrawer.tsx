import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trash2, 
  Clock, 
  Tag, 
  ArrowRight, 
  ShoppingBag, 
  Check, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { COURIER_OPTIONS } from '../../data/products';
import { formatPKR, formatHoldTimer } from '../../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    removeFromCart,
    updateQuantity,
    promoCode,
    discountPercentage,
    applyPromoCode,
    removePromoCode,
    selectedCourierId,
    setSelectedCourierId,
    stockHoldSeconds,
    tickStockTimer,
    setIsCheckoutOpen,
    setActivePage
  } = useCartStore();

  const [promoInput, setPromoInput] = useState('');

  // 1-second interval timer for stock hold
  useEffect(() => {
    if (!isCartOpen || items.length === 0) return;
    const interval = setInterval(() => {
      tickStockTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [isCartOpen, items.length, tickStockTimer]);

  if (!isCartOpen) return null;

  // Pricing calculations
  const subtotalPKR = items.reduce(
    (sum, item) => sum + item.product.pricePKR * item.quantity, 
    0
  );

  const discountAmountPKR = subtotalPKR * (discountPercentage / 100);

  const selectedCourier = COURIER_OPTIONS.find(c => c.id === selectedCourierId) || COURIER_OPTIONS[0];
  
  // Free delivery threshold over ₨ 10,000
  const isFreeShipping = subtotalPKR >= 10000;
  const shippingCostPKR = items.length === 0 ? 0 : (isFreeShipping ? 0 : selectedCourier.costPKR);

  const totalPKR = Math.max(0, subtotalPKR - discountAmountPKR + shippingCostPKR);

  // Check if any cart item is restricted
  const hasRestrictedItem = items.some(item => item.product.isRestrictedItem);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Glassmorphism Backdrop Blur */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-[10px] transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e13] border-l border-zinc-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-zinc-800/80 bg-[#121217] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-rose-500" />
              <h2 className="text-base font-bold text-white font-display">
                Tactical Armory Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 10-Minute High-Demand Stock Holding Timer (PRD Section 4) */}
          {items.length > 0 && (
            <div className={`px-4 py-2.5 border-b text-xs flex items-center justify-between font-mono-numbers ${
              stockHoldSeconds > 60 
                ? 'bg-rose-950/30 border-rose-900/40 text-rose-300' 
                : 'bg-amber-950/40 border-amber-800/50 text-amber-300 animate-pulse'
            }`}>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                <span>PRD Stock Hold Active:</span>
              </div>
              <strong className="font-bold text-sm tracking-widest">
                {formatHoldTimer(stockHoldSeconds)}
              </strong>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white font-display">Your cart is empty</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Equip yourself with high-grade knives, tactical defense tools, or safety pepper sprays.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setActivePage('catalog');
                  }}
                  className="mt-2 py-2 px-4 rounded bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex gap-3.5"
                >
                  {/* Image */}
                  <div className="w-16 h-16 rounded overflow-hidden bg-black shrink-0 border border-white/5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-500 hover:text-rose-400 transition-colors p-0.5"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] text-zinc-400 font-mono-numbers block">
                      {item.product.categoryLabel}
                    </span>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-zinc-700 rounded bg-black/60 text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono-numbers font-semibold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      {/* Total Price for item */}
                      <span className="font-mono-numbers text-xs font-bold text-white">
                        {formatPKR(item.product.pricePKR * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Courier Network Selector */}
            {items.length > 0 && (
              <div className="pt-3 border-t border-zinc-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-semibold">
                  <Truck className="w-3.5 h-3.5 text-rose-500" />
                  <span>Pakistan Courier Logistics</span>
                </div>
                <div className="space-y-1.5">
                  {COURIER_OPTIONS.map((courier) => (
                    <label
                      key={courier.id}
                      className={`flex items-center justify-between p-2.5 rounded border text-xs cursor-pointer transition-colors ${
                        selectedCourierId === courier.id
                          ? 'bg-rose-950/30 border-rose-600/60 text-white'
                          : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="courier"
                          value={courier.id}
                          checked={selectedCourierId === courier.id}
                          onChange={() => setSelectedCourierId(courier.id)}
                          className="accent-rose-500"
                        />
                        <div>
                          <div className="font-semibold text-white text-[11px]">{courier.name}</div>
                          <div className="text-[10px] text-zinc-500">{courier.estimate}</div>
                        </div>
                      </div>
                      <span className="font-mono-numbers font-bold text-white text-xs">
                        {isFreeShipping ? 'FREE' : formatPKR(courier.costPKR)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Promo Code Box */}
            {items.length > 0 && (
              <div className="pt-2 border-t border-zinc-800">
                {promoCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code <strong>{promoCode}</strong> applied (10% off)</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-xs text-emerald-400 hover:text-emerald-200 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (Try IMVOR10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-zinc-900 border border-zinc-700 rounded px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 border-t border-zinc-800 bg-[#121217] space-y-3 font-mono-numbers text-xs">
              {hasRestrictedItem && (
                <div className="flex items-center gap-2 p-2 rounded bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>CNIC verification will be verified at checkout.</span>
                </div>
              )}

              <div className="space-y-1.5 text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-zinc-200">{formatPKR(subtotalPKR)}</span>
                </div>
                {discountAmountPKR > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount (10%):</span>
                    <span>-{formatPKR(discountAmountPKR)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span className="text-zinc-200">
                    {isFreeShipping ? 'FREE (Orders > ₨ 10,000)' : formatPKR(shippingCostPKR)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-800 text-base font-bold text-white">
                  <span className="font-display font-normal">Final Total:</span>
                  <span className="text-rose-400">{formatPKR(totalPKR)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] hover:shadow-[0_0_25px_rgba(225,29,72,0.6)] flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
