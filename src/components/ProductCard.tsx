import React from 'react';
import { Heart, ShoppingBag, Star, ShieldCheck, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
  isFlash?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isFlash = false }) => {
  const { 
    setSelectedProduct, 
    addToCart, 
    wishlist, 
    toggleWishlist,
    setActiveVendorStore,
    VENDORS
  } = useShop() as any;

  const isWishlisted = wishlist.includes(product.id);

  // Accurate discount calculation
  const discountPercent = product.salePrice
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0;

  const displayPrice = product.salePrice || product.regularPrice;

  return (
    <div 
      className="group bg-white rounded-2xl border border-slate-200 hover:border-teal-400 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Image & Badges */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.images[0]}
          alt={product.titleBn}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 left-2 bg-rose-600 text-white font-bold text-[11px] px-2 py-0.5 rounded-md shadow-xs">
            -{discountPercent}% ছাড়
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label="পছন্দের তালিকায় সংরক্ষণ"
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/80 hover:bg-white text-slate-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Stock warning if low stock */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-2 left-2 bg-amber-900/80 backdrop-blur-xs text-amber-200 text-[10px] font-medium px-2 py-0.5 rounded-sm">
            মাত্র {product.stock.toLocaleString('bn-BD')}টি বাকি
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        
        {/* Category & Vendor */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span className="truncate text-teal-800 font-medium">{product.categoryNameBn}</span>
          <span className="flex items-center gap-0.5 shrink-0 text-slate-600">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span className="truncate max-w-[90px]">{product.vendorName}</span>
          </span>
        </div>

        {/* Product Title */}
        <h3 
          onClick={() => setSelectedProduct(product)}
          className="text-xs sm:text-sm font-semibold text-slate-800 hover:text-teal-700 transition-colors line-clamp-2 cursor-pointer mb-2 leading-snug"
          title={product.titleBn}
        >
          {product.titleBn}
        </h3>

        {/* Ratings & Sold Count */}
        <div className="flex items-center gap-2 mb-2 text-xs">
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-700">{product.rating.toLocaleString('bn-BD')}</span>
          </div>
          <span className="text-slate-300">•</span>
          <span className="text-[11px] text-slate-400">
            ({product.reviewCount.toLocaleString('bn-BD')} রিভিউ)
          </span>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-teal-900">
                ৳{displayPrice.toLocaleString('bn-BD')}
              </span>
              {product.salePrice && (
                <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                  ৳{product.regularPrice.toLocaleString('bn-BD')}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              if (product.variants && product.variants.length > 0) {
                // If has variants, open modal to choose size/color
                setSelectedProduct(product);
              } else {
                addToCart(product);
              }
            }}
            aria-label="কার্টে যোগ করুন"
            className="p-2 sm:px-3 sm:py-1.5 bg-teal-50 hover:bg-teal-700 text-teal-800 hover:text-white rounded-xl border border-teal-200 hover:border-transparent transition-all flex items-center gap-1 text-xs font-semibold"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">যোগ করুন</span>
          </button>
        </div>

      </div>
    </div>
  );
};
