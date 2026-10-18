import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Lock, CheckCircle2 } from 'lucide-react';

export const TrustPillars: React.FC = () => {
  return (
    <section className="mx-3 sm:mx-6 max-w-7xl lg:mx-auto my-8">
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md">
        
        <div className="text-center max-w-xl mx-auto mb-8 space-y-1">
          <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
            বিশ্বস্ততার ৪টি মূল ভিত্তি
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-['Hind_Siliguri'] text-white">
            কেন বিশ্বাস বাজার থেকে কেনাকাটা করবেন?
          </h2>
          <p className="text-xs text-slate-400">
            নিরাপদ লেনদেন, আসল পণ্য এবং নির্ভরযোগ্য কুরিয়ার সেবার সমন্বয়ে গ্রাহক সন্তুষ্টি
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-400/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white font-['Hind_Siliguri']">১০০% আসল ও খাঁটি পণ্য</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              সরাসরি টাঙ্গাইল তাঁত, সুন্দরবন মধু ও প্রত্যয়িত গ্যাজেট ব্র্যান্ড থেকে সংগৃহীত। ভেজালহীন পণ্যের নিশ্চয়তা।
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> কোয়ালিটি চেকে উত্তীর্ণ
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-400/30">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white font-['Hind_Siliguri']">দ্রুত ক্যাশ অন ডেলিভারি</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ঢাকা ও সারাদেশে নির্ভরযোগ্য কুরিয়ার পার্টনারের মাধ্যমে হোম ডেলিভারি। পণ্য হাতে পেয়ে মূল্য দিন।
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] text-teal-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> ২৪-৭২ ঘণ্টার মধ্যে ডেলিভারি
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white font-['Hind_Siliguri']">৭ দিনের সহজ রিটার্ন</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              পণ্য ক্ষতিগ্রস্ত বা বিবরণের সাথে অমিল থাকলে ৭ দিনের মধ্যে কোনো ঝামেলা ছাড়াই রিটার্ন বা রিফান্ড সুবিধা।
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> সম্পূর্ণ মূল্য ফেরত গ্যারান্টি
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-400/30">
              <Headphones className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-white font-['Hind_Siliguri']">২৪/৭ কাস্টমার কেয়ার</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              অর্ডার ট্র্যাকিং, পণ্য তথ্য বা যেকোনো জিজ্ঞাসায় আমাদের ডেডিকেটেড সাপোর্ট টিম সার্বক্ষণিক প্রস্তুত।
            </p>
            <span className="inline-flex items-center gap-1 text-[11px] text-indigo-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> ১৬৭৭৮ হটলাইন সাপোর্ট
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
