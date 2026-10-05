import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const ContactPage: React.FC = () => {
  const { showToast } = useCartStore();
  
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCity, setFormCity] = useState('Karachi');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is purchasing and carrying tactical tools legal for civilians in Pakistan?',
      a: 'Yes. Under the Pakistan Penal Code (PPC Sections 96–106), every adult citizen possesses the lawful right of private defense of person and property. IMVOR exclusively sells non-prohibited civilian security gear, everyday carry utility blades, pepper formulas, and target training airguns that adhere strictly to Pakistani trade and legal statutes.'
    },
    {
      q: 'Why does IMVOR require my CNIC number for certain items?',
      a: 'In adherence with Pakistani retail guidelines, high-impact defensive instruments (such as .177 air rifles, combat karambits, and heavy stun batons) require identity and age verification (18+). Storing the 13-digit CNIC ensures complete accountability and safeguards against unauthorized underage procurement.'
    },
    {
      q: 'What are the delivery times and couriers used across Pakistan?',
      a: 'We partner with Pakistan’s premier logistics networks: TCS Express, Leopards Courier, and M&P Logistics. Orders to major metropolitan areas (Karachi, Lahore, Islamabad/Rawalpindi, Faisalabad) typically arrive within 24 to 48 hours. Regional locations arrive in 2 to 3 business days.'
    },
    {
      q: 'Which Pakistani payment methods can I use?',
      a: 'We support all major local payment rails denominated strictly in Pakistani Rupees (PKR): JazzCash mobile wallet, EasyPaisa mobile account, instant Bank Transfer via Raast (State Bank of Pakistan rails), Visa/Mastercard credit/debit cards, and Cash on Delivery (COD) with automated SMS verification.'
    },
    {
      q: 'What is the 10-minute stock holding timer in the cart?',
      a: 'Because our high-demand tactical items (such as the Talon-V Karambit and .177 Airguns) are imported and machined in strictly controlled production runs, items placed in your cart are temporarily reserved for 10 minutes in our Redis cache to ensure availability while you finalize payment.'
    },
    {
      q: 'Can I inspect products in person before purchasing?',
      a: 'Civilians and security coordinators may schedule equipment viewings at our corporate dispatch facilities in Karachi (Phase 6 DHA) and Lahore (Gulberg III) by contacting our customer support desk in advance.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast('Support ticket dispatched to IMVOR operations team', 'success');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono-numbers">
            <Mail className="w-3.5 h-3.5 text-rose-400" />
            <span>DIRECT SUPPORT & DISPATCH CENTERS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Connect With IMVOR
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Our specialized tactical support staff and safety advisory desk are available 6 days a week to answer inquiries across Pakistan.
          </p>
        </div>

        {/* 2-Column: Form + Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#121217] border border-white/5 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white font-display mb-1">
                Transmit an Inquiry
              </h2>
              <p className="text-xs text-zinc-400">
                Direct transmission to Founder Iman's operations team. Typical response time &lt; 3 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-zinc-900/80 border border-emerald-500/40 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white font-display">Inquiry Transmitted</h3>
                <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{formName}</strong>. Our Karachi operations team has received your ticket and will respond via phone or email shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormMessage('');
                  }}
                  className="py-2 px-4 rounded bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-300 font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Bilal Khan"
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
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="bilal@example.com"
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                      Contact Phone (Pakistan)
                    </label>
                    <input
                      type="text"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="0300-XXXXXXX"
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white font-mono-numbers placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                      City
                    </label>
                    <input
                      type="text"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      placeholder="Karachi, Lahore, Islamabad..."
                      className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block">
                    Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Provide details regarding product specifications, CNIC requirements, corporate security procurement, or courier tracking..."
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Transmitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Support Hubs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Contact Channels */}
            <div className="p-6 rounded-2xl bg-[#121217] border border-white/5 space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Support Channels (PKR)
              </h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-rose-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Direct Support Hotline</span>
                    <strong className="text-white font-mono-numbers text-xs">+92 (21) 3589-4686 / 0300-846-8671</strong>
                    <span className="text-[10px] text-zinc-500 block">Mon–Sat: 10:00 AM – 8:00 PM PKT</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-rose-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-[11px]">Electronic Inquiries</span>
                    <strong className="text-white font-mono-numbers text-xs">support@imvor.pk</strong>
                    <span className="text-[10px] text-zinc-500 block">Founder Desk: iman@imvor.pk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Dispatch Hubs */}
            <div className="p-6 rounded-2xl bg-[#121217] border border-white/5 space-y-4">
              <h3 className="text-sm font-bold text-white font-display uppercase tracking-wider">
                Regional Logistics Hubs
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded bg-zinc-900/80 border border-zinc-800 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Karachi Central Hub (Sindh)</strong>
                    <span className="text-zinc-400 text-[11px]">Bukhari Commercial Area, Phase 6, DHA, Karachi</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-zinc-900/80 border border-zinc-800 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Lahore Regional Dispatch (Punjab)</strong>
                    <span className="text-zinc-400 text-[11px]">Main Boulevard, Gulberg III, Lahore</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-zinc-900/80 border border-zinc-800 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Islamabad Logistics Depot (Federal)</strong>
                    <span className="text-zinc-400 text-[11px]">Blue Area, Sector G-7/1, Islamabad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-8 border-t border-white/10 space-y-6">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 text-xs text-rose-400 font-mono-numbers">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">
              Questions & Practical Clarifications
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-[#121217] border border-white/5 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:text-rose-300"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0 ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-zinc-400 leading-relaxed border-t border-white/5 bg-zinc-900/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
