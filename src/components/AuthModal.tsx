import React, { useState } from 'react';
import { 
  X, 
  User, 
  Lock, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Store, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { UserRole } from '../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, setIsAdminModalOpen, switchRole, showToast } = useShop();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('01712-345678');
  const [email, setEmail] = useState('tanvir.bd@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('তানভীর রহমান');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  if (!isAuthModalOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if owner is logging in with their email
    if (authMethod === 'email' && (email.trim().toLowerCase() === 'iamakhinoor@gmail.com' || email.trim().toLowerCase() === 'admin@bishwasbazar.com')) {
      setIsAuthModalOpen(false);
      setIsAdminModalOpen(true);
      showToast('ওনার অ্যাকাউন্ট সনাক্ত হয়েছে। অনুগ্রহ করে গোপন পিন দিন।');
      return;
    }

    if (authMethod === 'phone' && !otpSent) {
      setOtpSent(true);
      showToast('আপনার মোবাইলে একটি ৪ ডিজিটের ওটিপি (OTP) পাঠানো হয়েছে');
      return;
    }

    // Successfully log in as customer
    switchRole('customer');
    setIsAuthModalOpen(false);
    showToast(tab === 'login' ? 'সফলভাবে লগইন হয়েছে!' : 'আপনার অ্যাকাউন্ট তৈরি সম্পন্ন হয়েছে!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 text-slate-800">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-tr from-teal-900 to-teal-800 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-teal-700 text-teal-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <Store className="w-5 h-5 text-amber-300" />
            <span className="font-bold text-lg font-['Hind_Siliguri']">বিশ্বাস বাজার একাউন্ট</span>
          </div>
          <p className="text-xs text-teal-200">
            {tab === 'login' ? 'আপনার অ্যাকাউন্টে প্রবেশ করে দ্রুত অর্ডার করুন' : 'নতুন অ্যাকাউন্ট তৈরি করে আকর্ষণীয় অফার উপভোগ করুন'}
          </p>

          {/* Tab Selector */}
          <div className="flex bg-teal-950/60 p-1 rounded-xl mt-4">
            <button
              onClick={() => { setTab('login'); setOtpSent(false); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'login' ? 'bg-teal-600 text-white shadow-xs' : 'text-teal-300 hover:text-white'
              }`}
            >
              লগইন
            </button>
            <button
              onClick={() => { setTab('register'); setOtpSent(false); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'register' ? 'bg-teal-600 text-white shadow-xs' : 'text-teal-300 hover:text-white'
              }`}
            >
              নতুন একাউন্ট
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleAuthSubmit} className="p-5 space-y-4">
          
          {/* Method selector: Phone vs Email */}
          <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-600 pb-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="authMethod"
                checked={authMethod === 'phone'}
                onChange={() => setAuthMethod('phone')}
                className="text-teal-700"
              />
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>মোবাইল নম্বর</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="authMethod"
                checked={authMethod === 'email'}
                onChange={() => setAuthMethod('email')}
                className="text-teal-700"
              />
              <Mail className="w-3.5 h-3.5 text-teal-700" />
              <span>ইমেইল আইডি</span>
            </label>
          </div>

          {tab === 'register' && (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                আপনার পুরো নাম:
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: তানভীর রহমান"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          {authMethod === 'phone' ? (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                মোবাইল নম্বর:
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01712-345678"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                ইমেইল ঠিকানা:
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          {authMethod === 'phone' && otpSent ? (
            <div>
              <label className="text-xs font-semibold text-emerald-800 block mb-1">
                ওটিপি কোড (OTP) লিখুন:
              </label>
              <input
                type="text"
                required
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="মক কোড যেমন: 1234"
                className="w-full px-3 py-2 text-center text-sm font-bold tracking-widest border-2 border-emerald-500 rounded-xl focus:border-teal-600 outline-hidden"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                সিমুলেশন ওটিপি: যেকোনো ৪ সংখ্যার কোড দিয়ে প্রবেশ করতে পারেন
              </span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700">
                  পাসওয়ার্ড:
                </label>
                {tab === 'login' && (
                  <button type="button" className="text-[11px] text-teal-700 hover:underline">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:border-teal-600 outline-hidden"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{authMethod === 'phone' && !otpSent ? 'ওটিপি (OTP) পাঠান' : (tab === 'login' ? 'লগইন করুন' : 'নিবন্ধন সম্পন্ন করুন')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Demo Customer and Vendor access */}
          <div className="mt-4 pt-3 border-t border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 block mb-2 text-center">
              পরীক্ষামূলক রোল লগইন:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => { switchRole('customer'); setIsAuthModalOpen(false); }}
                className="py-1.5 px-2 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-700 font-medium rounded-lg text-center"
              >
                সাধারণ ক্রেতা
              </button>
              <button
                type="button"
                onClick={() => { switchRole('approved_vendor'); setIsAuthModalOpen(false); }}
                className="py-1.5 px-2 bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium rounded-lg text-center"
              >
                অনুমোদিত বিক্রেতা
              </button>
            </div>
            <button
              type="button"
              onClick={() => { setIsAuthModalOpen(false); setIsAdminModalOpen(true); }}
              className="text-[10px] text-slate-400 hover:text-amber-700 text-center mt-2 block w-full transition-colors cursor-pointer"
            >
              🔒 সুপার অ্যাডমিন নিয়ন্ত্রণ (শুধুমাত্র অনুমোদিত ওনারের জন্য সংরক্ষিত)
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
