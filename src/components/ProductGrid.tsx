import React, { useState } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Check, RefreshCw, AlertCircle, X, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { CATEGORIES, CATEGORY_SEGMENTS } from '../data/mockData';

export const ProductGrid: React.FC = () => {
  const { 
    products, 
    activeCategory, 
    setActiveCategory, 
    activeSegment,
    setActiveSegment,
    activeSubcategory,
    setActiveSubcategory,
    resetCategoryFilters,
    searchQuery, 
    setSearchQuery,
    sortBy, 
    setSortBy 
  } = useShop();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Filter products
  let filtered = products.filter((p) => {
    if (activeSegment && p.segment !== activeSegment) return false;
    if (activeSubcategory && p.subcategoryId !== activeSubcategory) return false;
    if (activeCategory && p.categoryId !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.titleBn.toLowerCase().includes(q);
      const matchBrand = p.brand?.toLowerCase().includes(q) || false;
      const matchVendor = p.vendorName.toLowerCase().includes(q);
      const matchCategory = p.categoryNameBn.toLowerCase().includes(q);
      const matchSub = p.subcategoryNameBn?.toLowerCase().includes(q) || false;
      if (!matchTitle && !matchBrand && !matchVendor && !matchCategory && !matchSub) return false;
    }
    const currentPrice = p.salePrice || p.regularPrice;
    if (currentPrice > maxPrice) return false;
    if (inStockOnly && p.stock <= 0) return false;
    return true;
  });

  // Sort products
  filtered = [...filtered].sort((a, b) => {
    const priceA = a.salePrice || a.regularPrice;
    const priceB = b.salePrice || b.regularPrice;
    if (sortBy === 'price_low') return priceA - priceB;
    if (sortBy === 'price_high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') {
      const discA = a.salePrice ? (a.regularPrice - a.salePrice) : 0;
      const discB = b.salePrice ? (b.regularPrice - b.salePrice) : 0;
      return discB - discA;
    }
    return b.soldCount - a.soldCount; // relevance
  });

  // Determine section title and subtitle
  let title = 'সকল আকর্ষণীয় পণ্য';
  let subtitle = 'সরাসরি অনুমোদিত বাংলাদেশি বিক্রেতা ও ব্র্যান্ড থেকে সংগৃহীত';

  if (activeSubcategory) {
    for (const seg of CATEGORY_SEGMENTS) {
      const foundSub = seg.subcategories.find(s => s.id === activeSubcategory);
      if (foundSub) {
        title = `${seg.nameBn} - ${foundSub.nameBn} (${foundSub.nameEn})`;
        subtitle = `${seg.nameBn} কালেকশনের সেরা ${foundSub.nameBn} সম্ভার`;
        break;
      }
    }
  } else if (activeSegment) {
    const seg = CATEGORY_SEGMENTS.find(s => s.id === activeSegment);
    if (seg) {
      title = `${seg.nameBn} / ${seg.nameEn} কালেকশন`;
      subtitle = seg.descriptionBn;
    }
  } else if (activeCategory) {
    const activeCategoryObj = CATEGORIES.find(c => c.id === activeCategory);
    if (activeCategoryObj) {
      title = activeCategoryObj.nameBn;
    }
  }

  return (
    <section className="mx-3 sm:mx-6 max-w-7xl lg:mx-auto mt-8 mb-12">
      
      {/* Section Header & Sort controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Hind_Siliguri']">
              {title}
            </h2>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
              {filtered.length.toLocaleString('bn-BD')} টি পণ্য
            </span>

            {(activeSegment || activeSubcategory || activeCategory) && (
              <button
                onClick={resetCategoryFilters}
                className="inline-flex items-center gap-1 text-[11px] text-teal-700 bg-teal-50 hover:bg-teal-100 px-2 py-0.5 rounded-full font-semibold border border-teal-200 transition-colors"
                title="ফিল্টার রিসেট করুন"
              >
                <span>রিসেট</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {subtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>ফিল্টার</span>
          </button>

          {/* In-stock toggle */}
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              inStockOnly 
                ? 'bg-teal-50 border-teal-300 text-teal-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${inStockOnly ? 'bg-teal-700 border-teal-700 text-white' : 'border-slate-300'}`}>
              {inStockOnly && <Check className="w-2.5 h-2.5" />}
            </div>
            <span>স্টকে আছে এমন পণ্য</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent outline-hidden font-medium cursor-pointer"
            >
              <option value="relevance">জনপ্রিয়তা অনুসারে</option>
              <option value="price_low">কম থেকে বেশি দাম</option>
              <option value="price_high">বেশি থেকে কম দাম</option>
              <option value="rating">সর্বোচ্চ রেটিং</option>
              <option value="discount">সর্বোচ্চ ছাড়</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="sm:hidden bg-slate-50 p-3 rounded-xl border border-slate-200 mt-3 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>ফিল্টার অপশন</span>
            <button 
              onClick={() => { setInStockOnly(false); setMaxPrice(5000); }}
              className="text-teal-700 font-semibold"
            >
              রিসেট
            </button>
          </div>
          
          <label className="flex items-center gap-2 text-xs text-slate-700">
            <input 
              type="checkbox" 
              checked={inStockOnly} 
              onChange={(e) => setInStockOnly(e.target.checked)} 
              className="rounded text-teal-600"
            />
            <span>শুধুমাত্র স্টকে থাকা পণ্য</span>
          </label>

          <div>
            <div className="flex justify-between text-xs text-slate-600 mb-1">
              <span>সর্বোচ্চ বাজেট:</span>
              <span className="font-bold text-teal-800">৳{maxPrice.toLocaleString('bn-BD')}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="5000" 
              step="100" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))} 
              className="w-full accent-teal-700"
            />
          </div>
        </div>
      )}

      {/* Product Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mt-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 mt-6 max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">কোনো পণ্য পাওয়া যায়নি</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            আপনার অনুসন্ধান বা নির্বাচিত ফিল্টারের সাথে মিলে এমন কোনো পণ্য মেলেনি।
          </p>
          <button
            onClick={() => {
              setActiveCategory(null);
              setSearchQuery('');
              setInStockOnly(false);
              setMaxPrice(5000);
            }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>ফিল্টার রিসেট করুন</span>
          </button>
        </div>
      )}

    </section>
  );
};
