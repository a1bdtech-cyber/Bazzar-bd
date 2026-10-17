import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant, CartItem, UserProfile, UserRole, Order, VendorShop } from '../types';
import { PRODUCTS, VENDORS, LOCALIZED_STRINGS } from '../data/mockData';

interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount: number;
  minSpend: number;
}

const AVAILABLE_COUPONS: Record<string, Coupon> = {
  'BISHWAS50': { code: 'BISHWAS50', discountPercentage: 10, maxDiscount: 200, minSpend: 1000 },
  'EIDMUBARAK': { code: 'EIDMUBARAK', discountPercentage: 15, maxDiscount: 350, minSpend: 1500 },
  'BOISHAKHI': { code: 'BOISHAKHI', discountPercentage: 20, maxDiscount: 500, minSpend: 2000 }
};

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  
  deliveryZone: 'inside_dhaka' | 'outside_dhaka';
  setDeliveryZone: (zone: 'inside_dhaka' | 'outside_dhaka') => void;
  
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; messageBn: string };
  removeCoupon: () => void;
  
  totals: {
    subtotal: number;
    deliveryFee: number;
    discount: number;
    total: number;
    itemCount: number;
  };
  
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  
  activeCategory: string | null;
  setActiveCategory: (catId: string | null) => void;
  
  activeSegment: 'men' | 'women' | 'others' | null;
  setActiveSegment: (segment: 'men' | 'women' | 'others' | null) => void;
  activeSubcategory: string | null;
  setActiveSubcategory: (subId: string | null) => void;
  resetCategoryFilters: () => void;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'discount';
  setSortBy: (sort: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'discount') => void;
  
  currentUser: UserProfile;
  switchRole: (role: UserRole) => void;
  
  // Modals & Navigation
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isVendorModalOpen: boolean;
  setIsVendorModalOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  activeVendorStore: VendorShop | null;
  setActiveVendorStore: (vendor: VendorShop | null) => void;
  
  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'orderDate' | 'orderStatus'>) => Order;
  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;

  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-customer-01',
  name: 'তানভীর রহমান',
  email: 'tanvir.bd@gmail.com',
  phone: '01712-345678',
  role: 'customer',
  isVerified: true,
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  savedAddresses: [
    {
      id: 'addr-01',
      fullName: 'তানভীর রহমান',
      phone: '01712-345678',
      division: 'ঢাকা',
      district: 'ঢাকা',
      thana: 'ধানমন্ডি',
      areaDetails: 'বাড়ি # ৪২, রোড # ৮/এ, ধানমন্ডি আ/এ',
      isDefault: true,
      deliveryType: 'home'
    }
  ],
  createdAt: '2026-01-01'
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // initialize with 1 item for quick preview
    const sample = PRODUCTS[0];
    return [
      {
        id: 'cart-init-1',
        productId: sample.id,
        product: sample,
        selectedVariant: sample.variants ? sample.variants[0] : undefined,
        quantity: 1,
        vendorId: sample.vendorId
      }
    ];
  });

  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['prod-002']);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSegment, setActiveSegmentState] = useState<'men' | 'women' | 'others' | null>(null);
  const [activeSubcategory, setActiveSubcategoryState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price_low' | 'price_high' | 'rating' | 'discount'>('relevance');
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER);

  const setActiveSegment = (segment: 'men' | 'women' | 'others' | null) => {
    setActiveSegmentState(segment);
    setActiveSubcategoryState(null);
    setActiveCategory(null);
  };

  const setActiveSubcategory = (subId: string | null) => {
    setActiveSubcategoryState(subId);
  };

  const resetCategoryFilters = () => {
    setActiveSegmentState(null);
    setActiveSubcategoryState(null);
    setActiveCategory(null);
  };
  
  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isVendorModalOpen, setIsVendorModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [activeVendorStore, setActiveVendorStore] = useState<VendorShop | null>(null);
  
  // Orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-1001',
      orderNumber: 'BB-2026-7842',
      customerId: 'usr-customer-01',
      customerName: 'তানভীর রহমান',
      customerPhone: '01712-345678',
      shippingAddress: DEFAULT_USER.savedAddresses[0],
      items: [
        {
          id: 'ci-prev',
          productId: 'prod-002',
          product: PRODUCTS[1],
          quantity: 2,
          vendorId: 'v-002'
        }
      ],
      subtotal: 2360,
      deliveryCharge: 60,
      discountAmount: 0,
      totalPayable: 2420,
      paymentMethod: 'cash_on_delivery',
      paymentStatus: 'unpaid',
      orderStatus: 'shipped',
      orderDate: '২০২৬-১০-১৫ ১২:৩০',
      vendorIds: ['v-002'],
      trackingNotes: 'কুরিয়ার পার্টনার: রেডএক্স এক্সপ্রেস (ট্র্যাকিং আইডি: RDX-982143)'
    }
  ]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const switchRole = (role: UserRole) => {
    if (role === 'guest') {
      setCurrentUser({
        id: 'guest',
        name: 'অতিথি ক্রেতা (Guest)',
        email: '',
        phone: '',
        role: 'guest',
        isVerified: false,
        savedAddresses: [],
        createdAt: '2026-10-16'
      });
      showToast('অতিথি হিসেবে মোড পরিবর্তিত হয়েছে');
    } else if (role === 'approved_vendor') {
      setCurrentUser({
        id: 'usr-v-001',
        name: 'আব্দুর রহিম (সিল্ক ও তাঁত ঘর)',
        email: 'tangail.silk@bishwasbazar.com',
        phone: '01711-234567',
        role: 'approved_vendor',
        isVerified: true,
        vendorShopId: 'v-001',
        savedAddresses: [],
        createdAt: '2025-01-15'
      });
      showToast('বিক্রেতা মোড চালু হয়েছে (দোকান: সিল্ক ও তাঁত ঘর)');
    } else if (role === 'super_admin') {
      setCurrentUser({
        id: 'usr-admin-01',
        name: 'প্রধান সিস্টেম অ্যাডমিন',
        email: 'admin@bishwasbazar.com',
        phone: '01700-000000',
        role: 'super_admin',
        isVerified: true,
        savedAddresses: [],
        createdAt: '2025-01-01'
      });
      showToast('সুপার অ্যাডমিন মোড সক্রিয় হয়েছে');
    } else {
      setCurrentUser(DEFAULT_USER);
      showToast('রেজিস্টার্ড ক্রেতা মোড সক্রিয় হয়েছে');
    }
  };

  const addToCart = (product: Product, variant?: ProductVariant, quantity: number = 1) => {
    // Check available stock
    const availableStock = variant ? variant.stock : product.stock;
    if (availableStock <= 0) {
      showToast('দুঃখিত, পণ্যটি বর্তমানে স্টকে নেই!');
      return;
    }

    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.productId === product.id && 
        ((!variant && !item.selectedVariant) || (variant && item.selectedVariant && item.selectedVariant.id === variant.id))
      );

      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        if (currentQty + quantity > availableStock) {
          showToast(`সর্বোচ্চ ${availableStock} টি পণ্য স্টকে রয়েছে`);
          return prev;
        }
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        showToast(`কার্টে যুক্ত হয়েছে (${updated[existingIndex].quantity} টি)`);
        return updated;
      } else {
        showToast('পণ্যটি সাফল্যের সাথে কার্টে যোগ করা হয়েছে!');
        return [
          ...prev,
          {
            id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            productId: product.id,
            product,
            selectedVariant: variant,
            quantity,
            vendorId: product.vendorId
          }
        ];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('পণ্যটি কার্ট থেকে অপসারণ করা হয়েছে');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => {
      if (item.id === cartItemId) {
        const maxStock = item.selectedVariant ? item.selectedVariant.stock : item.product.stock;
        if (quantity > maxStock) {
          showToast(`সর্বোচ্চ ${maxStock} টি অর্ডার করা সম্ভব`);
          return item;
        }
        return { ...item, quantity };
      }
      return item;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const coupon = AVAILABLE_COUPONS[trimmed];
    
    if (!coupon) {
      return { success: false, messageBn: 'অবৈধ বা মেয়াদোত্তীর্ণ কুপন কোড! অনুগ্রহ করে যাচাই করুন।' };
    }

    const currentSubtotal = cart.reduce((sum, item) => {
      const price = item.selectedVariant?.salePrice || item.selectedVariant?.price || item.product.salePrice || item.product.regularPrice;
      return sum + (price * item.quantity);
    }, 0);

    if (currentSubtotal < coupon.minSpend) {
      return { 
        success: false, 
        messageBn: `এই কুপনটি ব্যবহার করতে ন্যূনতম ৳${coupon.minSpend} টাকার কেনাকাটা প্রয়োজন।` 
      };
    }

    setAppliedCoupon(coupon);
    showToast(`'${coupon.code}' কুপন সফলভাবে প্রয়োগ করা হয়েছে!`);
    return { success: true, messageBn: 'কুপন সফলভাবে যুক্ত হয়েছে!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('কুপন বাতিল করা হয়েছে');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        showToast('পছন্দের তালিকা থেকে সরানো হয়েছে');
        return prev.filter(id => id !== productId);
      } else {
        showToast('পছন্দের তালিকায় যুক্ত হয়েছে');
        return [...prev, productId];
      }
    });
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => {
    const price = item.selectedVariant?.salePrice || item.selectedVariant?.price || item.product.salePrice || item.product.regularPrice;
    return sum + (price * item.quantity);
  }, 0);

  const deliveryFee = cart.length === 0 ? 0 : (deliveryZone === 'inside_dhaka' ? LOCALIZED_STRINGS.deliveryCharges.insideDhaka : LOCALIZED_STRINGS.deliveryCharges.outsideDhaka);

  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minSpend) {
    const calculated = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
    discount = Math.min(calculated, appliedCoupon.maxDiscount);
  }

  const total = Math.max(0, subtotal + deliveryFee - discount);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'orderDate' | 'orderStatus'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber: `BB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      orderDate: new Date().toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      orderStatus: 'pending_confirmation'
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    setSelectedOrder(newOrder);
    showToast(`অর্ডার সম্পন্ন হয়েছে! অর্ডার নং: ${newOrder.orderNumber}`);
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        deliveryZone,
        setDeliveryZone,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        totals: {
          subtotal,
          deliveryFee,
          discount,
          total,
          itemCount
        },
        wishlist,
        toggleWishlist,
        selectedProduct,
        setSelectedProduct,
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
        setSortBy,
        currentUser,
        switchRole,
        isCartOpen,
        setIsCartOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isVendorModalOpen,
        setIsVendorModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        activeVendorStore,
        setActiveVendorStore,
        orders,
        placeOrder,
        selectedOrder,
        setSelectedOrder,
        toastMessage,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
