import React from 'react';
import { 
  Home, 
  LayoutGrid, 
  Heart, 
  ShoppingCart, 
  User, 
  Store 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    totals, 
    wishlist, 
    setIsCartOpen, 
    setIsAuthModalOpen, 
    setActiveCategory, 
    activeCategory,
    activeSegment,
    setActiveSegment,
    resetCategoryFilters,
    currentUser,
    setIsVendorModalOpen
  } = useShop();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <button
          onClick={() => resetCategoryFilters()}
          className={`flex flex-col items-center p-1 transition-colors ${
            activeSegment === null && activeCategory === null ? 'text-teal-700' : 'text-slate-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">হোম</span>
        </button>

        {/* Categories (Men / Women / Others) */}
        <button
          onClick={() => {
            if (!activeSegment) {
              setActiveSegment('men');
            } else if (activeSegment === 'men') {
              setActiveSegment('women');
            } else if (activeSegment === 'women') {
              setActiveSegment('others');
            } else {
              resetCategoryFilters();
            }
          }}
          className={`flex flex-col items-center p-1 transition-colors ${
            activeSegment !== null ? 'text-teal-700 font-bold' : 'text-slate-500'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">
            {activeSegment ? (activeSegment === 'men' ? 'ম্যান' : activeSegment === 'women' ? 'ওম্যান' : 'অন্যান্য') : 'ক্যাটাগরি'}
          </span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center p-1 relative text-slate-700"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-teal-800" />
            {totals.itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-orange-600 text-white font-bold text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                {totals.itemCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5 text-teal-800">কার্ট</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => {
            // trigger wishlist preview
            if (wishlist.length > 0) {
              setIsCartOpen(true);
            }
          }}
          className="flex flex-col items-center p-1 relative text-slate-500"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-rose-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5">পছন্দ</span>
        </button>

        {/* Account / Vendor */}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex flex-col items-center p-1 text-slate-500"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">
            {currentUser.role === 'guest' ? 'লগইন' : 'প্রোফাইল'}
          </span>
        </button>

      </div>
    </nav>
  );
};
