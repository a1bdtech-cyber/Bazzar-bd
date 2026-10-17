import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ShieldAlert, 
  Check, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Zap, 
  Heart, 
  MapPin,
  Store,
  MessageSquare
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductVariant } from '../types';
import { REVIEWS, VENDORS, LOCALIZED_STRINGS } from '../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setIsCartOpen,
    setIsCheckoutModalOpen,
    setActiveVendorStore
  } = useShop();

  if (!selectedProduct) return null;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    selectedProduct.variants && selectedProduct.variants.length > 0 ? selectedProduct.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'reviews'>('desc');
  const [deliveryLocation, setDeliveryLocation] = useState<'dhaka' | 'outside'>('dhaka');

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const currentPrice = selectedVariant?.salePrice || selectedVariant?.price || selectedProduct.salePrice || selectedProduct.regularPrice;
  const originalPrice = selectedVariant?.price || selectedProduct.regularPrice;
  const currentStock = selectedVariant ? selectedVariant.stock : selectedProduct.stock;
  
  const discountPercent = originalPrice > currentPrice
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  const productReviews = REVIEWS.filter(r => r.productId === selectedProduct.id);
  const vendorObj = VENDORS.find(v => v.id === selectedProduct.vendorId);

  const handleBuyNow = () => {
    addToCart(selectedProduct, selectedVariant, quantity);
    setSelectedProduct(null);
    setIsCheckoutModalOpen(true);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedVariant, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute right-3 top-3 z-20 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 sm:p-8">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
              <img
                src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]}
                alt={selectedProduct.titleBn}
                className="w-full h-full object-cover"
              />
              {discountPercent > 0 && (
                <div className="absolute top-3 left-3 bg-rose-600 text-white font-bold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                  -{discountPercent}% বিশেষ ছাড়
                </div>
              )}
              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-slate-700 rounded-full shadow-xs"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnail selector if multiple images */}
            {selectedProduct.images.length > 1 && (
              <div className="flex gap-2">
                {selectedProduct.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === i ? 'border-teal-600 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Vendor Card Snippet */}
            {vendorObj && (
              <div className="bg-teal-50/70 p-3.5 rounded-2xl border border-teal-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={vendorObj.logoUrl} alt={vendorObj.shopNameBn} className="w-10 h-10 rounded-full object-cover ring-2 ring-teal-600/30" />
                  <div className="truncate">
                    <div className="flex items-center gap-1 font-semibold text-xs text-teal-950 truncate">
                      <span>{vendorObj.shopNameBn}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                    <p className="text-[11px] text-teal-700/80">{vendorObj.district}, {vendorObj.division}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setActiveVendorStore(vendorObj);
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-teal-700 hover:text-white text-teal-800 text-xs font-semibold rounded-xl border border-teal-200 transition-colors shrink-0"
                >
                  দোকান দেখুন
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Information & Purchase options */}
          <div className="flex flex-col">
            
            {/* Category & Verified Badge */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
              <span className="font-medium text-teal-800">{selectedProduct.categoryNameBn}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> ভেরিফাইড বিক্রেতা
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-lg sm:text-2xl font-bold text-slate-900 leading-snug font-['Hind_Siliguri']">
              {selectedProduct.titleBn}
            </h1>

            {/* Rating Summary */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800 text-sm">{selectedProduct.rating.toLocaleString('bn-BD')}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">
                {selectedProduct.reviewCount.toLocaleString('bn-BD')} টি গ্রাহক রিভিউ
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-teal-700 font-medium">
                {selectedProduct.soldCount.toLocaleString('bn-BD')}+ সফল ডেলিভারি
              </span>
            </div>

            {/* Pricing Section */}
            <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-teal-900">
                  ৳{currentPrice.toLocaleString('bn-BD')}
                </span>
                {originalPrice > currentPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ৳{originalPrice.toLocaleString('bn-BD')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    ৳{(originalPrice - currentPrice).toLocaleString('bn-BD')} সাশ্রয়
                  </span>
                )}
              </div>
              <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>স্টক স্ট্যাটাস:</span>
                <span className="font-semibold text-emerald-700">
                  {currentStock > 0 ? `${currentStock.toLocaleString('bn-BD')} টি স্টকে রয়েছে` : 'স্টক শেষ'}
                </span>
              </div>
            </div>

            {/* Variant Selector (e.g. Size, Color) */}
            {selectedProduct.variants && selectedProduct.variants.length > 0 && (
              <div className="mt-4">
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  ভ্যারিয়েন্ট নির্বাচন করুন:
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3 py-1.5 text-xs rounded-xl font-medium border transition-all ${
                          isSelected 
                            ? 'bg-teal-700 border-teal-700 text-white shadow-xs' 
                            : 'bg-white border-slate-200 text-slate-700 hover:border-teal-400'
                        }`}
                      >
                        <span>{v.name}</span>
                        <span className="ml-1 opacity-80 text-[10px]">
                          (৳{(v.salePrice || v.price).toLocaleString('bn-BD')})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-4 flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700">পরিমাণ:</span>
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="পরিমাণ কমান"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-1 text-xs font-bold text-slate-800 min-w-[36px] text-center">
                  {quantity.toLocaleString('bn-BD')}
                </span>
                <button
                  onClick={() => {
                    if (quantity < currentStock) setQuantity(quantity + 1);
                  }}
                  className="p-2 hover:bg-slate-100 text-slate-600 transition-colors"
                  aria-label="পরিমাণ বাড়ান"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-slate-500">
                মোট: ৳{(currentPrice * quantity).toLocaleString('bn-BD')}
              </span>
            </div>

            {/* Delivery Charge Estimator */}
            <div className="mt-4 p-3 bg-teal-50/40 rounded-xl border border-teal-100 space-y-2 text-xs">
              <div className="flex items-center justify-between font-semibold text-slate-800">
                <span className="flex items-center gap-1.5 text-teal-900">
                  <Truck className="w-4 h-4 text-teal-700" /> ডেলিভারি চার্জ হিসাব:
                </span>
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-teal-200 text-[11px]">
                  <button
                    onClick={() => setDeliveryLocation('dhaka')}
                    className={`px-2 py-0.5 rounded ${deliveryLocation === 'dhaka' ? 'bg-teal-700 text-white font-bold' : 'text-slate-600'}`}
                  >
                    ঢাকা সিটি (৳৬০)
                  </button>
                  <button
                    onClick={() => setDeliveryLocation('outside')}
                    className={`px-2 py-0.5 rounded ${deliveryLocation === 'outside' ? 'bg-teal-700 text-white font-bold' : 'text-slate-600'}`}
                  >
                    ঢাকার বাইরে (৳১২০)
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-600">
                {deliveryLocation === 'dhaka' ? 'ঢাকায় ২-৩ কার্যদিবসের মধ্যে হোম ডেলিভারি' : 'সমগ্র বাংলাদেশে ৩-৫ কার্যদিবসের মধ্যে কুরিয়ার ডেলিভারি'}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 border-t border-teal-100">
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-600" /> {selectedProduct.returnPolicyDays} দিনের সহজ রিটার্ন
                </span>
                <span className="flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-teal-600" /> {selectedProduct.warranty || 'আসল পণ্যের নিশ্চয়তা'}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={handleAddToCart}
                disabled={currentStock <= 0}
                className="py-3 px-4 bg-teal-50 hover:bg-teal-100 text-teal-900 font-bold rounded-2xl border border-teal-300 flex items-center justify-center gap-2 text-xs sm:text-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-teal-700" />
                <span>কার্টে যোগ করুন</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={currentStock <= 0}
                className="py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-2xl shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>এখনই অর্ডার করুন</span>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Details Tabs: Description, Specs, Reviews */}
        <div className="border-t border-slate-200 px-4 sm:px-8 py-4 bg-slate-50/50">
          <div className="flex border-b border-slate-200 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-2.5 px-4 transition-colors ${
                activeTab === 'desc' ? 'border-b-2 border-teal-700 text-teal-800' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              পণ্যের বিবরণ
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 px-4 transition-colors ${
                activeTab === 'specs' ? 'border-b-2 border-teal-700 text-teal-800' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              স্পেসিফিকেশন ও বৈশিষ্ট্য
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2.5 px-4 transition-colors ${
                activeTab === 'reviews' ? 'border-b-2 border-teal-700 text-teal-800' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              গ্রাহক রিভিউ ({productReviews.length})
            </button>
          </div>

          <div className="py-4 text-xs sm:text-sm">
            {activeTab === 'desc' && (
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {selectedProduct.descriptionBn}
              </p>
            )}

            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="font-semibold text-slate-500">{key}:</span>
                    <span className="text-slate-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                {productReviews.length > 0 ? (
                  productReviews.map(rev => (
                    <div key={rev.id} className="p-3 bg-white rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{rev.userName}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full font-medium">
                              যাচাইকৃত ক্রেতা
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.createdAt}</span>
                      </div>
                      <div className="flex text-amber-400 mb-1.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <p className="text-slate-600 text-xs">{rev.commentBn}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-400">
                    এখনও কোনো রিভিউ দেওয়া হয়নি। প্রথম রিভিউ দিন এবং ১০ পয়েন্ট রিওয়ার্ড জিতুন!
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
