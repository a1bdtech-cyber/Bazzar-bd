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
  CreditCard,
  Key,
  LogOut,
  Eye,
  EyeOff,
  ShieldAlert,
  BookOpen
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { VENDORS } from '../data/mockData';

interface AdminPortalModalProps {
  onOpenArchitecture?: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ onOpenArchitecture }) => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    currentUser, 
    orders, 
    showToast,
    isSuperAdminAuthenticated,
    verifySuperAdminAccess,
    lockSuperAdminAccess,
    updateAdminPin
  } = useShop();

  // Authentication inputs
  const [adminEmail, setAdminEmail] = useState('iamakhinoor@gmail.com');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'vendors' | 'orders' | 'cod' | 'security' | 'architecture'>('overview');

  // Change PIN states
  const [oldPinInput, setOldPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');

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
    if (!adminEmail.trim()) {
      showToast('অনুগ্রহ করে ওনার ইমেইল অ্যাড্রেস লিখুন।');
      return;
    }
    if (!pin.trim()) {
      showToast('অনুগ্রহ করে সিকিউরিটি পিন দিন।');
      return;
    }

    const success = verifySuperAdminAccess(adminEmail, pin);
    if (success) {
      setPin('');
    }
  };

  const handleLock = () => {
    lockSuperAdminAccess();
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPinInput || !newPinInput) {
      showToast('সকল ঘর পূরণ করুন!');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      showToast('নতুন পিন এবং নিশ্চিতকরণ পিন মিলছে না!');
      return;
    }
    const success = updateAdminPin(oldPinInput, newPinInput);
    if (success) {
      setOldPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
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

  const isUnlocked = isSuperAdminAuthenticated && currentUser.role === 'super_admin';

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
                বিশ্বাস বাজার — সেন্ট্রাল সুপার অ্যাডমিন কন্ট্রোল
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-mono">
                  OWNER ONLY
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {isUnlocked ? 'প্রধান ওনার: iamakhinoor@gmail.com (সক্রিয়)' : 'শুধুমাত্র প্রধান ওনারের জন্য সুরক্ষিত প্যানেল'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isUnlocked && (
              <button
                onClick={handleLock}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold rounded-xl transition-all"
                title="সুপার অ্যাডমিন সেশন লক করুন"
              >
                <LogOut className="w-3.5 h-3.5" />
                লক করুন
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Security Gate if not authenticated as Super Admin */}
        {!isUnlocked ? (
          <div className="p-6 sm:p-10 text-center max-w-md mx-auto space-y-5">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-xs border border-amber-200">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 font-['Hind_Siliguri']">
                🔒 ওনার সুপার অ্যাডমিন সিকিউরিটি গেটওয়ে
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                এই কন্ট্রোল প্যানেলটি প্ল্যাটফর্মের প্রধান মালিকের জন্য সংরক্ষিত। সাধারণ ভিজিটর বা অন্য কোনো ব্যবহারকারী এই মোড এক্সেস করতে পারবেন না।
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-left space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>অনুমোদিত ওনার ইমেইল:</span>
              </div>
              <p className="text-teal-800 font-mono font-bold pl-5">iamakhinoor@gmail.com</p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-3.5 text-left">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ওনার ইমেইল:
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="iamakhinoor@gmail.com"
                  className="w-full px-3.5 py-2.5 text-xs font-mono border border-slate-300 rounded-xl focus:border-teal-600 focus:bg-white outline-hidden bg-slate-50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  গোপন সিকিউরিটি পিন / পাসওয়ার্ড:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="আপনার গোপন অ্যাডমিন পিন লিখুন"
                    className="w-full pl-3.5 pr-10 py-2.5 text-xs font-mono border border-slate-300 rounded-xl focus:border-teal-600 focus:bg-white outline-hidden bg-slate-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  (ডিফল্ট মাস্টার পিন: <span className="font-mono font-bold text-teal-700">akhinoor786</span> অথবা <span className="font-mono font-bold text-teal-700">7890</span>)
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all mt-2"
              >
                <Key className="w-4 h-4 text-amber-400" />
                যাচাই করুন ও সুপার অ্যাডমিন প্যানেল খুলুন
              </button>
            </form>

            <p className="text-[10px] text-slate-400">
              নিরাপত্তা নীতি: ভুল ক্রেডেনশিয়াল প্রদান করলে কোনো প্রশাসনিক তথ্য বা অ্যাকশন দৃশ্যমান হবে না।
            </p>
          </div>
        ) : (
          <div>
            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto text-xs font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 px-4 border-b-2 transition-colors shrink-0 ${
                  activeTab === 'overview' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                সারাংশ ও মেট্রিক্স
              </button>
              <button
                onClick={() => setActiveTab('vendors')}
                className={`py-3 px-4 border-b-2 flex items-center gap-1.5 transition-colors shrink-0 ${
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
                className={`py-3 px-4 border-b-2 transition-colors shrink-0 ${
                  activeTab === 'orders' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                অর্ডার ও ডেলিভারি ট্র্যাকিং
              </button>
              <button
                onClick={() => setActiveTab('cod')}
                className={`py-3 px-4 border-b-2 transition-colors shrink-0 ${
                  activeTab === 'cod' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                ক্যাশ অন ডেলিভারি (COD)
              </button>
              <button
                onClick={() => setActiveTab('architecture')}
                className={`py-3 px-4 border-b-2 flex items-center gap-1 transition-colors shrink-0 ${
                  activeTab === 'architecture' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                <span>আর্কিটেকচার ব্লুপ্রিন্ট</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-3 px-4 border-b-2 flex items-center gap-1 transition-colors shrink-0 ${
                  activeTab === 'security' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>পিন পরিবর্তন</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-4 sm:p-6 space-y-6">
              
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Top Welcome Banner */}
                  <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                    <div>
                      <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                        👑 স্বাগতম, মো. আখিনুর
                        <span className="bg-teal-500/30 text-teal-200 border border-teal-400/40 text-[10px] px-2 py-0.5 rounded-full font-mono">
                          PRIMARY OWNER
                        </span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        বিশ্বাস বাজার প্ল্যাটফর্মের সকল ভেন্ডর অনুমোদন, ক্যাশ অন ডেলিভারি রিকনসিলিয়েশন ও গ্লোবাল কনফিগারেশন নিয়ন্ত্রণ করুন।
                      </p>
                    </div>
                    <button
                      onClick={handleLock}
                      className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shrink-0"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      লক ও প্রস্থান
                    </button>
                  </div>

                  {/* Architecture & Engineering Blueprint (Admin Only) */}
                  <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-500/30 rounded-2xl p-4 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-bold shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-amber-300">সিস্টেম আর্কিটেকচার ও ফেজ ব্লুপ্রিন্ট (গোপনীয়)</h4>
                        <p className="text-xs text-slate-300">
                          ক্লাউড ফায়ারস্টোর স্কিমা, সিকিউরিটি রুলস ও ৯-টি ফেজ বাস্তবায়নের পূর্ণাঙ্গ টেকনিক্যাল গাইড।
                        </p>
                      </div>
                    </div>
                    {onOpenArchitecture && (
                      <button
                        onClick={onOpenArchitecture}
                        className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        <BookOpen className="w-4 h-4" /> ব্লুপ্রিন্ট পপআপ খুলুন
                      </button>
                    )}
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <div className="flex items-center justify-between text-slate-500 mb-1">
                        <span className="text-[11px] font-bold">মোট জিএমভি (GMV)</span>
                        <DollarSign className="w-4 h-4 text-teal-600" />
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">৳১২,৪৫,০০০</p>
                      <span className="text-[10px] text-teal-600 flex items-center gap-0.5 mt-1 font-semibold">
                        <TrendingUp className="w-3 h-3" /> +১৮.৫% এই মাসে
                      </span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <div className="flex items-center justify-between text-slate-500 mb-1">
                        <span className="text-[11px] font-bold">নিবন্ধিত বিক্রেতা</span>
                        <Store className="w-4 h-4 text-amber-600" />
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">{VENDORS.length + 2}</p>
                      <span className="text-[10px] text-amber-600 font-semibold mt-1 block">২টি আবেদন অপেক্ষমাণ</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <div className="flex items-center justify-between text-slate-500 mb-1">
                        <span className="text-[11px] font-bold">চলতি অর্ডার</span>
                        <Package className="w-4 h-4 text-indigo-600" />
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-slate-900">{orders.length + 14}</p>
                      <span className="text-[10px] text-indigo-600 font-semibold mt-1 block">ডেলিভারি ট্র্যাকিং সক্রিয়</span>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                      <div className="flex items-center justify-between text-slate-500 mb-1">
                        <span className="text-[11px] font-bold">কমিশন আয় (১০%)</span>
                        <FileCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-800">৳১,২৪,৫০০</p>
                      <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">নেট প্ল্যাটফর্ম ফি</span>
                    </div>
                  </div>

                  {/* Active Verified Stores */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">প্ল্যাটফর্মের সক্রিয় ভেন্ডর তালিকা:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {VENDORS.map(v => (
                        <div key={v.id} className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                          <img src={v.logoUrl} alt={v.shopNameBn} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                          <div className="overflow-hidden">
                            <p className="font-bold text-xs text-slate-900 truncate">{v.shopNameBn}</p>
                            <p className="text-[10px] text-slate-500 truncate">{v.district} • রেটিং {v.rating}★</p>
                            <span className="text-[9px] text-teal-700 font-semibold">যাচাইকৃত পার্টনার</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vendors' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      নতুন বিক্রেতা আবেদন ({pendingVendors.length}):
                    </h3>
                  </div>

                  {pendingVendors.length === 0 ? (
                    <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-700">কোনো নতুন ভেন্ডর আবেদন অপেক্ষমাণ নেই!</p>
                      <p className="text-[11px] text-slate-500">সকল আবেদন সফলভাবে রিভিউ ও সম্পন্ন হয়েছে।</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingVendors.map(v => (
                        <div key={v.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-900">{v.shopName}</h4>
                              <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                                অপেক্ষমাণ
                              </span>
                            </div>
                            <p className="text-xs text-slate-600">
                              প্রোপাইটার: <span className="font-semibold text-slate-800">{v.ownerName}</span> • ফোন: {v.phone}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              ক্যাটাগরি: {v.category} • ট্রেড লাইসেন্স নং: <span className="font-mono text-teal-800 font-semibold">{v.tradeLicense}</span> • আবেদনের তারিখ: {v.appliedAt}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              onClick={() => handleApproveVendor(v.id, v.shopName)}
                              className="flex-1 sm:flex-none py-2 px-3.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> অনুমোদন দিন
                            </button>
                            <button
                              onClick={() => handleRejectVendor(v.id, v.shopName)}
                              className="flex-1 sm:flex-none py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border border-rose-200 transition-colors"
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
                <div className="space-y-4">
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

              {activeTab === 'security' && (
                <div className="max-w-md mx-auto space-y-4 py-2">
                  <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl text-xs space-y-1.5 text-teal-950">
                    <h4 className="font-bold text-sm flex items-center gap-1.5 text-teal-900">
                      <Key className="w-4 h-4 text-teal-700" /> সিকিউরিটি পিন পরিবর্তন
                    </h4>
                    <p className="text-slate-600">
                      আপনার সুপার অ্যাডমিন পিন যে কোনো সময় পরিবর্তন করতে পারেন। পরিবর্তন করার পর শুধু আপনার নতুন পিন দিয়েই এই প্যানেল খোলা সম্ভব হবে।
                    </p>
                  </div>

                  <form onSubmit={handleChangePin} className="space-y-3 bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        বর্তমান পিন:
                      </label>
                      <input
                        type="password"
                        value={oldPinInput}
                        onChange={(e) => setOldPinInput(e.target.value)}
                        placeholder="আপনার বর্তমান পিন লিখুন"
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        নতুন পিন (কমপক্ষে ৪ সংখ্যা):
                      </label>
                      <input
                        type="password"
                        value={newPinInput}
                        onChange={(e) => setNewPinInput(e.target.value)}
                        placeholder="নতুন গোপন পিন দিন"
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        নতুন পিন নিশ্চিত করুন:
                      </label>
                      <input
                        type="password"
                        value={confirmPinInput}
                        onChange={(e) => setConfirmPinInput(e.target.value)}
                        placeholder="আবার লিখুন"
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden bg-white"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl text-xs shadow-xs transition-colors mt-2"
                    >
                      পিন সংরক্ষণ করুন
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900 text-white rounded-3xl p-6 border border-teal-700/50 shadow-lg">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-teal-800 pb-4 mb-4">
                      <div>
                        <span className="text-[10px] bg-amber-400 text-teal-950 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-mono">
                          CONFIDENTIAL • ADMIN EYES ONLY
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                          বিশ্বাস বাজার — সিস্টেম আর্কিটেকচার ও ফেজ স্পেসিফিকেশন
                        </h3>
                        <p className="text-xs text-teal-200">
                          Next-Gen Multi-Vendor E-Commerce Platform Blueprint
                        </p>
                      </div>
                      {onOpenArchitecture && (
                        <button
                          onClick={onOpenArchitecture}
                          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all shrink-0"
                        >
                          <BookOpen className="w-4 h-4" />
                          <span>পূর্ণাঙ্গ ডকু ওপেন করুন</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-slate-800/80 rounded-2xl p-4 border border-teal-800/50 space-y-2">
                        <h4 className="font-bold text-amber-300 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ফেজ ১: আসল ব্র্যান্ড ডিজাইন ও স্টোরফ্রন্ট (সম্পন্ন)
                        </h4>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          • Apple, Nike, Daraz অনুপ্রাণিত প্রিমিয়াম বাংলা UI/UX<br/>
                          • ১৮টি আসল প্রোডাক্ট, ক্যাটাগরি ব্রাউজিং ও ফ্ল্যাশ ডিলস<br/>
                          • মাল্টি-ভেন্ডর কার্ট ও চেকআউট সিমুলেশন<br/>
                          • ৬৪ জেলার ক্যাশ অন ডেলিভারি (COD) ও ট্র্যাকিং
                        </p>
                      </div>

                      <div className="bg-slate-800/80 rounded-2xl p-4 border border-teal-800/50 space-y-2">
                        <h4 className="font-bold text-teal-300 flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-teal-400" /> সুরক্ষিত আর্কিটেকচার ও আরবিএসি (RBAC)
                        </h4>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          • সুপার অ্যাডমিন রোল লক: iamakhinoor@gmail.com<br/>
                          • পাবলিক ভিজিটরদের জন্য অ্যাডমিন ও ফেজ সম্পূর্ণ গোপন<br/>
                          • ফায়ারস্টোর সিকিউরিটি রুলস ও ডেটামডেল রূপরেখা<br/>
                          • ভেন্ডর পোর্টাল ও অ্যাডমিন অনুমোদন ওয়ার্কফ্লো
                        </p>
                      </div>
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
