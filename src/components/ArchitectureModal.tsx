import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Compass, 
  FileCode, 
  GitBranch, 
  ExternalLink 
} from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'arch' | 'folders' | 'journeys' | 'firestore' | 'checklist'>('arch');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-teal-950 text-white rounded-t-3xl">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-teal-800 rounded-xl">
              <Layers className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg font-['Hind_Siliguri'] flex items-center gap-2">
                বিশ্বাস বাজার — আর্কিটেকচার ও ফেজ ১ স্পেসিফিকেশন
              </h2>
              <p className="text-xs text-teal-300">Phase 1 Technical Architecture & Firestore Data Model Plan</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-teal-800 text-teal-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setTab('arch')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
              tab === 'arch' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ১. আর্কিটেকচার ডায়াগ্রাম
          </button>
          <button
            onClick={() => setTab('folders')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
              tab === 'folders' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ২. ফাইল ও ফোল্ডার কাঠামো
          </button>
          <button
            onClick={() => setTab('journeys')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
              tab === 'journeys' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ৩. প্রধান ব্যবহারকারী যাত্রা (User Journeys)
          </button>
          <button
            onClick={() => setTab('firestore')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
              tab === 'firestore' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ৪. ফায়ারস্টোর কালেকশন প্ল্যান
          </button>
          <button
            onClick={() => setTab('checklist')}
            className={`py-3 px-3.5 border-b-2 transition-colors whitespace-nowrap ${
              tab === 'checklist' ? 'border-teal-700 text-teal-800' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ৫. ফেজভিত্তিক বাস্তবায়ন চেকলিস্ট
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 text-xs sm:text-sm leading-relaxed space-y-4">
          
          {tab === 'arch' && (
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200">
                <h3 className="font-bold text-teal-950 text-sm mb-1">সিস্টেম আর্কিটেকচার ওভারভিউ</h3>
                <p className="text-slate-600">
                  বিশ্বাস বাজার একটি মাল্টি-টায়ার ক্লাউড আর্কিটেকচার অনুসরণ করে যা উচ্চ মাপযোগ্যতা, নিরাপত্তা এবং স্থানীয় বাংলাদেশি লেনদেন ব্যবস্থার (COD + MFS) সাথে সামঞ্জস্যপূর্ণ।
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-800 block text-xs">১. ক্লায়েন্ট লেয়ার (Frontend)</span>
                  <p className="text-[11px] text-slate-600">
                    React + TypeScript + Vite + Tailwind CSS। সম্পূর্ণ মোবাইল-ফার্স্ট ও রেসপনসিভ। Hind Siliguri বাংলা টাইপোগ্রাফি এবং অফলাইন ক্যাশিং।
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-800 block text-xs">২. সিকিউরিটি ও আইডেন্টিটি</span>
                  <p className="text-[11px] text-slate-600">
                    Firebase Auth (Email, Phone OTP, Google) + Firestore Security Rules RBAC (Guest, Customer, Vendor, Support, Finance, Super Admin)।
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-800 block text-xs">৩. পারসিস্টেন্স ও পেমেন্ট</span>
                  <p className="text-[11px] text-slate-600">
                    Cloud Firestore (NoSQL স্কেলেবল ডাটাবেস) + Firebase Storage (পণ্যের ছবি)। COD ট্র্যাকিং এবং bKash/Nagad স্যান্ডবক্স গেটওয়ে অ্যাডাপ্টার।
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === 'folders' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-slate-900 text-emerald-400 rounded-xl overflow-x-auto space-y-1">
                <p className="text-amber-300 font-bold">/ (Workspace Root)</p>
                <p>├── index.html                   # Bengali typography (Hind Siliguri) & SEO meta</p>
                <p>├── metadata.json                # App identifier & capabilities</p>
                <p>├── package.json                 # Dependencies (React 19, Lucide, Tailwind v4)</p>
                <p>├── src/</p>
                <p>│   ├── main.tsx                 # React entry point</p>
                <p>│   ├── App.tsx                  # Main layout orchestrator</p>
                <p>│   ├── index.css                # Global styles & Tailwind imports</p>
                <p>│   ├── types/</p>
                <p>│   │   └── index.ts             # Typed domain models (Product, Cart, Order, RBAC)</p>
                <p>│   ├── data/</p>
                <p>│   │   └── mockData.ts          # Authentic BD products, vendors, divisions</p>
                <p>│   ├── context/</p>
                <p>│   │   └── ShopContext.tsx      # State manager (Cart, BD Delivery, Coupons, RBAC)</p>
                <p>│   └── components/</p>
                <p>│       ├── Header.tsx           # Search suggestions, logo, role switcher, cart</p>
                <p>│       ├── CategoryNav.tsx      # Horizontal categories navigation</p>
                <p>│       ├── CampaignCarousel.tsx # Promotional hero banners</p>
                <p>│       ├── FlashDeals.tsx       # Live countdown flash offers</p>
                <p>│       ├── ProductCard.tsx      # Discount %, seller badge, quick-buy</p>
                <p>│       ├── ProductGrid.tsx      # Sort & filter controls with zero-state</p>
                <p>│       ├── ProductDetailModal.tsx # Specs, reviews, variants, BD delivery fee</p>
                <p>│       ├── CartDrawer.tsx       # Multi-vendor notice, BD shipping, coupons</p>
                <p>│       ├── CheckoutModal.tsx    # Address (division/district/thana) & COD/bKash</p>
                <p>│       ├── OrderTrackingModal.tsx # Status timeline milestones & invoice</p>
                <p>│       ├── AuthModal.tsx        # Customer login/register & OTP simulator</p>
                <p>│       ├── VendorPortalModal.tsx # Vendor onboarding application & dashboard</p>
                <p>│       ├── AdminPortalModal.tsx  # PIN protected dashboard & approval queue</p>
                <p>│       ├── VendorStorefrontModal.tsx # Dedicated seller shop page</p>
                <p>│       ├── MobileBottomNav.tsx  # Mobile thumb navigation</p>
                <p>│       ├── Footer.tsx           # 4 Trust pillars & nationwide coverage</p>
                <p>│       └── Toast.tsx            # Floating action notification</p>
              </div>
            </div>
          )}

          {tab === 'journeys' && (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-teal-800">১. সাধারণ ক্রেতা যাত্রা (Customer Journey):</span>
                <p className="text-xs text-slate-600 mt-1">
                  ব্রাউজ বা অনুসন্ধান ➔ লাইভ ফিল্টারিং ➔ ভ্যারিয়েন্ট ও ডেলিভারি চার্জ যাচাই ➔ কার্টে যোগ ➔ কুপন ছাড় প্রয়োগ ➔ চেকআউট ঠিকানায় বিভাগ/জেলা নির্বাচন ➔ ক্যাশ অন ডেলিভারি নির্বাচন ➔ রিয়েলটাইম অর্ডার ট্র্যাকিং।
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-teal-800">২. বিক্রেতা আবেদন ও মার্চেন্ট যাত্রা (Vendor Journey):</span>
                <p className="text-xs text-slate-600 mt-1">
                  বিক্রেতা কর্নার ➔ আবেদনপত্র পূরণ (শপ নাম, ফোন, ক্যাটাগরি, ট্রেড লাইসেন্স) ➔ স্ট্যাটাস 'Under Review' ➔ অ্যাডমিন কর্তৃক অনুমোদন ➔ বিক্রেতা ড্যাশবোর্ড এক্সেস ➔ পণ্য ও স্টক ম্যানেজমেন্ট ➔ কমিশন ও সেটেলমেন্ট পর্যবেক্ষণ।
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-teal-800">৩. প্রশাসনিক নিয়ন্ত্রণ যাত্রা (Admin Governance):</span>
                <p className="text-xs text-slate-600 mt-1">
                  পিন/পাসওয়ার্ড নিরাপত্তা গেট ➔ অপেক্ষমাণ বিক্রেতা আবেদন অনুমোদন বা বাতিল ➔ জিএমভি ও কমিশন হিসাব ➔ সিওডি রিকনসিলিয়েশন ও কুরিয়ার অর্থ ট্র্যাকিং।
                </p>
              </div>
            </div>
          )}

          {tab === 'firestore' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-600">
                ফেজ ২-এর জন্য পরিকল্পিত ক্লাউড ফায়ারস্টোর কালেকশন কাঠামো (Schema Plan):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold font-mono text-teal-800">/users/{'{uid}'}</span>
                  <p className="text-[11px] text-slate-500">গ্রাহকের প্রোফাইল, ফোন, রোল (Customer, Admin), সংরক্ষিত ঠিকানা।</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold font-mono text-teal-800">/vendors/{'{vendorId}'}</span>
                  <p className="text-[11px] text-slate-500">অনুমোদিত বিক্রেতা শপের নাম, লোগো, ঠিকানা, রেটিং, কমিশন রেট।</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold font-mono text-teal-800">/vendorApplications/{'{appId}'}</span>
                  <p className="text-[11px] text-slate-500">বিক্রেতা অনবোর্ডিং আবেদন, ট্রেড লাইসেন্স, স্ট্যাটাস (under_review, approved)।</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold font-mono text-teal-800">/products/{'{productId}'}</span>
                  <p className="text-[11px] text-slate-500">পণ্য বিবরণ, দাম, স্টক, ভ্যারিয়েন্ট, বিক্রেতা আইডি, পাবলিশ স্ট্যাটাস।</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold font-mono text-teal-800">/orders/{'{orderId}'}</span>
                  <p className="text-[11px] text-slate-500">অর্ডার নম্বর, পণ্যের স্ন্যাপশট, ডেলিভারি ঠিকানা, সিওডি/পেমেন্ট স্ট্যাটাস, সাব-অর্ডার।</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold font-mono text-teal-800">/coupons/{'{code}'}</span>
                  <p className="text-[11px] text-slate-500">ছাড় শতকরা হার, সর্বোচ্চ ডিসকাউন্ট, মেয়াদ, ব্যবহার সীমা।</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="font-bold font-mono text-teal-800">/auditLogs/{'{logId}'}</span>
                  <p className="text-[11px] text-slate-500">অ্যাডমিন কর্তৃক অনুমোদিত আর্থিক লেনদেন, সেটেলমেন্ট ও ভেন্ডর পরিবর্তনের রেকর্ড।</p>
                </div>
              </div>
            </div>
          )}

          {tab === 'checklist' && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-200 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>ফেজ ১: আর্কিটেকচার, আসল ব্র্যান্ড ডিজাইন ও ফুল রেসপনসিভ বাংলা স্টোরফ্রন্ট (সম্পন্ন)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 text-xs">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>ফেজ ২: ফায়ারবেস অথেন্টিকেশন, ক্লাউড ফায়ারস্টোর ডাটাবেস ও সিকিউরিটি রুলস ইন্টিগ্রেশন (পরবর্তী ধাপ)</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 text-xs">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>ফেজ ৩: গ্রাহক ও বিক্রেতা অ্যাকাউন্ট ও মাল্টি-অ্যাড্রেস বুক ম্যানেজমেন্ট</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 text-xs">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>ফেজ ৪: রিয়েলটাইম ইনভেন্টরি রূপরেখা ও বিক্রেতা প্রোডাক্ট ইমেজ আপলোড</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 text-xs">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>ফেজ ৫: মাল্টি-ভেন্ডর অর্ডার স্প্লিটিং ও সার্ভার-সাইড টোটাল ক্যালকুলেশন</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 text-xs">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>ফেজ ৬: সিওডি রিকনসিলিয়েশন ও বিকাশ/নগদ গেটওয়ে ইন্টিগ্রেশন</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 text-xs">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>ফেজ ৭: ভেন্ডর সেটেলমেন্ট, প্ল্যাটফর্ম কমিশন ও অডিট লগ কন্ট্রোল</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-slate-50 text-slate-600 rounded-lg border border-slate-200 text-xs">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>ফেজ ৮ ও ৯: সিকিউরিটি অডিট, কিউএ টেস্টিং ও প্রোডাকশন রিলিজ</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
          <span className="text-slate-500">Bishwas Bazar Architecture Reference</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl transition-colors"
          >
            বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
};
