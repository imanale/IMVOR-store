/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useCartStore } from './store/cartStore';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ParticleArc } from './components/common/ParticleArc';
import { AgeVerificationModal } from './components/common/AgeVerificationModal';
import { DatabaseArchitectureModal } from './components/common/DatabaseArchitectureModal';
import { ToastNotification } from './components/common/ToastNotification';
import { WishlistDrawer } from './components/common/WishlistDrawer';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';

// Pages
import { HomePage } from './components/home/HomePage';
import { CatalogPage } from './components/catalog/CatalogPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { SafetyCompliancePage } from './components/pages/SafetyCompliancePage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { KarambitLabPage } from './components/pages/KarambitLabPage';

export default function App() {
  const { activePage } = useCartStore();

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-rose-900 selection:text-white">
      {/* Dynamic Particle Arc from Add-to-Cart button to Cart Icon */}
      <ParticleArc />

      {/* 18+ Age Verification Modal (First entry prompt) */}
      <AgeVerificationModal />

      {/* PRD PostgreSQL & Redis Database Architecture Inspector */}
      <DatabaseArchitectureModal />

      {/* Global Toast Notifications */}
      <ToastNotification />

      {/* Global Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <CheckoutModal />

      {/* Top Navigation Bar */}
      <Navbar />

      {/* Page Routing */}
      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'catalog' && <CatalogPage />}
        {activePage === 'detail' && <ProductDetailPage />}
        {activePage === 'safety' && <SafetyCompliancePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'karambit-lab' && <KarambitLabPage />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
