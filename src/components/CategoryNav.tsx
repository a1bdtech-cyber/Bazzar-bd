import React from 'react';
import { 
  User, 
  Sparkles, 
  LayoutGrid, 
  Shirt, 
  Glasses, 
  Watch, 
  ShoppingBag, 
  Gem, 
  Apple, 
  Smartphone, 
  Home, 
  HeartHandshake, 
  ChevronRight,
  SlidersHorizontal,
  Layers,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORY_SEGMENTS } from '../data/mockData';
import { MainCategorySegment } from '../types';

// Map icon strings to Lucide components
const ICON_MAP: Record<string, React.ReactNode> = {
  'User': <User className="w-4 h-4" />,
  'Sparkles': <Sparkles className="w-4 h-4" />,
  'LayoutGrid': <LayoutGrid className="w-4 h-4" />,
  'Shirt': <Shirt className="w-4 h-4" />,
  'Glasses': <Glasses className="w-4 h-4" />,
  'Watch': <Watch className="w-4 h-4" />,
  'ShoppingBag': <ShoppingBag className="w-4 h-4" />,
  'Gem': <Gem className="w-4 h-4" />,
  'Apple': <Apple className="w-4 h-4" />,
  'Smartphone': <Smartphone className="w-4 h-4" />,
  'Home': <Home className="w-4 h-4" />,
  'HeartHandshake': <HeartHandshake className="w-4 h-4" />,
  'Footprints': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16v-2.38C4 11.5 5.79 9.5 8 9.5c1.5 0 2.8.8 3.5 2" />
      <path d="M20 20v-2.38c0-2.12-1.79-4.12-4-4.12-1.5 0-2.8.8-3.5 2" />
      <circle cx="8" cy="5" r="2" />
      <circle cx="16" cy="9" r="2" />
    </svg>
  ),
  'Pocket': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 10h18" />
      <circle cx="16" cy="14" r="1.5" />
    </svg>
  )
};

export const CategoryNav: React.FC = () => {
  const { 
    activeSegment, 
    setActiveSegment, 
    activeSubcategory, 
    setActiveSubcategory,
    resetCategoryFilters,
    products
  } = useShop();

  const currentSegmentObj = CATEGORY_SEGMENTS.find(s => s.id === activeSegment);

  return (
    <nav className="bg-white border-b border-slate-200 shadow-xs">
      {/* Primary Category Bar: All, Men, Women, Others */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          
          {/* All Products */}
          <button
            onClick={resetCategoryFilters}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
              activeSegment === null
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>সকল পণ্য / All</span>
          </button>

          {/* Men, Women, Others Segments */}
          {CATEGORY_SEGMENTS.map((segment) => {
            const isActive = activeSegment === segment.id;
            const segmentProductCount = products.filter(p => p.segment === segment.id).length;

            return (
              <button
                key={segment.id}
                onClick={() => setActiveSegment(segment.id)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-700 text-white ring-2 ring-teal-500/30 shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-teal-50 hover:text-teal-800 border border-slate-200/90'
                }`}
              >
                <span className={isActive ? 'text-amber-300' : 'text-teal-700'}>
                  {ICON_MAP[segment.iconName] || <LayoutGrid className="w-4 h-4" />}
                </span>
                <span>{segment.nameBn} / {segment.nameEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-normal ${
                  isActive ? 'bg-teal-800 text-amber-200' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {segmentProductCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subcategory Secondary Strip (When a Segment is active) */}
      {currentSegmentObj && (
        <div className="bg-gradient-to-r from-teal-50/90 via-slate-50 to-teal-50/70 border-t border-teal-100/80 py-2.5 px-3 sm:px-6 animate-in slide-in-from-top-1 duration-200">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
            
            <span className="text-[11px] font-bold text-teal-900 shrink-0 flex items-center gap-1 pl-1 pr-2 border-r border-teal-200">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              {currentSegmentObj.nameBn} বিভাগ:
            </span>

            {/* All in this segment */}
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeSubcategory === null
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-teal-100/60 border border-slate-200'
              }`}
            >
              <span>সকল {currentSegmentObj.nameBn}</span>
            </button>

            {/* Segment Subcategories */}
            {currentSegmentObj.subcategories.map((sub) => {
              const isSubActive = activeSubcategory === sub.id;
              const count = products.filter(p => p.subcategoryId === sub.id).length;

              return (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategory(sub.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium shrink-0 transition-all cursor-pointer ${
                    isSubActive
                      ? 'bg-teal-800 text-white shadow-xs font-bold ring-1 ring-teal-600'
                      : 'bg-white text-slate-700 hover:bg-teal-50 hover:text-teal-900 border border-slate-200'
                  }`}
                >
                  <span className={isSubActive ? 'text-amber-300' : 'text-teal-700'}>
                    {ICON_MAP[sub.iconName] || <ShoppingBag className="w-3.5 h-3.5" />}
                  </span>
                  <span>{sub.nameBn}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({sub.nameEn})</span>
                  {count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSubActive ? 'bg-teal-900 text-teal-100' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

          </div>
        </div>
      )}
    </nav>
  );
};
