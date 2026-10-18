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
  const { currentUser } = useShop();
  const [isArchModalOpen, setIsArchModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pb-16 md:pb-0">
      
      {/* Header with Search, Category & Role switches */}
      <Header />

      {/* Quick Category Navigation Bar */}
      <CategoryNav />

      {/* Main Storefront Body */}
      <main className="flex-1">
        
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
      <AdminPortalModal onOpenArchitecture={() => setIsArchModalOpen(true)} />
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
