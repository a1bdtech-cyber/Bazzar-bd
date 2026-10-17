import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  DollarSign, 
  Users, 
  Store, 
  Package, 
  AlertTriangle,
  FileCheck,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { VENDORS } from '../data/mockData';

export const AdminPortalModal: React.FC = () => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    currentUser, 
    orders, 
    showToast,
    switchRole
  } = useShop();

  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(currentUser.role === 'super_admin');
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'orders' | 'cod'>('overview');

  // Pending vendor applications state
  const [pendingVendors, setPendingVendors] = useState([
    {
      id: 'app-901',
      shopName: 'রংপুর তাঁত কুটির',
      ownerName: 'মো. মশিউর রহমান',
      phone: '01715-443322',
      category: 'ফ্যাশন ও পোশাক',
      tradeLicense: 'TRAD/RNG/2024/091',
      appliedAt: '২০২৬-১০-১৫',
      status: 'pending'
    },
    {
      id: 'app-902',
      shopName: 'সুন্দরবন পিওর এগ্রো',
      ownerName: 'নাজমুল হাসান',
      phone: '01819-887766',
      category: 'খাঁটি খাদ্য ও অর্গানিক',
      tradeLicense: 'TRAD/KHU/2023/452',
      appliedAt: '২০২৬-১০-১৬',
      status: 'pending'
    }
  ]);

  if (!isAdminModalOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '7890' || pin === 'admin') {
      setIsUnlocked(true);
      switchRole('super_admin');
      showToast('প্রশাসনিক এক্সেস নিশ্চিত হয়েছে');
    } else {
      showToast('ভুল অ্যাডমিন পিন! ডেমো পরীক্ষার জন্য "7890" বা "admin" ব্যবহার করুন।');
    }
  };

  const handleApproveVendor = (id: string, name: string) => {
    setPendingVendors(prev => prev.filter(v => v.id !== id));
    showToast(`'${name}' সফলভাবে অনুমোদিত হয়েছে এবং বিক্রেতা লাইসেন্স ইস্যু হয়েছে!`);
  };

  const handleRejectVendor = (id: string, name: string) => {
    setPendingVendors(prev => prev.filter(v => v.id !== id));
    showToast(`'${name}' এর আবেদন প্রত্যাখ্যান করা হয়েছে।`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-600 rounded-xl text-white">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg font-['Hind_Siliguri'] flex items-center gap-2">
                বিশ্বাস বাজার — সেন্ট্রাল অ্যাডমিন কন্ট্রোল
                <span className="text-[10px] bg-teal-500/20 text-teal-300 border border-teal-400/30 px-2 py-0.5 rounded-full font-mono">
                  RBAC PROTECTED
                </span>
              </h2>
              <p className="text-xs text-slate-400">সিস্টেম গভর্ন্যান্স, ভেন্ডর অ্যাপ্রুভাল ও সিওডি রিকনসিলিয়েশন</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security PIN Gate if not unlocked */}
        {!isUnlocked ? (
          <div className="p-8 text-center max-w-sm mx-auto space-y-4">
            <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">প্রশাসনিক নিরাপত্তা ভেরিফিকেশন</h3>
            <p className="text-xs text-slate-500">
              এই অংশটি শুধুমাত্র প্ল্যাটফর্ম অ্যাডমিনিস্ট্রেটরদের জন্য সংরক্ষিত। ডেমো এক্সেসের জন্য পিন দিন।
            </p>

            <form onSubmit={handleUnlock} className="space-y-3">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="অ্যাডমিন পিন লিখুন (যেমন: 7890)"
                className="w-full px-4 py-2.5 text-center text-sm font-mono tracking-widest border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden bg-slate-50"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs transition-colors"
              >
                ভেরিফাই করুন ও প্রবেশ করুন
              </button>
              <p className="text-[10px] text-slate-400">
                (সুপার অ্যাডমিন টেস্ট পিন: <span className="font-mono font-bold text-teal-700">7890</span>)
              </p>
            </form>
          </div>
        ) : (
          <div>
            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 border-b-2 transition-colors ${
                  activeTab === 'overview' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                সারাংশ ও মেট্রিক্স
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'vendors' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>বিক্রেতা অনুমোদন কিউ</span>
                {pendingVendors.length > 0 && (
                  <span className="bg-amber-500 text-white px-1.5 py-0.2 rounded-full text-[10px]">
                    {pendingVendors.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-4 border-b-2 transition-colors ${
                  activeTab === 'orders' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                অর্ডার ও ডেলিভারি ট্র্যাকিং
              </button>
              <button
                onClick={() => setActiveTab('cod')}
                className={`py-3 px-4 border-b-2 transition-colors ${
                  activeTab === 'cod' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                ক্যাশ অন ডেলিভারি (COD) রিকনসিলিয়েশন
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4 sm:p-6 space-y-6">
              
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Top Stats Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200">
                      <p className="text-xs text-teal-800 font-medium">প্ল্যাটফর্ম জিএমভি (GMV)</p>
                      <p className="text-xl sm:text-2xl font-bold text-teal-950 mt-1">৳৪,৮৫,৭০০</p>
                      <span className="text-[10px] text-teal-600 font-semibold">যাচাইকৃত অর্ডার থেকে</span>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                      <p className="text-xs text-amber-800 font-medium">প্ল্যাটফর্ম কমিশন আয়</p>
                      <p className="text-xl sm:text-2xl font-bold text-amber-950 mt-1">৳২৯,১০০</p>
                      <span className="text-[10px] text-amber-600 font-semibold">গড় কমিশন ৬.২%</span>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200">
                      <p className="text-xs text-purple-800 font-medium">অনুমোদিত বিক্রেতা</p>
                      <p className="text-xl sm:text-2xl font-bold text-purple-950 mt-1">{VENDORS.length} টি</p>
                      <span className="text-[10px] text-purple-600 font-semibold">{pendingVendors.length}টি পেন্ডিং আবেদন</span>
                    </div>

                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                      <p className="text-xs text-emerald-800 font-medium">মোট গ্রাহক সংখ্যা</p>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-950 mt-1">১,৪২০+</p>
                      <span className="text-[10px] text-emerald-600 font-semibold">৮টি বিভাগ জুড়ে</span>
                    </div>
                  </div>

                  {/* Operational Controls Info */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                    <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-teal-700" /> ফেজ ১ স্থাপত্য ও সিকিউরিটি প্রস্তুতকরণ
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      ক্লায়েন্ট কোড কোনো গোপন পাসওয়ার্ড বা অ্যাডমিন রোল পরিবর্তন সরাসরি সম্পাদন করতে পারে না। ফেজ ২-তে ফায়ারবেস ক্লাউড ফায়ারস্টোর সিকিউরিটি রুলস (<code className="bg-slate-200 px-1 py-0.5 rounded font-mono">firestore.rules</code>) এবং সার্ভার-সাইড টোকেন ভ্যালিডেশনের মাধ্যমে প্রতি রোল কঠোরভাবে এনফোর্স করা হবে।
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'vendors' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      অনুমোদন অপেক্ষমাণ বিক্রেতা আবেদন ({pendingVendors.length})
                    </h3>
                  </div>

                  {pendingVendors.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs bg-slate-50 rounded-2xl border border-slate-200">
                      বর্তমানে কোনো অপেক্ষমাণ আবেদন নেই। সকল আবেদন যাচাইকৃত।
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingVendors.map(v => (
                        <div key={v.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-900">{v.shopName}</h4>
                              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.2 rounded-full font-semibold">
                                {v.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">
                              স্বত্বাধিকারী: {v.ownerName} • ফোন: {v.phone}
                            </p>
                            <p className="text-[11px] text-slate-500 font-mono">
                              ট্রেড লাইসেন্স: {v.tradeLicense} • আবেদনের তারিখ: {v.appliedAt}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleApproveVendor(v.id, v.shopName)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> অনুমোদন করুন
                            </button>
                            <button
                              onClick={() => handleRejectVendor(v.id, v.shopName)}
                              className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                            >
                              <XCircle className="w-3.5 h-3.5" /> বাতিল
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">সাম্প্রতিক অর্ডার ট্র্যাকিং:</h3>
                  <div className="space-y-2">
                    {orders.map(o => (
                      <div key={o.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{o.orderNumber} — {o.customerName}</p>
                          <p className="text-[11px] text-slate-500">{o.shippingAddress.district}, {o.shippingAddress.division} • {o.orderDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-teal-900">৳{o.totalPayable.toLocaleString('bn-BD')}</p>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 font-semibold">
                            {o.orderStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'cod' && (
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-2">
                    <h4 className="font-bold text-sm flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-amber-700" /> ক্যাশ অন ডেলিভারি (COD) পলিসি ও অডিট কন্ট্রোল
                    </h4>
                    <p className="leading-relaxed">
                      সিওডি অর্ডারে অর্থ সংগ্রহ কুরিয়ার পার্টনারের মাধ্যমে হয়ে থাকে। ডেলিভারি সম্পন্ন হওয়ার পরই কেবলমাত্র অথোরাইজড ফিন্যান্স ম্যানেজার কর্তৃক অর্থ সংগ্রহের রেকর্ড আপডেট করা যায়।
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="text-slate-500 font-medium">কুরিয়ারে বকেয়া সিওডি অর্থ</p>
                      <p className="text-lg font-bold text-slate-900 mt-1">৳৭৮,৩৫০</p>
                      <span className="text-[10px] text-slate-500">রেডএক্স ও সুন্দরবন কুরিয়ারে রিকনসিলিয়েশন বাকি</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200">
                      <p className="text-slate-500 font-medium">সফল সংগ্রহ ও সেটেলমেন্ট সম্পন্ন</p>
                      <p className="text-lg font-bold text-emerald-700 mt-1">৳৩,৬৪,২০০</p>
                      <span className="text-[10px] text-emerald-600">বিক্রেতাদের হিসাবে অর্থ ছাড় দেওয়া হয়েছে</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
