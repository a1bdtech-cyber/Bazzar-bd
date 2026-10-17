import React, { useState } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Store, 
  ShieldCheck, 
  PhoneCall, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  PackageCheck,
  LayoutGrid,
  Shirt,
  Glasses,
  Watch,
  ShoppingBag,
  Gem,
  Smartphone,
  Apple,
  Home
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES, VENDORS, LOCALIZED_STRINGS, CATEGORY_SEGMENTS } from '../data/mockData';
import { UserRole, MainCategorySegment } from '../types';

const SUB_ICON_MAP: Record<string, React.ReactNode> = {
  'Shirt': <Shirt className="w-3.5 h-3.5" />,
  'Glasses': <Glasses className="w-3.5 h-3.5" />,
  'Watch': <Watch className="w-3.5 h-3.5" />,
  'ShoppingBag': <ShoppingBag className="w-3.5 h-3.5" />,
  'Gem': <Gem className="w-3.5 h-3.5" />,
  'Smartphone': <Smartphone className="w-3.5 h-3.5" />,
  'Apple': <Apple className="w-3.5 h-3.5" />,
  'Home': <Home className="w-3.5 h-3.5" />,
  'Sparkles': <Sparkles className="w-3.5 h-3.5" />,
  'Footprints': (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16v-2.38C4 11.5 5.79 9.5 8 9.5c1.5 0 2.8.8 3.5 2" />
      <path d="M20 20v-2.38c0-2.12-1.79-4.12-4-4.12-1.5 0-2.8.8-3.5 2" />
      <circle cx="8" cy="5" r="2" />
      <circle cx="16" cy="9" r="2" />
    </svg>
  ),
  'Pocket': (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 10h18" />
      <circle cx="16" cy="14" r="1.5" />
    </svg>
  )
};

