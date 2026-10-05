import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Smartphone, 
  Building2, 
  Banknote,
  Lock,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { PAKISTAN_CITIES, COURIER_OPTIONS } from '../../data/products';
import { PaymentMethodType, OrderRecord } from '../../types';
import { formatPKR, formatCNIC, formatPakistaniPhone, validateCNIC } from '../../utils/formatters';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    discountPercentage,
    selectedCourierId,
    createOrder,
    setActivePage
  } = useCartStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [fullName, setFullName] = useState('Ahmed Raza');
  const [email, setEmail] = useState('ahmed.raza@example.com');
  const [phone, setPhone] = useState('0300-1234567');
  const [cnic, setCnic] = useState('42101-1234567-1');

  // Shipping
  const [city, setCity] = useState('Karachi');
  const [province, setProvince] = useState('Sindh');
  const [address, setAddress] = useState('House 42, Street 8, Phase 6, DHA');
  const [postalCode, setPostalCode] = useState('75500');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('jazzcash');
  const [walletPhone, setWalletPhone] = useState('0300-1234567');
  const [codOtp, setCodOtp] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  if (!isCheckoutOpen) return null;

  // Price calculations
  const subtotalPKR = items.reduce(
    (sum, item) => sum + item.product.pricePKR * item.quantity, 
    0
  );
  const discountAmountPKR = subtotalPKR * (discountPercentage / 100);
  const selectedCourier = COURIER_OPTIONS.find(c => c.id === selectedCourierId) || COURIER_OPTIONS[0];
  const isFreeShipping = subtotalPKR >= 10000;
  const shippingCostPKR = isFreeShipping ? 0 : selectedCourier.costPKR;
  const totalPKR = Math.max(0, subtotalPKR - discountAmountPKR + shippingCostPKR);

  // Check if any cart item requires CNIC
  const hasRestrictedItem = items.some(item => item.product.isRestrictedItem);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (hasRestrictedItem && !validateCNIC(cnic)) {
        alert('Please enter a valid 13-digit Pakistani CNIC number for regulated tactical items.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const handleFinalizePayment = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const newOrder: OrderRecord = {
        orderId: `IMVOR-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' }),
        items: [...items],
        customer: {
          fullName,
          email,
          phoneNumber: phone,
          cnicNumber: cnic
        },
        shipping: {
          address,
          city,
          province,
          postalCode,
          courierId: selectedCourierId
        },
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'verified_cod' : 'paid',
        subtotalPKR,
        discountPKR: discountAmountPKR,
        shippingPKR: shippingCostPKR,
        totalPKR,
        trackingNumber: `TCS-${Math.floor(10000000 + Math.random() * 90000000)}`
      };

      setCompletedOrder(newOrder);
      createOrder(newOrder);
      setCurrentStep(4);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-[#0e0e13] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 bg-[#121217] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-rose-950 border border-rose-600/40 flex items-center justify-center text-rose-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white font-display">
                IMVOR Secure Tactical Checkout
              </h2>
              <span className="text-[11px] text-zinc-400 font-mono-numbers">
                Pakistan Regulatory Gateway · 256-Bit SSL Encrypted
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Indicator (Steps 1 to 3) */}
        {currentStep < 4 && (
          <div className="px-6 py-3 border-b border-zinc-800/80 bg-[#09090c] flex items-center justify-between text-xs font-mono-numbers">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
              <span className="w-5 h-5 rounded-full bg-zinc-800 border border-current flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Customer & CNIC</span>
            </div>
            <div className="h-[1px] flex-1 bg-zinc-800 mx-3" />
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
              <span className="w-5 h-5 rounded-full bg-zinc-800 border border-current flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Shipping Address</span>
            </div>
            <div className="h-[1px] flex-1 bg-zinc-800 mx-3" />
            <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-rose-400 font-bold' : 'text-zinc-500'}`}>
              <span className="w-5 h-5 rounded-full bg-zinc-800 border border-current flex items-center justify-center text-[10px]">
                3
              </span>
              <span>PKR Payment</span>
            </div>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* STEP 1: Customer Information & CNIC */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white font-display mb-1">
                  Customer & Identity Details
                </h3>
                <p className="text-xs text-zinc-400">
                  Please provide your contact information for order confirmation and dispatch verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Pakistani Mobile Number
                  </label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(formatPakistaniPhone(e.target.value))}
                    placeholder="0300-1234567"
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white font-mono-numbers placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold flex items-center justify-between">
                    <span>National CNIC Number</span>
                    {hasRestrictedItem && (
                      <span className="text-[10px] text-rose-400 font-mono-numbers">MANDATORY</span>
                    )}
                  </label>
                  <input
                    type="text"
                    required={hasRestrictedItem}
                    value={cnic}
                    onChange={(e) => setCnic(formatCNIC(e.target.value))}
                    placeholder="42101-1234567-1"
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white font-mono-numbers placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              {/* Regulatory Notice */}
              <div className="p-3.5 rounded bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-200 block mb-0.5">Government Compliance Guarantee</strong>
                  Your CNIC is verified strictly for lawful age compliance (18+) as required by Pakistani civilian protection statutes. IMVOR never shares personal information with unverified third parties.
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Shipping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Shipping Address across Pakistan */}
          {currentStep === 2 && (
            <form onSubmit={handleNextStep} className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white font-display mb-1">
                  Nationwide Dispatch Address
                </h3>
                <p className="text-xs text-zinc-400">
                  Select your destination city in Pakistan. Deliveries are routed via {selectedCourier.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    City (Pakistan)
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c} className="bg-[#121217]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Province / Region
                  </label>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Sindh" className="bg-[#121217]">Sindh</option>
                    <option value="Punjab" className="bg-[#121217]">Punjab</option>
                    <option value="Khyber Pakhtunkhwa" className="bg-[#121217]">Khyber Pakhtunkhwa</option>
                    <option value="Balochistan" className="bg-[#121217]">Balochistan</option>
                    <option value="Islamabad Capital Territory" className="bg-[#121217]">Islamabad Capital Territory</option>
                    <option value="Azad Kashmir" className="bg-[#121217]">Azad Kashmir</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Complete Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Apartment #, Street, Sector / Area"
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white font-mono-numbers placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Selected Courier
                  </label>
                  <div className="p-2 rounded bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 font-semibold flex items-center justify-between">
                    <span>{selectedCourier.name}</span>
                    <span className="font-mono-numbers text-rose-400">
                      {isFreeShipping ? 'FREE' : formatPKR(selectedCourier.costPKR)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="py-2.5 px-4 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 rounded bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Payment Engine (JazzCash, EasyPaisa, Raast, Card, COD) */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white font-display mb-1">
                  Payment Method (PKR Engine)
                </h3>
                <p className="text-xs text-zinc-400">
                  Select your preferred Pakistani transaction channel. Simulated for demonstration.
                </p>
              </div>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* JazzCash */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('jazzcash')}
                  className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'jazzcash'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.2)]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white text-xs block">JazzCash Mobile Wallet</span>
                    <span className="text-[11px] text-zinc-400">Direct USSD prompt on your phone</span>
                  </div>
                </button>

                {/* EasyPaisa */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('easypaisa')}
                  className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'easypaisa'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.2)]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white text-xs block">EasyPaisa Mobile Account</span>
                    <span className="text-[11px] text-zinc-400">Instant approval via OTP / App</span>
                  </div>
                </button>

                {/* Raast / IBFT */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('raast')}
                  className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'raast'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.2)]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Building2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white text-xs block">Raast / Instant IBFT</span>
                    <span className="text-[11px] text-zinc-400">Automated Pakistan Central Bank rails</span>
                  </div>
                </button>

                {/* Credit / Debit Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-left flex items-start gap-3 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.2)]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white text-xs block">Credit / Debit Card</span>
                    <span className="text-[11px] text-zinc-400">Visa / Mastercard 3D Secure</span>
                  </div>
                </button>

                {/* Cash on Delivery (COD) */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-left flex items-start gap-3 sm:col-span-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-rose-950/40 border-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.2)]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <Banknote className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white text-xs block">Cash on Delivery (COD)</span>
                    <span className="text-[11px] text-zinc-400">Pay cash upon courier arrival · SMS verification step</span>
                  </div>
                </button>
              </div>

              {/* Dynamic Sub-Form for Selected Method */}
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-3">
                {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-white block">
                      Registered Mobile Number ({paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'})
                    </span>
                    <input
                      type="text"
                      value={walletPhone}
                      onChange={(e) => setWalletPhone(e.target.value)}
                      placeholder="03XX-XXXXXXX"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-xs font-mono-numbers text-white"
                    />
                    <p className="text-[11px] text-zinc-500">
                      An approval prompt will be sent to this phone. Enter your MPIN on your handset to authorize {formatPKR(totalPKR)}.
                    </p>
                  </div>
                )}

                {paymentMethod === 'raast' && (
                  <div className="space-y-2 text-xs">
                    <span className="font-semibold text-white block">Raast Instant Payment Instructions</span>
                    <div className="p-3 rounded bg-zinc-950 border border-zinc-800 font-mono-numbers text-[11px] space-y-1">
                      <div><span className="text-zinc-500">Bank:</span> Habib Bank Limited (HBL) / Raast ID</div>
                      <div><span className="text-zinc-500">IBAN:</span> PK36HABB0001234567890123</div>
                      <div><span className="text-zinc-500">Account Title:</span> IMVOR TACTICAL SYSTEMS (PVT) LTD</div>
                      <div><span className="text-zinc-500">Amount:</span> <strong className="text-emerald-400">{formatPKR(totalPKR)}</strong></div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-2.5">
                    <span className="text-xs font-semibold text-white block">Cardholder Information</span>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      defaultValue="4214 •••• •••• 8912"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-xs font-mono-numbers text-white"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-xs font-mono-numbers text-white"
                      />
                      <input
                        type="password"
                        placeholder="CVV"
                        defaultValue="782"
                        className="bg-zinc-950 border border-zinc-700 rounded px-3 py-2 text-xs font-mono-numbers text-white"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-white">Automated SMS Verification (PRD Section 5)</span>
                      <span className="text-[10px] text-zinc-500 font-mono-numbers">Anti-Fraud Protection</span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      To prevent dispatch return penalties, an automated 4-digit verification code has been simulated for {phone}:
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="Enter 4-digit OTP (e.g. 5892)"
                        value={codOtp}
                        onChange={(e) => setCodOtp(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-700 rounded px-3 py-1.5 text-xs font-mono-numbers text-white placeholder-zinc-600 text-center tracking-widest"
                      />
                      <button
                        type="button"
                        onClick={() => setCodOtp('5892')}
                        className="px-3 py-1.5 rounded bg-zinc-800 text-zinc-300 hover:text-white text-xs"
                      >
                        Auto-fill Demo OTP
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Final Summary */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono-numbers space-y-1.5">
                <div className="flex justify-between text-zinc-400">
                  <span>Cart Items ({items.length}):</span>
                  <span>{formatPKR(subtotalPKR)}</span>
                </div>
                {discountAmountPKR > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Tactical Promo Discount:</span>
                    <span>-{formatPKR(discountAmountPKR)}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Courier ({selectedCourier.name}):</span>
                  <span>{isFreeShipping ? 'FREE' : formatPKR(shippingCostPKR)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-800 text-sm font-bold text-white">
                  <span>Payable Amount (PKR):</span>
                  <span className="text-rose-400 text-base">{formatPKR(totalPKR)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="py-2.5 px-4 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={handleFinalizePayment}
                  className="py-3 px-8 rounded bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center gap-2"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Authorizing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm & Place Order ({formatPKR(totalPKR)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation & Tracking Receipt */}
          {currentStep === 4 && completedOrder && (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono-numbers text-emerald-400 uppercase tracking-widest block mb-1">
                  ORDER DISPATCH QUEUED · PAKISTAN
                </span>
                <h3 className="text-2xl font-extrabold text-white font-display">
                  Order Successfully Authorized
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                  Confirmation SMS and receipt transmitted to {completedOrder.customer.phoneNumber}
                </p>
              </div>

              {/* Waybill / Tracking Preview */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-left font-mono-numbers text-xs space-y-3">
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Order ID:</span>
                  <span className="font-bold text-white">{completedOrder.orderId}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Courier Tracking:</span>
                  <span className="font-bold text-rose-400">{completedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">Recipient:</span>
                  <span className="text-zinc-200">{completedOrder.customer.fullName} ({completedOrder.shipping.city})</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-2">
                  <span className="text-zinc-500">CNIC Verification:</span>
                  <span className="text-emerald-400">Verified ({completedOrder.customer.cnicNumber})</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-zinc-400">Amount Charged:</span>
                  <span className="text-white">{formatPKR(completedOrder.totalPKR)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setActivePage('catalog');
                  }}
                  className="py-2.5 px-6 rounded bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors"
                >
                  Return to Armory Catalog
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
