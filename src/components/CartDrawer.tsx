import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck, 
  Store,
  AlertTriangle
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { LOCALIZED_STRINGS } from '../data/mockData';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    deliveryZone, 
    setDeliveryZone,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    totals,
    setIsCheckoutModalOpen,
    currentUser,
    setIsAuthModalOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  // Identify unique vendors in this cart
  const uniqueVendorIds = Array.from(new Set(cart.map(item => item.vendorId)));
  const isMultiVendor = uniqueVendorIds.length > 1;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.messageBn);
    } else {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    if (currentUser.role === 'guest') {
      // Must authenticate or sign in before checkout
      setIsAuthModalOpen(true);
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Drawer Panel */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-slate-800">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-teal-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h2 className="font-bold text-base sm:text-lg font-['Hind_Siliguri']">
              শপিং কার্ট ({totals.itemCount.toLocaleString('bn-BD')} টি আইটেম)
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-teal-800 text-teal-200 hover:text-white transition-colors"
            aria-label="কার্ট বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Multi-Vendor Alert if items come from multiple shops */}
          {isMultiVendor && (
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">মাল্টি-ভেন্ডর অর্ডার নোটিশ</p>
                <p className="text-[11px] text-amber-800">
                  আপনার কার্টে {uniqueVendorIds.length.toLocaleString('bn-BD')}টি ভিন্ন বিক্রেতার পণ্য রয়েছে। প্রতিটি বিক্রেতা তাদের নিজস্ব শপ থেকে আলাদা প্যাকেটে পণ্য পাঠাবেন।
                </p>
              </div>
            </div>
          )}

          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-700">আপনার কার্ট খালি</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                বিশ্বাস বাজারে আকর্ষণীয় ছাড় এবং দেশীয় পণ্যের সংগ্রহ ব্রাউজ করে পছন্দের পণ্য কার্টে যোগ করুন।
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-xl text-xs shadow-xs"
              >
                কেনাকাটা চালিয়ে যান
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => {
                const itemPrice = item.selectedVariant?.salePrice || item.selectedVariant?.price || item.product.salePrice || item.product.regularPrice;
                const maxStock = item.selectedVariant ? item.selectedVariant.stock : item.product.stock;

                return (
                  <div 
                    key={item.id} 
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex gap-3 relative group"
                  >
                    {/* Item Image */}
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.titleBn} 
                      className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0 bg-white"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0 pr-6">
                      <div className="flex items-center gap-1 text-[10px] text-teal-800 font-medium">
                        <Store className="w-3 h-3 text-teal-600" />
                        <span className="truncate">{item.product.vendorName}</span>
                      </div>
                      
                      <h4 className="text-xs font-semibold text-slate-800 truncate" title={item.product.titleBn}>
                        {item.product.titleBn}
                      </h4>

                      {item.selectedVariant && (
                        <span className="inline-block text-[10px] bg-slate-200/70 text-slate-700 px-1.5 py-0.5 rounded mt-0.5">
                          ভ্যারিয়েন্ট: {item.selectedVariant.name}
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-teal-900">
                          ৳{(itemPrice * item.quantity).toLocaleString('bn-BD')}
                        </span>

                        {/* Quantity Counter */}
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-100 text-slate-600"
                            aria-label="কমান"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800 min-w-[24px] text-center">
                            {item.quantity.toLocaleString('bn-BD')}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= maxStock}
                            className="p-1 hover:bg-slate-100 text-slate-600 disabled:opacity-30"
                            aria-label="বাড়ান"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete Item Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors"
                      title="আইটেম মুছুন"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Delivery Zone Selector */}
          {cart.length > 0 && (
            <div className="p-3 bg-slate-100/70 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Truck className="w-4 h-4 text-teal-700" />
                <span>ডেলিভারি এলাকা নির্বাচন:</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeliveryZone('inside_dhaka')}
                  className={`p-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                    deliveryZone === 'inside_dhaka'
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  ঢাকা সিটি (৳৬০)
                </button>
                <button
                  onClick={() => setDeliveryZone('outside_dhaka')}
                  className={`p-2 rounded-xl text-xs font-semibold text-center border transition-all ${
                    deliveryZone === 'outside_dhaka'
                      ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  ঢাকার বাইরে (৳১২০)
                </button>
              </div>
            </div>
          )}

          {/* Discount Coupon Form */}
          {cart.length > 0 && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-teal-600" /> কুপন বা ডিসকাউন্ট কোড:
                </span>
                {appliedCoupon && (
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-rose-600 font-semibold hover:underline"
                  >
                    মুছে ফেলুন
                  </button>
                )}
              </div>

              {appliedCoupon ? (
                <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold">'{appliedCoupon.code}'</span> প্রয়োগ করা হয়েছে ({appliedCoupon.discountPercentage}% ছাড়)
                  </div>
                  <span className="font-bold text-emerald-900">-৳{totals.discount.toLocaleString('bn-BD')}</span>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="যেমন: BISHWAS50"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg outline-hidden focus:border-teal-600 uppercase"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold"
                  >
                    প্রয়োগ
                  </button>
                </form>
              )}

              {couponError && (
                <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>
              )}

              {/* Sample Coupons hints */}
              {!appliedCoupon && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[10px] text-slate-500">
                  <span>ক্লিক করে ব্যবহার করুন:</span>
                  <button 
                    onClick={() => { setCouponInput('BISHWAS50'); applyCoupon('BISHWAS50'); }}
                    className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono hover:bg-amber-200 font-semibold"
                  >
                    BISHWAS50
                  </button>
                  <button 
                    onClick={() => { setCouponInput('BOISHAKHI'); applyCoupon('BOISHAKHI'); }}
                    className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono hover:bg-amber-200 font-semibold"
                  >
                    BOISHAKHI
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer with Totals and Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>পণ্যের উপমোট:</span>
                <span className="font-semibold text-slate-800">৳{totals.subtotal.toLocaleString('bn-BD')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-semibold text-slate-800">৳{totals.deliveryFee.toLocaleString('bn-BD')}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>কুপন ছাড়:</span>
                  <span>-৳{totals.discount.toLocaleString('bn-BD')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm sm:text-base font-bold text-teal-950 pt-2 border-t border-slate-200">
                <span>সর্বমোট প্রদেয়:</span>
                <span>৳{totals.total.toLocaleString('bn-BD')}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm transition-all cursor-pointer"
            >
              <span>চেকআউট সম্পন্ন করুন</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[10px] text-center text-slate-500">
              ক্যাশ অন ডেলিভারি এবং অনলাইন পেমেন্টে সম্পূর্ণ নিরাপদ কেনাকাটার গ্যারান্টি।
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
