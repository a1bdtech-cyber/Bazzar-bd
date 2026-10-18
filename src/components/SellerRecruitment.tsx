import React from 'react';
import { Store, TrendingUp, ShieldCheck, DollarSign, ArrowRight, CheckCircle2, Award, Zap } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SellerRecruitment: React.FC = () => {
  const { setIsVendorModalOpen } = useShop();

  return (
    <section className="mx-3 sm:mx-6 max-w-7xl lg:mx-auto my-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white p-6 sm:p-10 lg:p-12 border border-teal-800/40 shadow-xl">
        
        {/* Ambient background decoration */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Pitch & Value Proposition */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>মার্চেন্ট অনবোর্ডিং প্ল্যাটফর্ম</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight font-['Hind_Siliguri'] text-white">
              বিশ্বাস বাজার-এ বিক্রেতা হন, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                দেশজুড়ে কোটি ক্রেতার কাছে
              </span> আপনার পণ্য পৌঁছে দিন
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              কোনো অগ্রিম রেজিস্ট্রেশন ফি ছাড়াই আজই আপনার অনলাইন দোকান খুলুন। আপনার পণ্য সংগ্রহ, দ্রুত ক্যাশ অন ডেলিভারি এবং সাপ্তাহিক নিরাপদ ব্যাংক পেমেন্ট নিশ্চিত করে বিশ্বাস বাজার।
            </p>

            {/* Value bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="flex items-start gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">০% জয়েনিং ফি</h4>
                  <p className="text-[11px] text-slate-400">বিনা খরচে দোকান রেজিস্ট্রেশন</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">৬৪ জেলায় কুরিয়ার</h4>
                  <p className="text-[11px] text-slate-400">ডোরস্টেপ পিকআপ ও শিপিং</p>
                </div>
              </div>

              <div className="flex items-start gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">সাপ্তাহিক সেটেলমেন্ট</h4>
                  <p className="text-[11px] text-slate-400">সরাসরি ব্যাংক বা MFS একাউন্টে</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsVendorModalOpen(true)}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>এখনই বিক্রেতা হিসেবে আবেদন করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsVendorModalOpen(true)}
                className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl border border-white/20 transition-colors"
              >
                কমিশন ও নীতিমালা জানুন
              </button>
            </div>
          </div>

          {/* Right: Live Merchant Metrics Card */}
          <div className="lg:col-span-5 bg-white/5 border border-white/15 p-6 rounded-3xl backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm text-white">মার্চেন্ট প্ল্যাটফর্ম রিপোর্ট</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
                VERIFIED LIVE
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-300">নিবন্ধিত সক্রিয় বিক্রেতা:</span>
                <span className="font-mono font-bold text-sm text-white">৫৫০+ ভেন্ডর</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-300">গড় মাসিক অর্ডার ভলিউম:</span>
                <span className="font-mono font-bold text-sm text-emerald-400">৪৫,০০০+ পার্সেল</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-300">কাস্টমার স্যাটিসফ্যাকশন রেট:</span>
                <span className="font-mono font-bold text-sm text-amber-300">৯৮.৪% সন্তুষ্টি</span>
              </div>

              <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-300">পেমেন্ট নিরাপত্তা ও নিশ্চয়তা:</span>
                <span className="font-mono font-bold text-sm text-teal-300">১০০% ক্যাশ সুরক্ষিত</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center pt-2">
              টাঙ্গাইল, সাতক্ষীরা, ঢাকা ও চট্টগ্রামের প্রতিষ্ঠিত বিক্রেতাদের পরিবারে যোগ দিন।
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
