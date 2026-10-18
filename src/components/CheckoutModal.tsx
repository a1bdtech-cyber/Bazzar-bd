import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BANGLADESH_DIVISIONS } from '../data/mockData';
import { Address } from '../types';

const CheckoutModalContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { 
    cart, 
    totals, 
    deliveryZone, 
    setDeliveryZone,
    currentUser, 
    placeOrder,
    setSelectedOrder
  } = useShop();

  const defaultAddr = currentUser.savedAddresses[0] || {
    id: 'addr-temp',
    fullName: currentUser.name || '',
    phone: currentUser.phone || '',
    division: 'ঢাকা',
    district: 'ঢাকা',
    thana: 'ধানমন্ডি',
    areaDetails: '',
    isDefault: true,
    deliveryType: 'home'
  };

  const [formData, setFormData] = useState<Address>(defaultAddr);
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'bkash_sandbox' | 'nagad_sandbox' | 'rocket_sandbox' | 'upay_sandbox'>('cash_on_delivery');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected division districts
  const currentDivisionObj = BANGLADESH_DIVISIONS.find(d => d.nameBn === formData.division) || BANGLADESH_DIVISIONS[0];

  const handleDivisionChange = (divName: string) => {
    const divObj = BANGLADESH_DIVISIONS.find(d => d.nameBn === divName) || BANGLADESH_DIVISIONS[0];
    setFormData(prev => ({
      ...prev,
      division: divName,
      district: divObj.districts[0]
    }));
    if (divName === 'ঢাকা') {
      setDeliveryZone('inside_dhaka');
    } else {
      setDeliveryZone('outside_dhaka');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('অনুগ্রহ করে আপনার পুরো নাম প্রদান করুন');
      return;
    }

    // BD Phone validation: starts with 01 and has 11 digits
    const cleanedPhone = formData.phone.replace(/[^0-9]/g, '');
    if (!cleanedPhone.startsWith('01') || cleanedPhone.length !== 11) {
      setErrorMsg('সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 01712345678)');
      return;
    }

    if (!formData.areaDetails.trim()) {
      setErrorMsg('অনুগ্রহ করে সঠিক ঠিকানা, বাড়ি/রোড নম্বর উল্লেখ করুন');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const uniqueVendors = Array.from(new Set(cart.map(c => c.vendorId)));
      const createdOrder = placeOrder({
        customerId: currentUser.id,
        customerName: formData.fullName,
        customerPhone: formData.phone,
        shippingAddress: formData,
        items: [...cart],
        subtotal: totals.subtotal,
        deliveryCharge: totals.deliveryFee,
        discountAmount: totals.discount,
        totalPayable: totals.total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cash_on_delivery' ? 'unpaid' : 'paid',
        vendorIds: uniqueVendors,
        trackingNotes: paymentMethod === 'cash_on_delivery' 
          ? 'ক্যাশ অন ডেলিভারি অর্ডার — ডেলিভারি ম্যানের হাতে পণ্য বুঝে পেয়ে মূল্য পরিশোধ করুন।' 
          : 'স্যান্ডবক্স ডিজিটাল পেমেন্ট ভেরিফাইড (মক টেস্ট পেমেন্ট)।'
      });

      setIsSubmitting(false);
      onClose();
      setSelectedOrder(createdOrder);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-teal-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="font-bold text-base sm:text-lg font-['Hind_Siliguri']">
                নিরাপদ চেকআউট ও ডেলিভারি তথ্য
              </h2>
              <p className="text-xs text-teal-200">আপনার অর্ডারের সঠিক ঠিকানা প্রদান করুন</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-teal-800 text-teal-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmitOrder} className="p-4 sm:p-6 space-y-5">
          
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Customer & Address Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2 border-slate-100">
              <MapPin className="w-4 h-4 text-teal-700" /> ১. গ্রাহকের নাম ও ঠিকানা
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  পুরো নাম: *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="যেমন: তানভীর রহমান"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  মোবাইল নম্বর (১১ ডিজিট): *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                />
              </div>
            </div>

            {/* Division & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  বিভাগ: *
                </label>
                <select
                  value={formData.division}
                  onChange={(e) => handleDivisionChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden bg-white"
                >
                  {BANGLADESH_DIVISIONS.map(div => (
                    <option key={div.id} value={div.nameBn}>{div.nameBn} বিভাগ</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  জেলা: *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden bg-white"
                >
                  {currentDivisionObj.districts.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  থানা / উপজেলা: *
                </label>
                <input
                  type="text"
                  required
                  value={formData.thana}
                  onChange={(e) => setFormData({ ...formData, thana: e.target.value })}
                  placeholder="যেমন: ধানমন্ডি / মিরপুর / সদর"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  ডেলিভারির ধরন:
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: 'home' })}
                    className={`flex-1 py-2 text-xs rounded-xl font-medium border ${formData.deliveryType === 'home' ? 'bg-teal-50 border-teal-600 text-teal-800 font-bold' : 'border-slate-200 text-slate-600'}`}
                  >
                    বাসা (Home)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryType: 'office' })}
                    className={`flex-1 py-2 text-xs rounded-xl font-medium border ${formData.deliveryType === 'office' ? 'bg-teal-50 border-teal-600 text-teal-800 font-bold' : 'border-slate-200 text-slate-600'}`}
                  >
                    অফিস (Office)
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                বিস্তারিত ঠিকানা ও ডেলিভারি নির্দেশিকা: *
              </label>
              <textarea
                rows={2}
                required
                value={formData.areaDetails}
                onChange={(e) => setFormData({ ...formData, areaDetails: e.target.value })}
                placeholder="বাড়ি নং, রোড নং, এলাকা এবং কোনো বিশেষ ল্যান্ডমার্ক..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2 border-slate-100">
              <Banknote className="w-4 h-4 text-teal-700" /> ২. পেমেন্ট পদ্ধতি নির্বাচন
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* Cash On Delivery (Default) */}
              <label className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-2.5 ${paymentMethod === 'cash_on_delivery' ? 'border-emerald-600 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash_on_delivery"
                  checked={paymentMethod === 'cash_on_delivery'}
                  onChange={() => setPaymentMethod('cash_on_delivery')}
                  className="mt-1 text-emerald-600"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                    <Banknote className="w-4 h-4 text-emerald-600" />
                    <span>ক্যাশ অন ডেলিভারি (COD)</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    পণ্য হাতে পেয়ে চেক করে ডেলিভারি ম্যানকে মূল্য পরিশোধ করুন।
                  </p>
                </div>
              </label>

              {/* bKash */}
              <label className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-2.5 ${paymentMethod === 'bkash_sandbox' ? 'border-pink-600 bg-pink-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bkash_sandbox"
                  checked={paymentMethod === 'bkash_sandbox'}
                  onChange={() => setPaymentMethod('bkash_sandbox')}
                  className="mt-1 text-pink-600"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                    <span className="w-4 h-4 rounded-full bg-pink-600 text-white text-[9px] font-bold flex items-center justify-center">b</span>
                    <span>বিকাশ (bKash Gateway)</span>
                  </div>
                  <p className="text-[11px] text-pink-700 mt-0.5">
                    বিকাশ মার্চেন্ট গেটওয়ে। সার্ভার-রেডি এপিআই ইন্টিগ্রেশন।
                  </p>
                </div>
              </label>

              {/* Nagad */}
              <label className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-2.5 ${paymentMethod === 'nagad_sandbox' ? 'border-orange-600 bg-orange-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="nagad_sandbox"
                  checked={paymentMethod === 'nagad_sandbox'}
                  onChange={() => setPaymentMethod('nagad_sandbox')}
                  className="mt-1 text-orange-600"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                    <span className="w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] font-bold flex items-center justify-center">ন</span>
                    <span>নগদ (Nagad Direct)</span>
                  </div>
                  <p className="text-[11px] text-orange-700 mt-0.5">
                    নগদ পেমেন্ট গেটওয়ে। দ্রুত ও সুরক্ষিত মোবাইল ওয়ালেট।
                  </p>
                </div>
              </label>

              {/* Rocket */}
              <label className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-2.5 ${paymentMethod === 'rocket_sandbox' ? 'border-purple-600 bg-purple-50/50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="rocket_sandbox"
                  checked={paymentMethod === 'rocket_sandbox'}
                  onChange={() => setPaymentMethod('rocket_sandbox')}
                  className="mt-1 text-purple-600"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                    <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center">R</span>
                    <span>রকেট (Rocket / DBBL)</span>
                  </div>
                  <p className="text-[11px] text-purple-700 mt-0.5">
                    ডাচ-বাংলা ব্যাংক রকেট মোবাইল ব্যাংকিং সাপোর্ট।
                  </p>
                </div>
              </label>

            </div>
          </div>

          {/* Order Summary Box */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>আইটেম সংখ্যা:</span>
              <span className="font-semibold">{cart.length.toLocaleString('bn-BD')} টি</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>উপমোট:</span>
              <span className="font-semibold">৳{totals.subtotal.toLocaleString('bn-BD')}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>ডেলিভারি চার্জ ({formData.division === 'ঢাকা' ? 'ঢাকা সিটি' : 'ঢাকার বাইরে'}):</span>
              <span className="font-semibold">৳{totals.deliveryFee.toLocaleString('bn-BD')}</span>
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <span>অর্ডার প্রস্তুত হচ্ছে...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 text-amber-300" />
                <span>অর্ডার চূড়ান্ত নিশ্চিত করুন (৳{totals.total.toLocaleString('bn-BD')})</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};

export const CheckoutModal: React.FC = () => {
  const { isCheckoutModalOpen, setIsCheckoutModalOpen } = useShop();

  if (!isCheckoutModalOpen) return null;

  return <CheckoutModalContent onClose={() => setIsCheckoutModalOpen(false)} />;
};

