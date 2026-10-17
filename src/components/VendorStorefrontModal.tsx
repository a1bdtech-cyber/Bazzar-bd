import React from 'react';
import { 
  X, 
  Store, 
  ShieldCheck, 
  Star, 
  MapPin, 
  Phone, 
  RotateCcw, 
  Package
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const VendorStorefrontModal: React.FC = () => {
  const { 
    activeVendorStore, 
    setActiveVendorStore, 
    products 
  } = useShop();

  if (!activeVendorStore) return null;

  const vendorProducts = products.filter(p => p.vendorId === activeVendorStore.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveVendorStore(null)}
          className="absolute right-3 top-3 z-20 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Banner */}
        <div className="relative h-44 sm:h-56 w-full bg-slate-800 overflow-hidden">
          <img 
            src={activeVendorStore.bannerUrl} 
            alt={activeVendorStore.shopNameBn} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
          
          {/* Shop Header Details on Banner */}
          <div className="absolute bottom-4 left-4 sm:left-6 flex items-end gap-3 text-white">
            <img 
              src={activeVendorStore.logoUrl} 
              alt={activeVendorStore.shopNameBn} 
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white shadow-lg bg-white"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg sm:text-2xl font-bold font-['Hind_Siliguri']">{activeVendorStore.shopNameBn}</h2>
                {activeVendorStore.isVerified && (
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                )}
              </div>
              <p className="text-xs text-slate-200 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {activeVendorStore.district}, {activeVendorStore.division} • যোগদানের তারিখ: {activeVendorStore.joinedDate}
              </p>
            </div>
          </div>
        </div>

        {/* Shop Info bar */}
        <div className="px-4 sm:px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-slate-800">{activeVendorStore.rating}</span>
              <span className="text-slate-400 font-normal">({activeVendorStore.reviewCount} রিভিউ)</span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Package className="w-4 h-4 text-teal-700" />
              <span>{vendorProducts.length} টি পণ্য লাইভ</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[11px] truncate max-w-xs">{activeVendorStore.returnPolicyBn}</span>
          </div>
        </div>

        {/* Vendor Products Grid */}
        <div className="p-4 sm:p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 font-['Hind_Siliguri']">
            দোকানের সকল পণ্যসমূহ ({vendorProducts.length})
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {vendorProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
