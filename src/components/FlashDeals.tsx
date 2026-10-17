import React, { useState, useEffect } from 'react';
import { Zap, Clock, ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const FlashDeals: React.FC = () => {
  const { products } = useShop();

  // Genuine countdown calculation (targeting next 12 hours)
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const flashProducts = products.filter(p => p.isFlashDeal);

  if (flashProducts.length === 0) return null;

  const toBnDigit = (num: number) => num.toLocaleString('bn-BD', { minimumIntegerDigits: 2 });

  return (
    <section className="mx-3 sm:mx-6 max-w-7xl lg:mx-auto mt-6 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-teal-500/10 p-4 sm:p-6 rounded-2xl border border-amber-300/60 shadow-xs">
      
      {/* Header with Title and Countdown Timer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-200/60">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs">
            <Zap className="w-5 h-5 fill-amber-300 text-amber-300 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              ফ্ল্যাশ সেল ও ধামাকা অফার
              <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full border border-orange-200">
                সীমিত স্টক
              </span>
            </h2>
            <p className="text-xs text-slate-500">বিশেষ মূল্যে কেনার নির্ধারিত সময় বাকি:</p>
          </div>
        </div>

        {/* Live Timer Boxes */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          <Clock className="w-4 h-4 text-orange-600 mr-1" />
          <div className="flex items-center gap-1">
            <div className="bg-slate-900 text-amber-400 font-mono font-bold text-sm px-2 py-1 rounded-md shadow-xs min-w-[32px] text-center">
              {toBnDigit(timeLeft.hours)}
            </div>
            <span className="font-bold text-slate-900">:</span>
            <div className="bg-slate-900 text-amber-400 font-mono font-bold text-sm px-2 py-1 rounded-md shadow-xs min-w-[32px] text-center">
              {toBnDigit(timeLeft.minutes)}
            </div>
            <span className="font-bold text-slate-900">:</span>
            <div className="bg-slate-900 text-amber-400 font-mono font-bold text-sm px-2 py-1 rounded-md shadow-xs min-w-[32px] text-center">
              {toBnDigit(timeLeft.seconds)}
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Flash Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mt-4">
        {flashProducts.slice(0, 4).map(product => (
          <ProductCard key={product.id} product={product} isFlash />
        ))}
      </div>
    </section>
  );
};
