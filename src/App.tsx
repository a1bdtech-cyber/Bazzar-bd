import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { CampaignCarousel } from './components/CampaignCarousel';
import { FlashDeals } from './components/FlashDeals';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AuthModal } from './components/AuthModal';
import { VendorPortalModal } from './components/VendorPortalModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { VendorStorefrontModal } from './components/VendorStorefrontModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { Toast } from './components/Toast';
import { Layers, Sparkles, BookOpen } from 'lucide-react';

const MarketplaceContent: React.FC = () => {
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pb-16 md:pb-0">
      
      {/* Header with Search, Category & Role switches */}
      <Header />

      {/* Quick Category Navigation Bar */}
      <CategoryNav />

      {/* Main Storefront Body */}
      <main className="flex-1">
        
        {/* Architecture & Phase 2 Info Ribbon */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 mt-3">
          <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-white p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs border border-teal-700/50">
            <div className="flex items-center gap-2.5 text-xs text-center sm:text-left">
              <div className="w-8 h-8 rounded-xl bg-emerald-400 text-teal-950 flex items-center justify-center shrink-0 font-bold shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-amber-300">বিশ্বাস বাজার — ফেজ ২: ফায়ারবেস ও ক্লাউড ফায়ারস্টোর সংযুক্ত</p>
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    FIRESTORE LIVE
                  </span>
                </div>
                <p className="text-[11px] text-teal-100">
                  ক্লাউড ফায়ারস্টোর লাইভ ডাটাবেস রিডস, রেস্ট্রিক্টিভ সিকিউরিটি রুলস (RBAC), কম্পোজিট ইনডেক্স এবং ফায়ারবেস অথেন্টিকেশন সফলভাবে ইন্টিগ্রেটেড।
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsArchModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-teal-950 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>আর্কিটেকচার ও ফায়ারস্টোর ব্লুপ্রিন্ট</span>
            </button>
          </div>
        </div>

        {/* Hero Campaign Banners Carousel */}
        <CampaignCarousel />

        {/* Flash Deals Section with Real Countdown Timer */}
        <FlashDeals />

        {/* Dynamic Product Grid with Sorting and Filters */}
        <ProductGrid />

      </main>

      {/* Footer with Trust Pillars & Policies */}
      <Footer />

      {/* Mobile Bottom Thumb Bar */}
      <MobileBottomNav />

      {/* Modals & Slide-overs */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackingModal />
      <AuthModal />
      <VendorPortalModal />
      <AdminPortalModal />
      <VendorStorefrontModal />
      <ArchitectureModal isOpen={isArchModalOpen} onClose={() => setIsArchModalOpen(false)} />
      
      {/* Toast Notifications */}
      <Toast />

    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MarketplaceContent />
    </ShopProvider>
  );
}