export const Header: React.FC = () => {
  const { 
    cart, 
    totals, 
    wishlist, 
    setIsCartOpen, 
    setIsAuthModalOpen, 
    setIsVendorModalOpen, 
    setIsAdminModalOpen,
    searchQuery,
    setSearchQuery,
    activeSegment,
    setActiveSegment,
    activeSubcategory,
    setActiveSubcategory,
    resetCategoryFilters,
    currentUser,
    switchRole,
    products,
    setSelectedProduct,
    orders,
    setSelectedOrder
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDesktopCategoryMenuOpen, setIsDesktopCategoryMenuOpen] = useState(false);
  const [desktopHoveredSegment, setDesktopHoveredSegment] = useState<MainCategorySegment>('men');
  const [mobileExpandedSegment, setMobileExpandedSegment] = useState<MainCategorySegment | null>('men');

  // Live search suggestions
  const searchSuggestions = searchQuery.trim().length > 1
    ? products.filter(p => 
        p.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryNameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategoryNameBn?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectSubcategory = (segmentId: MainCategorySegment, subId: string) => {
    setActiveSegment(segmentId);
    setActiveSubcategory(subId);
    setIsMobileMenuOpen(false);
    setIsDesktopCategoryMenuOpen(false);
  };

  const handleSelectEntireSegment = (segmentId: MainCategorySegment) => {
    setActiveSegment(segmentId);
    setActiveSubcategory(null);
    setIsMobileMenuOpen(false);
    setIsDesktopCategoryMenuOpen(false);
  };

  const activeDesktopSegmentObj = CATEGORY_SEGMENTS.find(s => s.id === desktopHoveredSegment) || CATEGORY_SEGMENTS[0];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200">
      {/* Top Banner with Phase 1 testing info & Trust Badges */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 text-teal-50 text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-medium px-2 py-0.5 rounded-full border border-amber-400/30 text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-400" /> ফেজ ১: ক্যাটাগরি মেনু (ম্যান, ওম্যান, অন্যান্য)
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-teal-100">
              <CheckCircle2 className="w-3 h-3 text-teal-300" /> সারাদেশে দ্রুত ক্যাশ অন ডেলিভারি ও সুরক্ষিত পেমেন্ট
            </span>
          </div>

          <div className="flex items-center gap-4 text-[12px]">
            <a href="tel:16778" className="inline-flex items-center gap-1 text-teal-200 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3" /> হেল্পলাইন: ১৬৭৭৮
            </a>
            
            {/* Quick Role Switcher for MVP Testing */}
            <div className="relative inline-block text-left">
              <select 
                value={currentUser.role}
                onChange={(e) => switchRole(e.target.value as UserRole)}
                className="bg-teal-950/70 text-teal-200 text-xs rounded border border-teal-700/60 py-0.5 px-2 focus:outline-hidden cursor-pointer"
                title="ভূমিকা পরিবর্তন করুন"
              >
                <option value="customer">ক্রেতা (Customer)</option>
                <option value="approved_vendor">বিক্রেতা (Vendor)</option>
                <option value="super_admin">অ্যাডমিন (Admin)</option>
                <option value="guest">অতিথি (Guest)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3 md:gap-4">
          
          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1"
            aria-label="মেনু খুলুন"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-teal-800" /> : <Menu className="w-6 h-6 text-slate-800" />}
          </button>

          {/* Original Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); resetCategoryFilters(); setSearchQuery(''); }}
            className="flex items-center gap-2.5 shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-600 flex items-center justify-center text-white shadow-sm ring-2 ring-teal-500/20 group-hover:scale-105 transition-transform">
              <div className="relative">
                <Store className="w-5 h-5 text-amber-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-teal-900 leading-none flex items-center gap-1 font-['Hind_Siliguri']">
                বিশ্বাস <span className="text-orange-600">বাজার</span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-wide">
                {LOCALIZED_STRINGS.appTagline}
              </span>
            </div>
          </a>

          {/* Desktop Categories Mega Menu Button */}
          <div className="hidden lg:relative lg:block">
            <button
              onClick={() => setIsDesktopCategoryMenuOpen(!isDesktopCategoryMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-teal-50 text-slate-800 hover:text-teal-900 rounded-xl text-xs font-bold border border-slate-200 transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4 text-teal-700" />
              <span>ক্যাটাগরি মেনু</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isDesktopCategoryMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Mega Menu Dropdown */}
            {isDesktopCategoryMenuOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 flex animate-in fade-in duration-150"
                onMouseLeave={() => setIsDesktopCategoryMenuOpen(false)}
              >
                {/* Left Side: Men, Women, Others Segments */}
                <div className="w-48 bg-slate-50 p-2.5 border-r border-slate-200 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                    প্রধান সেগমেন্টসমূহ
                  </div>
                  
                  {CATEGORY_SEGMENTS.map((seg) => (
                    <button
                      key={seg.id}
                      onMouseEnter={() => setDesktopHoveredSegment(seg.id)}
                      onClick={() => handleSelectEntireSegment(seg.id)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        desktopHoveredSegment === seg.id
                          ? 'bg-teal-700 text-white shadow-xs'
                          : 'text-slate-700 hover:bg-teal-50 hover:text-teal-900'
                      }`}
                    >
                      <span>{seg.nameBn} / {seg.nameEn}</span>
                      <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                    </button>
                  ))}

                  <div className="pt-2 border-t border-slate-200 mt-2">
                    <button
                      onClick={() => { resetCategoryFilters(); setIsDesktopCategoryMenuOpen(false); }}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-teal-700 hover:bg-slate-100"
                    >
                      সকল পণ্য দেখুন (All)
                    </button>
                  </div>
                </div>

                {/* Right Side: Specific Subcategories for Hovered Segment */}
                <div className="flex-1 p-4 bg-white space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h4 className="text-xs font-bold text-teal-950 flex items-center gap-1.5">
                      <span>{activeDesktopSegmentObj.nameBn} ({activeDesktopSegmentObj.nameEn}) কালেকশন</span>
                    </h4>
                    <button
                      onClick={() => handleSelectEntireSegment(activeDesktopSegmentObj.id)}
                      className="text-[11px] text-teal-700 hover:underline font-semibold"
                    >
                      সবগুলো দেখুন →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {activeDesktopSegmentObj.subcategories.map((sub) => {
                      const count = products.filter(p => p.subcategoryId === sub.id).length;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleSelectSubcategory(activeDesktopSegmentObj.id, sub.id)}
                          className="flex items-center gap-2 p-2 rounded-xl hover:bg-teal-50 text-left text-xs text-slate-700 hover:text-teal-900 border border-slate-100 hover:border-teal-200 transition-colors"
                        >
                          <div className="w-7 h-7 rounded-lg bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0">
                            {SUB_ICON_MAP[sub.iconName] || <ShoppingBag className="w-3.5 h-3.5" />}
                          </div>
                          <div className="truncate">
                            <p className="font-semibold truncate">{sub.nameBn}</p>
                            <p className="text-[10px] text-slate-400">{sub.nameEn}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Search Bar with live auto-suggestions */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={LOCALIZED_STRINGS.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
                className="w-full pl-11 pr-24 py-2 text-sm bg-slate-50 border border-slate-300 rounded-full focus:bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-100 transition-all outline-hidden text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <button 
                onClick={() => {}}
                className="absolute right-1 top-1 bottom-1 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-full text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                খুঁজুন
              </button>
            </div>

            {/* Dropdown Suggestions */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                <div className="p-2 text-xs font-semibold text-slate-400 bg-slate-50 border-b border-slate-100">
                  পরামর্শকৃত পণ্যসমূহ ({searchSuggestions.length})
                </div>
                {searchSuggestions.map((p) => (
                  <div
                    key={p.id}
                    onMouseDown={() => {
                      setSelectedProduct(p);
                      setIsSearchFocused(false);
                    }}
                    className="flex items-center gap-3 p-2.5 hover:bg-teal-50/70 cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                  >
                    <img src={p.images[0]} alt={p.titleBn} className="w-10 h-10 object-cover rounded-lg border border-slate-200" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-slate-800 truncate">{p.titleBn}</p>
                      <p className="text-[11px] text-slate-500">{p.vendorName} • {p.categoryNameBn}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-teal-700">৳{p.salePrice || p.regularPrice}</span>
                      {p.salePrice && (
                        <span className="block text-[10px] text-slate-400 line-through">৳{p.regularPrice}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Vendor Portal Link */}
            <button
              onClick={() => setIsVendorModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 rounded-lg transition-colors"
            >
              <Store className="w-3.5 h-3.5 text-teal-600" />
              <span>বিক্রেতা কর্নার</span>
            </button>

            {/* Admin Portal Link */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
              title="প্রশাসনিক লগইন পোর্টাল"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              <span>অ্যাডমিন</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                if (wishlist.length > 0) {
                  const firstWish = products.find(p => p.id === wishlist[0]);
                  if (firstWish) setSelectedProduct(firstWish);
                }
              }}
              className="relative p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-full transition-colors"
              title="পছন্দের তালিকা"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl shadow-xs transition-colors group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-white group-hover:scale-105 transition-transform" />
                {totals.itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totals.itemCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col items-start text-left">
                <span className="text-[10px] text-teal-200 leading-none">কার্ট</span>
                <span className="text-xs font-bold leading-none mt-0.5">৳{totals.subtotal.toLocaleString('bn-BD')}</span>
              </div>
            </button>

            {/* User Account / Profile */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {currentUser.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover ring-1 ring-teal-600" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <span className="hidden md:inline-block text-xs font-medium text-slate-800 max-w-[90px] truncate">
                  {currentUser.role === 'guest' ? 'লগইন' : currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-100 bg-slate-50">
                    <p className="font-semibold text-slate-800">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500">{currentUser.phone || currentUser.email || 'অতিথি ব্যবহারকারী'}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-100 text-teal-800">
                      রোল: {currentUser.role}
                    </span>
                  </div>

                  {currentUser.role === 'guest' ? (
                    <button
                      onClick={() => { setIsAuthModalOpen(true); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-teal-700 font-semibold hover:bg-teal-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" /> লগইন অথবা রেজিস্ট্রেশন
                    </button>
                  ) : (
                    <>
                      {orders.length > 0 && (
                        <button
                          onClick={() => {
                            setSelectedOrder(orders[0]);
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <PackageCheck className="w-4 h-4 text-teal-600" /> আমার অর্ডার ট্র্যাকিং
                          </span>
                          <span className="bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded-full text-[10px]">{orders.length}</span>
                        </button>
                      )}
                      
                      <button
                        onClick={() => { switchRole('guest'); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      >
                        লগআউট করুন
                      </button>
                    </>
                  )}

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => { setIsVendorModalOpen(true); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Store className="w-4 h-4 text-amber-600" /> বিক্রেতা হাব ও আবেদন
                    </button>
                    <button
                      onClick={() => { setIsAdminModalOpen(true); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-slate-600" /> প্রশাসনিক নিয়ন্ত্রণ প্যানেল
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="পণ্য, পোশাক, জুতা, সানগ্লাস খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-300 rounded-full focus:bg-white focus:border-teal-600 outline-hidden"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu Drawer (Men, Women, Others hierarchy) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-4 max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-150">
          
          <div className="flex items-center justify-between border-b pb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4 text-teal-700" /> ক্যাটাগরি ব্রাউজ করুন
            </span>
            <button
              onClick={() => { resetCategoryFilters(); setIsMobileMenuOpen(false); }}
              className="text-[11px] text-teal-700 font-semibold"
            >
              সকল পণ্য (All)
            </button>
          </div>

          {/* Men, Women, Others Accordion list */}
          <div className="space-y-2">
            {CATEGORY_SEGMENTS.map((segment) => {
              const isExpanded = mobileExpandedSegment === segment.id;
              
              return (
                <div key={segment.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                  
                  {/* Segment Main Header Button */}
                  <div className="flex items-center justify-between p-3 bg-white cursor-pointer" onClick={() => setMobileExpandedSegment(isExpanded ? null : segment.id)}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs">
                        {segment.id === 'men' ? 'M' : segment.id === 'women' ? 'W' : 'O'}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">
                          {segment.nameBn} / {segment.nameEn}
                        </h4>
                        <p className="text-[10px] text-slate-500">{segment.subcategories.length} টি সাব-ক্যাটাগরি</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180 text-teal-700' : ''}`} />
                  </div>

                  {/* Expanded Subcategories (e.g. clothing, shoes, sunglasses, watches, belts) */}
                  {isExpanded && (
                    <div className="p-2 pt-1 border-t border-slate-100 bg-slate-50/80 space-y-1">
                      
                      <button
                        onClick={() => handleSelectEntireSegment(segment.id)}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 flex items-center justify-between"
                      >
                        <span>সকল {segment.nameBn} পণ্য দেখুন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      {segment.subcategories.map((sub) => {
                        const isSubActive = activeSubcategory === sub.id;
                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleSelectSubcategory(segment.id, sub.id)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                              isSubActive 
                                ? 'bg-teal-700 text-white font-bold' 
                                : 'text-slate-700 hover:bg-white hover:text-teal-900'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={isSubActive ? 'text-amber-300' : 'text-teal-700'}>
                                {SUB_ICON_MAP[sub.iconName] || <ShoppingBag className="w-3.5 h-3.5" />}
                              </span>
                              <span>{sub.nameBn}</span>
                              <span className={`text-[10px] ${isSubActive ? 'text-teal-100' : 'text-slate-400'}`}>({sub.nameEn})</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                          </button>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 pt-3 flex flex-col gap-2">
            <button
              onClick={() => { setIsVendorModalOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full py-2 px-3 text-xs font-semibold text-teal-800 bg-teal-50 rounded-lg flex items-center justify-center gap-2"
            >
              <Store className="w-4 h-4" /> বিক্রেতা হিসেবে যুক্ত হোন / পোর্টাল
            </button>
            <button
              onClick={() => { setIsAdminModalOpen(true); setIsMobileMenuOpen(false); }}
              className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> প্রশাসনিক অ্যাডমিন ড্যাশবোর্ড
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
