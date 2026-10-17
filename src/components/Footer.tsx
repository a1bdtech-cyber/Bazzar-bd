import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CreditCard, 
  PhoneCall, 
  Mail, 
  MapPin, 
  Store, 
  ChevronRight,
  Info
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { BANGLADESH_DIVISIONS } from '../data/mockData';

export const Footer: React.FC = () => {
  const { setActiveCategory, setIsVendorModalOpen, setIsAdminModalOpen } = useShop();
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const policyContent: Record<string, { title: string; content: string }> = {
    'terms': {
      title: 'ব্যবহারের শর্তাবলী (Terms of Service)',
      content: 'বিশ্বাস বাজার প্ল্যাটফর্মে কেনাকাটা ও বিক্রয়ের ক্ষেত্রে দেশের প্রচলিত ই-কমার্স নীতিমালা ও ভোক্তা অধিকার সংরক্ষণ আইন কঠোরভাবে অনুসরণ করা হয়। প্রতিটি বিক্রেতা তাদের পণ্যের গুণগত মান বজায় রাখতে দায়বদ্ধ।'
    },
    'privacy': {
      title: 'গোপনীয়তা নীতিমালা (Privacy Policy)',
      content: 'গ্রাহকের নাম, মোবাইল নম্বর এবং ডেলিভারি ঠিকানা শুধুমাত্র অর্ডার প্রসেসিং ও পার্সেল প্রেরণের কাজে ব্যবহৃত হয়। কোনো তৃতীয় পক্ষের সাথে গ্রাহকের ব্যক্তিগত তথ্য শেয়ার করা হয় না।'
    },
    'return': {
      title: 'রিটার্ন, রিফান্ড ও বিরোধ নিষ্পত্তি নীতিমালা',
      content: 'পণ্য পাওয়ার ৭ দিনের মধ্যে যেকোনো ত্রুটিযুক্ত বা ক্ষতিগ্রস্ত পণ্যের ক্ষেত্রে ছবি/ভিডিও প্রমাণ সাপেক্ষে সহজ রিটার্ন ও রিফান্ড গ্রহণ করা হয়। খাদ্যপণ্যের ক্ষেত্রে সিল খোলার পূর্বে অভিযোগ জানাতে হবে।'
    },
    'vendor': {
      title: 'বিক্রেতা চুক্তি ও কমিশন নীতিমালা',
      content: 'অনুমোদিত বিক্রেতাদের জন্য ৫%-৭% ক্যাটাগরিভিত্তিক নামমাত্র কমিশন প্রযোজ্য। প্রতিটি অর্ডারের সফল ডেলিভারির পর নির্ধারিত সময়সীমার মধ্যে ব্যাংক বা এমএফএস অ্যাকাউন্টে অর্থ স্থানান্তর করা হয়।'
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 border-t border-slate-800">
      
      {/* 4 Trust Value Pillars */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-900/60 border border-teal-700/50 flex items-center justify-center text-teal-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-['Hind_Siliguri']">সারাদেশে ডেলিভারি</h4>
              <p className="text-[11px] text-slate-400">৬৪ জেলায় দ্রুত হোম ডেলিভারি ও কুরিয়ার সুবিধা</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-['Hind_Siliguri']">ক্যাশ অন ডেলিভারি</h4>
              <p className="text-[11px] text-slate-400">পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/60 border border-amber-700/50 flex items-center justify-center text-amber-400 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-['Hind_Siliguri']">৭ দিনের সহজ রিটার্ন</h4>
              <p className="text-[11px] text-slate-400">পণ্য অপছন্দ বা ত্রুটি থাকলে দ্রুত সমাধান</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-900/60 border border-teal-700/50 flex items-center justify-center text-amber-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white font-['Hind_Siliguri']">১০০% আসল পণ্য</h4>
              <p className="text-[11px] text-slate-400">যাচাইকৃত দেশীয় কারিগর ও ব্র্যান্ডের সম্ভার</p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white">
                <Store className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Hind_Siliguri']">
                বিশ্বাস <span className="text-orange-500">বাজার</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              বিশ্বাসের সাথে কেনাকাটা — স্থানীয় উৎপাদক ও বিক্রেতাদের সাথে সরাসরি সাধারণ ক্রেতার মেলবন্ধন ঘটানো একটি নির্ভরযোগ্য বাংলাদেশি ই-কমার্স প্ল্যাটফর্ম।
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-teal-400" />
                <span>গ্রাহক সহায়তা: ১৬৭৭৮ (সকাল ৯টা - রাত ১০টা)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>ইমেইল: support@bishwasbazar.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>প্রধান কার্যালয়: [কনফিগারেশন প্লেসহোল্ডার: ঢাকা, বাংলাদেশ]</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-['Hind_Siliguri']">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveCategory(null)} className="hover:text-white transition-colors">
                  সকল পণ্য তালিকা
                </button>
              </li>
              <li>
                <button onClick={() => setIsVendorModalOpen(true)} className="hover:text-white transition-colors">
                  বিক্রেতা হিসেবে যোগ দিন
                </button>
              </li>
              <li>
                <button onClick={() => setIsAdminModalOpen(true)} className="hover:text-white transition-colors">
                  প্রশাসনিক পোর্টাল (অ্যাডমিন)
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('vendor')} className="hover:text-white transition-colors">
                  মার্কেটপ্লেস কমিশন পলিসি
                </button>
              </li>
            </ul>
          </div>

          {/* Policy Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-['Hind_Siliguri']">
              নীতিমালা ও শর্তাবলী
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => setActivePolicyModal('terms')} className="hover:text-white transition-colors">
                  ব্যবহারের সাধারণ শর্তাবলী
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('privacy')} className="hover:text-white transition-colors">
                  গোপনীয়তা নীতিমালা
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('return')} className="hover:text-white transition-colors">
                  রিটার্ন ও রিফান্ড নীতি
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('vendor')} className="hover:text-white transition-colors">
                  বিক্রেতা নির্দেশিকা
                </button>
              </li>
            </ul>
          </div>

          {/* Nationwide Coverage */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider font-['Hind_Siliguri']">
              দেশব্যাপী কভারেজ (৮ বিভাগ)
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {BANGLADESH_DIVISIONS.map(div => (
                <span key={div.id} className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60">
                  {div.nameBn}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 pt-1">
              * ৬৪ জেলার প্রতিটি উপজেলা ও ইউনিয়নে নির্ভরযোগ্য কুরিয়ার পার্টনারের মাধ্যমে ডেলিভারি কার্যকর।
            </p>
          </div>

        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© ২০২৬ বিশ্বাস বাজার (Bishwas Bazar)। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>ফেজ ১: আর্কিটেকচার ও ইউআই ডেমো স্টেট (রিয়েল ফায়ারবেস ইন্টিগ্রেশনের জন্য প্রস্তুত)</span>
          </div>
        </div>

      </div>

      {/* Policy View Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white text-slate-800 p-6 rounded-2xl max-w-lg w-full space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-bold text-sm text-slate-900">{policyContent[activePolicyModal].title}</h3>
              <button onClick={() => setActivePolicyModal(null)} className="p-1 text-slate-400 hover:text-slate-700">
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {policyContent[activePolicyModal].content}
            </p>
            <div className="text-right pt-2">
              <button 
                onClick={() => setActivePolicyModal(null)} 
                className="px-4 py-1.5 bg-teal-700 text-white rounded-lg text-xs font-semibold"
              >
                ঠিক আছে
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
