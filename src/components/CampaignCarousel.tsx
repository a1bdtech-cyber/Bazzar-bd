import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Tag, Clock, ArrowRight } from 'lucide-react';
import { CAMPAIGNS } from '../data/mockData';
import { useShop } from '../context/ShopContext';

export const CampaignCarousel: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { setActiveCategory, setActiveSegment } = useShop();

  // Auto rotate banners every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % CAMPAIGNS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = CAMPAIGNS[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + CAMPAIGNS.length) % CAMPAIGNS.length);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % CAMPAIGNS.length);
  };

  const handleCampaignClick = () => {
    if (current.id === 'camp-3') {
      setActiveSegment('men');
    } else if (current.id === 'camp-1') {
      setActiveSegment('women');
    } else if (current.categoryId) {
      setActiveCategory(current.categoryId);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl mx-3 sm:mx-6 max-w-7xl lg:mx-auto mt-4 shadow-sm border border-slate-200">
      <div className={`relative min-h-[220px] sm:min-h-[300px] md:min-h-[340px] bg-gradient-to-r ${current.bgColor} text-white flex items-center transition-all duration-700`}>
        
        {/* Background Image Overlay with subtle blur & gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src={current.bannerImage} 
            alt={current.titleBn} 
            className="w-full h-full object-cover opacity-25 mix-blend-overlay filter blur-[1px]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-teal-950/95 via-teal-950/70 to-transparent"></div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 p-5 sm:p-10 max-w-2xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-teal-950 font-bold text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Tag className="w-3 h-3" /> {current.badgeBn}
            </span>
            <span className="bg-white/10 backdrop-blur-xs text-amber-200 text-[11px] sm:text-xs font-medium px-2.5 py-0.5 rounded-full border border-white/20">
              {current.discountTagBn}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-['Hind_Siliguri']">
            {current.titleBn}
          </h2>

          <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 max-w-xl font-normal leading-relaxed">
            {current.subtitleBn}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleCampaignClick}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-teal-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{current.actionTextBn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-teal-200 text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>সীমিত সময়ের সুযোগ</span>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="পূর্ববর্তী ব্যানার"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          aria-label="পরবর্তী ব্যানার"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center backdrop-blur-xs transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {CAMPAIGNS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === currentIdx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40'
              }`}
              aria-label={`স্লাইড ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
