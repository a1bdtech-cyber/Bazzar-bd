import React, { useState } from 'react';
import { 
  X, 
  Store, 
  CheckCircle2, 
  FileText, 
  PlusCircle, 
  Boxes, 
  DollarSign, 
  Clock, 
  AlertCircle,
  Truck,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES, VENDORS } from '../data/mockData';

export const VendorPortalModal: React.FC = () => {
  const { 
    isVendorModalOpen, 
    setIsVendorModalOpen, 
    currentUser, 
    switchRole, 
    showToast,
    products
  } = useShop();

  const [activeTab, setActiveTab] = useState<'apply' | 'dashboard'>(
    currentUser.role === 'approved_vendor' ? 'dashboard' : 'apply'
  );

  // Application form fields
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState(currentUser.name || '');
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [address, setAddress] = useState('');
  const [tradeLicense, setTradeLicense] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].nameBn);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  if (!isVendorModalOpen) return null;

  // Filter vendor's own products
  const vendorShop = VENDORS[0]; // e.g. "সিল্ক ও তাঁত ঘর"
  const vendorProducts = products.filter(p => p.vendorId === vendorShop.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      showToast('অনুগ্রহ করে বিক্রেতা চুক্তিপত্রে সম্মতি প্রদান করুন');
      return;
    }
    setApplicationSubmitted(true);
    showToast('আপনার বিক্রেতা আবেদন সফলভাবে জমা হয়েছে! অ্যাডমিন পর্যালোচনার পর অনুমোদন দেওয়া হবে।');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-2">
            <Store className="w-6 h-6 text-amber-300" />
            <div>
              <h2 className="font-bold text-base sm:text-lg font-['Hind_Siliguri']">
                বিশ্বাস বাজার — বিক্রেতা হাব ও পোর্টাল
              </h2>
              <p className="text-xs text-teal-200">বাংলাদেশের কোটি ক্রেতার কাছে সরাসরি আপনার পণ্য বিক্রি করুন</p>
            </div>
          </div>
          <button
            onClick={() => setIsVendorModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-teal-800 text-teal-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('apply')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'apply' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ১. নতুন বিক্রেতা আবেদন (Onboarding)
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'dashboard' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ২. অনুমোদিত বিক্রেতা ড্যাশবোর্ড (Seller Portal)
          </button>
        </div>

        <div className="p-4 sm:p-6">
          
          {activeTab === 'apply' && (
            <div>
              {applicationSubmitted ? (
                <div className="text-center py-10 space-y-4 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">আবেদন সফলভাবে গ্রহণ করা হয়েছে</h3>
                  <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 text-left text-xs space-y-2">
                    <p className="font-semibold text-teal-950">আবেদন স্ট্যাটাস: <span className="text-amber-700 font-bold">Under Review (পর্যালোচনায় রয়েছে)</span></p>
                    <p className="text-slate-600">ট্র্যাকিং ট্রানজেকশন আইডি: <span className="font-mono text-slate-800">VA-2026-9041</span></p>
                    <p className="text-slate-600 text-[11px]">
                      আমাদের কমপ্লায়েন্স টিম আপনার ট্রেড লাইসেন্স ও ডকুমেন্টস যাচাই করে ২৪-৪৮ ঘণ্টার মধ্যে কনফার্মেশন এসএমএস পাঠাবে।
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      switchRole('approved_vendor');
                      setActiveTab('dashboard');
                    }}
                    className="mt-2 px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    ডেমো অনুমোদন দিয়ে ড্যাশবোর্ড দেখুন
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">জিরো রেজিস্ট্রেশন ফি — মাত্র ৫%-৭% নামমাত্র প্ল্যাটফর্ম ফি</p>
                      <p className="text-[11px] text-amber-800">
                        বিশ্বাস বাজারে জেনুইন ও আসল পণ্য প্রস্তুতকারক এবং মার্চেন্টদের স্বাগতম। নকল পণ্য বিক্রি সম্পূর্ণ নিষিদ্ধ।
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">দোকান বা ব্র্যান্ডের নাম: *</label>
                      <input
                        type="text"
                        required
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        placeholder="যেমন: সিল্ক ও তাঁত ঘর"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">স্বত্বাধিকারীর নাম: *</label>
                      <input
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="আপনার পূর্ণ নাম"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">যোগাযোগের মোবাইল নম্বর: *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">প্রধান প্রোডাক্ট ক্যাটাগরি: *</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden bg-white"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c.id} value={c.nameBn}>{c.nameBn}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">ট্রেড লাইসেন্স নম্বর (ঐচ্ছিক):</label>
                      <input
                        type="text"
                        value={tradeLicense}
                        onChange={(e) => setTradeLicense(e.target.value)}
                        placeholder="TRAD/DNCC/XXXXXX"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">ব্যবসার ঠিকানা বা ওয়্যারহাউজ:</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="উপজেলা/থানা, জেলা"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-0.5 rounded text-teal-600"
                      />
                      <span>
                        আমি বিশ্বাস বাজার বিক্রেতা নীতিমালা, ৭ দিনের রিটার্ন পলিসি এবং খাঁটি পণ্য সরবরাহের অঙ্গীকারে সম্মতি প্রকাশ করছি।
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors"
                  >
                    আবেদনপত্র দাখিল করুন
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Vendor Stats Header */}
              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={vendorShop.logoUrl} alt={vendorShop.shopNameBn} className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-600" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span>{vendorShop.shopNameBn}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </h3>
                    <p className="text-xs text-slate-500">
                      লাইসেন্স: {vendorShop.tradeLicenseNo} • কমিশন রেট: {vendorShop.commissionRate}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    ভেরিফাইড সক্রিয় শপ
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] text-slate-500">মোট বিক্রয়</p>
                  <p className="text-base sm:text-lg font-bold text-teal-900">৳১,৪২,৫০০</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] text-slate-500">পেন্ডিং অর্ডার</p>
                  <p className="text-base sm:text-lg font-bold text-amber-600">৩ টি</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] text-slate-500">লাইভ পণ্য</p>
                  <p className="text-base sm:text-lg font-bold text-slate-800">{vendorProducts.length} টি</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <p className="text-[11px] text-slate-500">গ্রাহক রেটিং</p>
                  <p className="text-base sm:text-lg font-bold text-emerald-700">৪.৮ ★</p>
                </div>
              </div>

              {/* Vendor Products Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">আমার তালিকাভুক্ত পণ্যসমূহ:</h4>
                  <button 
                    onClick={() => showToast('ফেজ ৪-এ প্রোডাক্ট আপলোড ও মাল্টি-ইমেজ ফাইল আপলোড সম্পূর্ণ হবে')}
                    className="inline-flex items-center gap-1 text-xs text-teal-700 font-bold hover:underline"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> নতুন পণ্য যোগ করুন
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {vendorProducts.map((vp) => (
                    <div key={vp.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex items-center gap-3">
                        <img src={vp.images[0]} alt={vp.titleBn} className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                        <div>
                          <p className="font-semibold text-slate-800 truncate max-w-xs">{vp.titleBn}</p>
                          <p className="text-[11px] text-slate-500">স্টক: {vp.stock} টি • দাম: ৳{vp.salePrice || vp.regularPrice}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        প্রকাশিত
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
