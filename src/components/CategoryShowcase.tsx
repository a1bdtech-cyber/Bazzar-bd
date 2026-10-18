import React from 'react';
import { 
  Smartphone, 
  Laptop, 
  Tv, 
  Shirt, 
  Home, 
  Sparkles, 
  Trophy, 
  Baby, 
  Apple, 
  Gem,
  ChevronRight 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface ShowcaseCategoryItem {
  id: string;
  nameBn: string;
  nameEn: string;
  count: string;
  icon: React.ReactNode;
  segment?: 'men' | 'women' | 'others';
  categoryId?: string;
  subcategoryId?: string;
  bgGradient: string;
  borderColor: string;
}

export const CategoryShowcase: React.FC = () => {
  const { setActiveCategory, setActiveSegment, setActiveSubcategory } = useShop();

  const TOP_CATEGORIES: ShowcaseCategoryItem[] = [
    {
      id: 'cat-phones',
      nameBn: 'স্মার্টফোন ও ট্যাব',
      nameEn: 'Smartphones & Tablets',
      count: '৮৫+ পণ্য',
      icon: <Smartphone className="w-5 h-5 text-sky-600" />,
      segment: 'others',
      subcategoryId: 'sub-electronics',
      bgGradient: 'from-sky-50 to-blue-50/40',
      borderColor: 'border-sky-200/70 hover:border-sky-400'
    },
    {
      id: 'cat-laptops',
      nameBn: 'কম্পিউটার ও ল্যাপটপ',
      nameEn: 'Computers & Laptops',
      count: '৪০+ পণ্য',
      icon: <Laptop className="w-5 h-5 text-indigo-600" />,
      segment: 'others',
      subcategoryId: 'sub-electronics',
      bgGradient: 'from-indigo-50 to-blue-50/40',
      borderColor: 'border-indigo-200/70 hover:border-indigo-400'
    },
    {
      id: 'cat-gadgets',
      nameBn: 'ইলেকট্রনিক্স ও গ্যাজেট',
      nameEn: 'Electronics & Gadgets',
      count: '১২০+ পণ্য',
      icon: <Tv className="w-5 h-5 text-cyan-600" />,
      categoryId: 'cat-electronics',
      bgGradient: 'from-cyan-50 to-teal-50/40',
      borderColor: 'border-cyan-200/70 hover:border-cyan-400'
    },
    {
      id: 'cat-fashion-men',
      nameBn: 'পুরুষের ফ্যাশন ও ঘড়ি',
      nameEn: 'Men Lifestyle',
      count: '২০০+ পণ্য',
      icon: <Shirt className="w-5 h-5 text-teal-700" />,
      segment: 'men',
      bgGradient: 'from-teal-50 to-emerald-50/40',
      borderColor: 'border-teal-200/70 hover:border-teal-400'
    },
    {
      id: 'cat-fashion-women',
      nameBn: 'নারীদের পোশাক ও শাড়ি',
      nameEn: 'Women Fashion',
      count: '৩৫০+ পণ্য',
      icon: <Sparkles className="w-5 h-5 text-rose-600" />,
      segment: 'women',
      bgGradient: 'from-rose-50 to-pink-50/40',
      borderColor: 'border-rose-200/70 hover:border-rose-400'
    },
    {
      id: 'cat-organic',
      nameBn: 'খাঁটি খাদ্য ও অর্গানিক',
      nameEn: 'Pure Foods & Honey',
      count: '৬০+ পণ্য',
      icon: <Apple className="w-5 h-5 text-emerald-700" />,
      categoryId: 'cat-organic',
      bgGradient: 'from-emerald-50 to-green-50/40',
      borderColor: 'border-emerald-200/70 hover:border-emerald-400'
    },
    {
      id: 'cat-home',
      nameBn: 'গৃহস্থালি ও লিভিং',
      nameEn: 'Home & Kitchen',
      count: '১১০+ পণ্য',
      icon: <Home className="w-5 h-5 text-amber-600" />,
      categoryId: 'cat-home',
      bgGradient: 'from-amber-50 to-yellow-50/40',
      borderColor: 'border-amber-200/70 hover:border-amber-400'
    },
    {
      id: 'cat-beauty',
      nameBn: 'রূপচর্চা ও স্কিনকেয়ার',
      nameEn: 'Beauty & Skincare',
      count: '৯০+ পণ্য',
      icon: <Gem className="w-5 h-5 text-fuchsia-600" />,
      categoryId: 'cat-beauty',
      bgGradient: 'from-fuchsia-50 to-purple-50/40',
      borderColor: 'border-fuchsia-200/70 hover:border-fuchsia-400'
    },
    {
      id: 'cat-handicraft',
      nameBn: 'হস্তশিল্প ও ঐতিহ্য',
      nameEn: 'Handicrafts & Jute',
      count: '৭৫+ পণ্য',
      icon: <Trophy className="w-5 h-5 text-orange-600" />,
      categoryId: 'cat-handicraft',
      bgGradient: 'from-orange-50 to-amber-50/40',
      borderColor: 'border-orange-200/70 hover:border-orange-400'
    },
    {
      id: 'cat-baby',
      nameBn: 'শিশুদের যত্ন ও খেলনা',
      nameEn: 'Baby & Kids',
      count: '৫০+ পণ্য',
      icon: <Baby className="w-5 h-5 text-purple-600" />,
      segment: 'others',
      bgGradient: 'from-purple-50 to-pink-50/40',
      borderColor: 'border-purple-200/70 hover:border-purple-400'
    }
  ];

  const handleCategoryClick = (item: ShowcaseCategoryItem) => {
    if (item.subcategoryId) {
      if (item.segment) setActiveSegment(item.segment);
      setActiveSubcategory(item.subcategoryId);
    } else if (item.segment) {
      setActiveSegment(item.segment);
      setActiveSubcategory(null);
    } else if (item.categoryId) {
      setActiveCategory(item.categoryId);
    }
  };

  return (
    <section className="mx-3 sm:mx-6 max-w-7xl lg:mx-auto my-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Hind_Siliguri']">
            ক্যাটাগরি ভিত্তিক কেনাকাটা (Shop by Category)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            স্মার্টফোন, ফ্যাশন, খাঁটি খাদ্য ও লাইফস্টাইল কালেকশন সরাসরি ব্রাউজ করুন
          </p>
        </div>
      </div>

      {/* Grid of category tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mt-4">
        {TOP_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryClick(cat)}
            className={`p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br ${cat.bgGradient} border ${cat.borderColor} text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer flex flex-col justify-between group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </div>

            <div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug font-['Hind_Siliguri']">
                {cat.nameBn}
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5 font-medium">
                {cat.nameEn}
              </p>
              <span className="inline-block mt-2 text-[10px] text-slate-600 font-semibold bg-white/70 px-2 py-0.5 rounded-md border border-slate-200/50">
                {cat.count}
              </span>
            </div>
          </button>
        ))}
      </div>

    </section>
  );
};
