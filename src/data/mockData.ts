import { Category, Product, VendorShop, Campaign, Review, CategorySegment } from '../types';

export const BANGLADESH_DIVISIONS = [
  {
    id: 'dhaka',
    nameBn: 'ঢাকা',
    districts: ['ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'মুন্সীগঞ্জ', 'টাঙ্গাইল', 'নরসিংদী', 'মানিকগঞ্জ', 'কিশোরগঞ্জ', 'ফরিদপুর']
  },
  {
    id: 'chattogram',
    nameBn: 'চট্টগ্রাম',
    districts: ['চট্টগ্রাম', 'কক্সবাজার', 'কুমিল্লা', 'ফেনী', 'ব্রাহ্মণবাড়িয়া', 'নোয়াখালী', 'চাঁদপুর', 'রাঙ্গামাটি']
  },
  {
    id: 'rajshahi',
    nameBn: 'রাজশাহী',
    districts: ['রাজশাহী', 'বগুড়া', 'পাবনা', 'সিরাজগঞ্জ', 'নওগাঁ', 'চাঁপাইনবাবগঞ্জ', 'নাটোর', 'জয়পুরহাট']
  },
  {
    id: 'khulna',
    nameBn: 'খুলনা',
    districts: ['খুলনা', 'যশোর', 'কুষ্টিয়া', 'সাতক্ষীরা', 'বাগেরহাট', 'ঝিনাইদহ', 'মাগুরা', 'চুয়াডাঙ্গা']
  },
  {
    id: 'sylhet',
    nameBn: 'সিলেট',
    districts: ['সিলেট', 'মৌলভীবাজার', 'হবিগঞ্জ', 'সুনামগঞ্জ']
  },
  {
    id: 'barishal',
    nameBn: 'বরিশাল',
    districts: ['বরিশাল', 'পটুয়াখালী', 'ভোলা', 'পিরোজপুর', 'বরগুনা', 'ঝালকাঠি']
  },
  {
    id: 'rangpur',
    nameBn: 'রংপুর',
    districts: ['রংপুর', 'দিনাজপুর', 'কুড়িগ্রাম', 'গাইবান্ধা', 'নীলফামারী', 'পঞ্চগড়', 'ঠাকুরগাঁও', 'লালমনিরহাট']
  },
  {
    id: 'mymensingh',
    nameBn: 'ময়মনসিংহ',
    districts: ['ময়মনসিংহ', 'জামালপুর', 'নেত্রকোণা', 'শেরপুর']
  }
];

export const CATEGORY_SEGMENTS: CategorySegment[] = [
  {
    id: 'men',
    nameBn: 'ম্যান',
    nameEn: 'Men',
    slug: 'men',
    descriptionBn: 'পুরুষদের আধুনিক পোশাক, জুতো, সানগ্লাস, ঘড়ি ও স্টাইলিশ বেল্ট কালেকশন',
    iconName: 'User',
    subcategories: [
      { id: 'sub-men-clothing', nameBn: 'পুরুষের পোশাক', nameEn: "Men's Clothing", slug: 'mens-clothing', iconName: 'Shirt', segment: 'men' },
      { id: 'sub-men-shoes', nameBn: 'জুতা', nameEn: 'Shoes', slug: 'mens-shoes', iconName: 'Footprints', segment: 'men' },
      { id: 'sub-men-sunglasses', nameBn: 'সানগ্লাস', nameEn: 'Sunglasses', slug: 'mens-sunglasses', iconName: 'Glasses', segment: 'men' },
      { id: 'sub-men-watches', nameBn: 'ঘড়ি', nameEn: 'Watches', slug: 'mens-watches', iconName: 'Watch', segment: 'men' },
      { id: 'sub-men-belts', nameBn: 'বেল্ট', nameEn: 'Belts', slug: 'mens-belts', iconName: 'Pocket', segment: 'men' }
    ]
  },
  {
    id: 'women',
    nameBn: 'ওম্যান',
    nameEn: 'Women',
    slug: 'women',
    descriptionBn: 'নারীদের ঐতিহ্যবাহী ও আধুনিক পোশাক, শাড়ি, হিল, সানগ্লাস, ঘড়ি ও অলংকার',
    iconName: 'Sparkles',
    subcategories: [
      { id: 'sub-women-clothing', nameBn: 'মহিলাদের পোশাক ও শাড়ি', nameEn: 'Clothing & Sarees', slug: 'womens-clothing', iconName: 'Sparkles', segment: 'women' },
      { id: 'sub-women-shoes', nameBn: 'জুতা ও হিল', nameEn: 'Shoes & Heels', slug: 'womens-shoes', iconName: 'Footprints', segment: 'women' },
      { id: 'sub-women-sunglasses', nameBn: 'সানগ্লাস', nameEn: 'Sunglasses', slug: 'womens-sunglasses', iconName: 'Glasses', segment: 'women' },
      { id: 'sub-women-watches', nameBn: 'ঘড়ি', nameEn: 'Watches', slug: 'womens-watches', iconName: 'Watch', segment: 'women' },
      { id: 'sub-women-bags', nameBn: 'ব্যাগ ও পার্স', nameEn: 'Bags & Purses', slug: 'womens-bags', iconName: 'ShoppingBag', segment: 'women' },
      { id: 'sub-women-jewelry', nameBn: 'অলংকার ও গহনা', nameEn: 'Jewelry & Ornaments', slug: 'womens-jewelry', iconName: 'Gem', segment: 'women' }
    ]
  },
  {
    id: 'others',
    nameBn: 'অন্যান্য',
    nameEn: 'Others',
    slug: 'others',
    descriptionBn: 'ইলেকট্রনিক্স ও গ্যাজেট, খাঁটি খাদ্য ও অর্গানিক, গৃহস্থালি ও দেশীয় ঐতিহ্য',
    iconName: 'LayoutGrid',
    subcategories: [
      { id: 'sub-electronics', nameBn: 'ইলেকট্রনিক্স ও গ্যাজেট', nameEn: 'Electronics & Gadgets', slug: 'electronics', iconName: 'Smartphone', segment: 'others' },
      { id: 'sub-organic', nameBn: 'খাঁটি খাদ্য ও অর্গানিক', nameEn: 'Pure Foods & Groceries', slug: 'organic-food', iconName: 'Apple', segment: 'others' },
      { id: 'sub-home', nameBn: 'গৃহস্থালি ও রান্নাঘর', nameEn: 'Home & Kitchen', slug: 'home-kitchen', iconName: 'Home', segment: 'others' },
      { id: 'sub-handicraft', nameBn: 'হস্তশিল্প ও দেশীয় ঐতিহ্য', nameEn: 'Handicrafts & Heritage', slug: 'handicrafts', iconName: 'Sparkles', segment: 'others' },
      { id: 'sub-beauty', nameBn: 'স্বাস্থ্য ও রূপচর্চা', nameEn: 'Health & Beauty', slug: 'health-beauty', iconName: 'HeartHandshake', segment: 'others' }
    ]
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-fashion',
    nameBn: 'ফ্যাশন ও পোশাক',
    nameEn: 'Fashion & Clothing',
    slug: 'fashion',
    iconName: 'Shirt',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80',
    subcategories: [
      { id: 'sub-saree', nameBn: 'তাঁতের ও সুতি শাড়ি', nameEn: 'Traditional Sarees', slug: 'sarees' },
      { id: 'sub-panjabi', nameBn: 'পাঞ্জাবি ও ফতুয়া', nameEn: 'Panjabi & Kurtas', slug: 'panjabi' },
      { id: 'sub-salwar', nameBn: 'থ্রি-পিস ও সালোয়ার', nameEn: 'Salwar Kameez', slug: 'salwar' },
      { id: 'sub-men', nameBn: 'টি-শার্ট ও শার্ট', nameEn: 'T-Shirts & Shirts', slug: 'men-shirts' }
    ]
  },
  {
    id: 'cat-organic',
    nameBn: 'খাঁটি খাদ্য ও অর্গানিক',
    nameEn: 'Pure Foods & Groceries',
    slug: 'organic-food',
    iconName: 'Apple',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=300&q=80',
    subcategories: [
      { id: 'sub-honey', nameBn: 'সুন্দরবনের প্রাকৃতিক মধু', nameEn: 'Natural Honey', slug: 'honey' },
      { id: 'sub-oil', nameBn: 'ঘানির খাঁটি সরিষার তেল', nameEn: 'Mustard Oil', slug: 'mustard-oil' },
      { id: 'sub-rice', nameBn: 'সুগন্ধি পোলাও চাল ও চিনিগুঁড়া', nameEn: 'Aromatic Rice', slug: 'aromatic-rice' },
      { id: 'sub-spices', nameBn: 'গ্রাম্য স্পেশাল মসলা', nameEn: 'Pure Spices', slug: 'pure-spices' }
    ]
  },
  {
    id: 'cat-electronics',
    nameBn: 'ইলেকট্রনিক্স ও গ্যাজেট',
    nameEn: 'Electronics & Gadgets',
    slug: 'electronics',
    iconName: 'Smartphone',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80',
    subcategories: [
      { id: 'sub-smartphones', nameBn: 'স্মার্টফোন ও ট্যাব', nameEn: 'Smartphones & Tablets', slug: 'smartphones' },
      { id: 'sub-earbuds', nameBn: 'টিডব্লিউএস ও হেডফোন', nameEn: 'TWS & Headphones', slug: 'earbuds' },
      { id: 'sub-smartwatch', nameBn: 'স্মার্টওয়াচ ও ব্যান্ড', nameEn: 'Smartwatches', slug: 'smartwatches' },
      { id: 'sub-powerbank', nameBn: 'পাওয়ার ব্যাংক ও চার্জার', nameEn: 'Powerbanks', slug: 'powerbanks' }
    ]
  },
  {
    id: 'cat-handicraft',
    nameBn: 'হস্তশিল্প ও দেশীয় ঐতিহ্য',
    nameEn: 'Handicrafts & Heritage',
    slug: 'handicrafts',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=300&q=80',
    subcategories: [
      { id: 'sub-jute', nameBn: 'পাটের ব্যাগ ও হোম ডেকর', nameEn: 'Jute Bags & Decor', slug: 'jute-crafts' },
      { id: 'sub-nakshi', nameBn: 'নকশী কাঁথা', nameEn: 'Nakshi Kantha', slug: 'nakshi-kantha' },
      { id: 'sub-clay', nameBn: 'মাটির তৈজসপত্র', nameEn: 'Clay Cookware', slug: 'clay-ware' }
    ]
  },
  {
    id: 'cat-home',
    nameBn: 'গৃহস্থালি ও রান্নাঘর',
    nameEn: 'Home & Kitchen',
    slug: 'home-kitchen',
    iconName: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80',
    subcategories: [
      { id: 'sub-kitchen', nameBn: 'রান্নার তৈজসপত্র', nameEn: 'Cookware', slug: 'cookware' },
      { id: 'sub-bedding', nameBn: 'বেডশিট ও কুশন কভার', nameEn: 'Bedding & Cushions', slug: 'bedding' }
    ]
  },
  {
    id: 'cat-beauty',
    nameBn: 'স্বাস্থ্য ও রূপচর্চা',
    nameEn: 'Health & Beauty',
    slug: 'health-beauty',
    iconName: 'HeartHandshake',
    imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=300&q=80',
    subcategories: [
      { id: 'sub-herbal', nameBn: 'ভেষজ তেল ও শ্যাম্পু', nameEn: 'Herbal Haircare', slug: 'herbal-oil' },
      { id: 'sub-skincare', nameBn: 'স্কিন কেয়ার ও ময়েশ্চারাইজার', nameEn: 'Skincare', slug: 'skincare' }
    ]
  }
];

export const VENDORS: VendorShop[] = [
  {
    id: 'v-001',
    ownerId: 'usr-v-001',
    shopNameBn: 'সিল্ক ও তাঁত ঘর',
    shopNameEn: 'Silk & Handloom House',
    slug: 'silk-handloom-house',
    logoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 342,
    productCount: 48,
    division: 'ঢাকা',
    district: 'টাঙ্গাইল',
    isVerified: true,
    status: 'approved',
    phone: '01711-234567',
    email: 'tangail.silk@bishwasbazar.com',
    tradeLicenseNo: 'TRAD/DNCC/092182/2024',
    commissionRate: 7,
    returnPolicyBn: 'পণ্য পাওয়ার ৭ দিনের মধ্যে অক্ষত অবস্থায় রিটার্ন গ্রহণ করা হয়।',
    joinedDate: '2025-01-15'
  },
  {
    id: 'v-002',
    ownerId: 'usr-v-002',
    shopNameBn: 'খাঁটি বাংলা অর্গানিক',
    shopNameEn: 'Khati Bangla Organics',
    slug: 'khati-bangla-organics',
    logoUrl: 'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=150&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 512,
    productCount: 26,
    division: 'খুলনা',
    district: 'সাতক্ষীরা',
    isVerified: true,
    status: 'approved',
    phone: '01812-987654',
    email: 'khatibangla@bishwasbazar.com',
    tradeLicenseNo: 'TRAD/SAT/004319/2024',
    commissionRate: 5,
    returnPolicyBn: 'খাদ্যদ্রব্য খোলার আগে কোনো ত্রুটি থাকলে তাৎক্ষণিক রিফান্ড বা এক্সচেঞ্জ।',
    joinedDate: '2025-02-01'
  },
  {
    id: 'v-003',
    ownerId: 'usr-v-003',
    shopNameBn: 'টেক স্মার্ট বাংলাদেশ',
    shopNameEn: 'Tech Smart BD',
    slug: 'tech-smart-bd',
    logoUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1126f25?auto=format&fit=crop&w=150&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 289,
    productCount: 65,
    division: 'ঢাকা',
    district: 'ঢাকা',
    isVerified: true,
    status: 'approved',
    phone: '01913-456789',
    email: 'techsmart@bishwasbazar.com',
    tradeLicenseNo: 'TRAD/DSCC/011542/2023',
    commissionRate: 6,
    returnPolicyBn: 'অফিসিয়াল ওয়ারেন্টি এবং ৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি।',
    joinedDate: '2025-02-20'
  },
  {
    id: 'v-004',
    ownerId: 'usr-v-004',
    shopNameBn: 'বাংলার পাট ও কারুশিল্প',
    shopNameEn: 'Banglar Pat Crafts',
    slug: 'banglar-pat-crafts',
    logoUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=150&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 178,
    productCount: 32,
    division: 'রাজশাহী',
    district: 'বগুড়া',
    isVerified: true,
    status: 'approved',
    phone: '01614-789012',
    email: 'banglarpat@bishwasbazar.com',
    tradeLicenseNo: 'TRAD/BOG/098712/2024',
    commissionRate: 5,
    returnPolicyBn: '১০ দিনের মধ্যে সহজ রিটার্ন সুবিধা।',
    joinedDate: '2025-03-10'
  },
  {
    id: 'v-005',
    ownerId: 'usr-v-005',
    shopNameBn: 'এলিগেন্ট মেনজ ক্লাব',
    shopNameEn: 'Elegant Men’s Club',
    slug: 'elegant-mens-club',
    logoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 220,
    productCount: 52,
    division: 'ঢাকা',
    district: 'ঢাকা',
    isVerified: true,
    status: 'approved',
    phone: '01718-554433',
    email: 'contact@elegantmens.com',
    tradeLicenseNo: 'TRAD/DSCC/098124/2024',
    commissionRate: 6,
    returnPolicyBn: '৭ দিনের সহজ এক্সচেঞ্জ ও ১০০% প্রিমিয়াম কোয়ালিটি নিশ্চয়তা।',
    joinedDate: '2025-01-20'
  }
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    titleBn: 'বৈশাখী মহা উৎসব ২০২৬',
    subtitleBn: 'দেশি তাঁতের শাড়ি, পাঞ্জাবি ও হস্তশিল্পে সর্বোচ্চ ৫০% পর্যন্ত বিশেষ ছাড়!',
    badgeBn: 'মেগা ক্যাম্পেইন',
    bannerImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    bgColor: 'from-teal-800 to-emerald-950',
    actionTextBn: 'অফার দেখুন',
    categoryId: 'cat-fashion',
    discountTagBn: '৫০% পর্যন্ত ছাড়',
    validUntil: '2026-04-30T23:59:59'
  },
  {
    id: 'camp-2',
    titleBn: 'খাঁটি গ্রামের স্বাদ ও স্বাস্থ্য',
    subtitleBn: 'সুন্দরবনের খাঁটি মধু ও কাঠের ঘানির সরিষার তেলে আকর্ষণীয় কম্বো প্যাক',
    badgeBn: 'অর্গানিক অফার',
    bannerImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=1200&q=80',
    bgColor: 'from-amber-700 to-orange-950',
    actionTextBn: 'কম্বো কিনুন',
    categoryId: 'cat-organic',
    discountTagBn: 'ফ্রি ডেলিভারি',
    validUntil: '2026-05-15T23:59:59'
  },
  {
    id: 'camp-3',
    titleBn: 'ম্যানজ স্টাইল ফেস্ট ২০২৬',
    subtitleBn: 'পুরুষের জেনুইন লেদার জুতো, প্রিমিয়াম সানগ্লাস, ঘড়ি ও বেল্টে আকর্ষণীয় মেগা অফার',
    badgeBn: 'মেনজ স্পেশাল',
    bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    bgColor: 'from-slate-900 to-teal-950',
    actionTextBn: 'কালেকশন দেখুন',
    discountTagBn: 'স্পেশাল ডিসকাউন্ট',
    validUntil: '2026-05-20T23:59:59'
  }
];

export const PRODUCTS: Product[] = [
  // --- MEN'S SEGMENT ---
  // Men's Clothing
  {
    id: 'prod-006',
    vendorId: 'v-001',
    vendorName: 'সিল্ক ও তাঁত ঘর',
    vendorVerified: true,
    titleBn: 'প্রিমিয়াম সুতি সেমি-লং পাঞ্জাবি ও পায়জামা সেট',
    titleEn: 'Premium Cotton Semi-Long Panjabi & Pajama Set',
    slug: 'premium-cotton-semi-long-panjabi-set',
    segment: 'men',
    categoryId: 'cat-fashion',
    categoryNameBn: 'পুরুষের পোশাক',
    subcategoryId: 'sub-men-clothing',
    subcategoryNameBn: 'পুরুষের পোশাক',
    brand: 'হৃদয়ে বাংলাদেশ',
    descriptionBn: '১০০% ফাইন সুতি কাপড়ে তৈরি আরামদায়ক সেমি-লং পাঞ্জাবি। কলার ও প্লেকেটে নিপুণ সূচিকর্ম এবং মেটালিক বাটন ফিনিশিং। সাথে রয়েছে আরামদায়ক সুতি পায়জামা। যেকোনো ধর্মীয় ও সামাজিক অনুষ্ঠানের জন্য সেরা পছন্দ।',
    specifications: {
      'কাপড়': '১০০% পিওর কটন ফেব্রিক',
      'কাটিং': 'সেমি-ফিট স্টাইলিশ প্যাটার্ন',
      'বাটন': 'প্রিমিয়াম মেটালিক বোতাম',
      'সেট': 'পাঞ্জাবি ও পায়জামা যৌথ সেট'
    },
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2450,
    salePrice: 1850,
    stock: 20,
    rating: 4.7,
    reviewCount: 48,
    soldCount: 180,
    isFeatured: true,
    variants: [
      { id: 'v-p-40', name: 'সাদা (সাইজ ৪০)', price: 2450, salePrice: 1850, stock: 7, sku: 'PB-WHT-40' },
      { id: 'v-p-42', name: 'সাদা (সাইজ ৪২)', price: 2450, salePrice: 1850, stock: 8, sku: 'PB-WHT-42' },
      { id: 'v-p-44', name: 'নেভি ব্লু (সাইজ ৪৪)', price: 2450, salePrice: 1850, stock: 5, sku: 'PB-NVY-44' }
    ],
    warranty: 'সাইজ না মিললে ৩ দিনের ফ্রি এক্সচেঞ্জ',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-02-25T11:00:00',
    status: 'published'
  },
  {
    id: 'prod-men-shirt',
    vendorId: 'v-005',
    vendorName: 'এলিগেন্ট মেনজ ক্লাব',
    vendorVerified: true,
    titleBn: '১০০% পিওর ইজিপশিয়ান কটন ফুল-হাতা ফরমাল শার্ট',
    titleEn: '100% Egyptian Cotton Full Sleeve Formal Shirt',
    slug: 'pure-egyptian-cotton-formal-shirt',
    segment: 'men',
    categoryId: 'cat-fashion',
    categoryNameBn: 'পুরুষের পোশাক',
    subcategoryId: 'sub-men-clothing',
    subcategoryNameBn: 'পুরুষের পোশাক',
    brand: 'এলিগেন্ট মেন',
    descriptionBn: 'উচ্চমানের ইজিপশিয়ান কটনে তৈরি আরামদায়ক ও রিংকেল-ফ্রি অফিসিয়াল ফরমাল শার্ট। ব্রেথেবল ফেব্রিক, সুনির্দিষ্ট স্টিচিং এবং ক্লাসিক কলার ফিনিশিং। দৈনন্দিন অফিস ও কর্পোরেট মিটিংয়ের জন্য পারফেক্ট।',
    specifications: {
      'উপাদান': '১০০% পিওর কটন (ব্রেথেবল)',
      'ফিটিং': 'স্লিম ফিট / রেগুলার কমফোর্ট',
      'হাতা': 'ফুল স্লিভ (কন্টিনিউয়াস কাফ)',
      'কলার': 'ক্লাসিক স্প্রেড কলার'
    },
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 1950,
    salePrice: 1450,
    stock: 25,
    rating: 4.8,
    reviewCount: 56,
    soldCount: 230,
    isFeatured: true,
    variants: [
      { id: 'v-s-white-m', name: 'হোয়াইট (Size M)', price: 1950, salePrice: 1450, stock: 10, sku: 'SH-WHT-M' },
      { id: 'v-s-blue-l', name: 'স্কাই ব্লু (Size L)', price: 1950, salePrice: 1450, stock: 8, sku: 'SH-BLU-L' },
      { id: 'v-s-navy-xl', name: 'নেভি ব্লু (Size XL)', price: 1950, salePrice: 1450, stock: 7, sku: 'SH-NVY-XL' }
    ],
    warranty: '৭ দিনের সহজ এক্সচেঞ্জ সুবিধা',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-01T10:00:00',
    status: 'published'
  },

  // Men's Shoes
  {
    id: 'prod-men-shoe-01',
    vendorId: 'v-005',
    vendorName: 'এলিগেন্ট মেনজ ক্লাব',
    vendorVerified: true,
    titleBn: 'হ্যান্ডক্রাফটেড জেনুইন লেদার অক্সফোর্ড ফরমাল শু',
    titleEn: 'Handcrafted Genuine Leather Oxford Dress Shoes',
    slug: 'handcrafted-genuine-leather-oxford-shoes',
    segment: 'men',
    categoryId: 'cat-fashion',
    categoryNameBn: 'জুতা',
    subcategoryId: 'sub-men-shoes',
    subcategoryNameBn: 'জুতা',
    brand: 'অ্যাপেক্স ক্রাফট',
    descriptionBn: '১০০% খাঁটি লেদারে দক্ষ কারিগরদের হাতে তৈরি প্রিমিয়াম অক্সফোর্ড শু। দীর্ঘস্থায়ী রাবার সোল এবং কুশনড ইনসোল সারাদিন আরামদায়ক হাঁটার নিশ্চয়তা প্রদান করে। বিয়ে, অফিস ও ফরমাল ইভেন্টের আভিজাত্যের প্রতীক।',
    specifications: {
      'চামড়া': '১০০% টপ-গ্রেইন প্রিমিয়াম কাউ লেদার',
      'সোল': 'অ্যান্টি-স্লিপ গ্রিপ রাবার সোল',
      'ইনসোল': 'মেমোরি ফোম কমফোর্ট প্যাডিং',
      'রঙ': 'ডিপ চকলেট ব্রাউন / ব্ল্যাক'
    },
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 3850,
    salePrice: 2890,
    stock: 18,
    rating: 4.9,
    reviewCount: 74,
    soldCount: 310,
    isFeatured: true,
    isFlashDeal: true,
    variants: [
      { id: 'v-sh-40-brn', name: 'ব্রাউন (সাইজ ৪০)', price: 3850, salePrice: 2890, stock: 6, sku: 'SH-OX-40-B' },
      { id: 'v-sh-41-brn', name: 'ব্রাউন (সাইজ ৪১)', price: 3850, salePrice: 2890, stock: 7, sku: 'SH-OX-41-B' },
      { id: 'v-sh-42-blk', name: 'ব্ল্যাক (সাইজ ৪২)', price: 3850, salePrice: 2890, stock: 5, sku: 'SH-OX-42-K' }
    ],
    warranty: '৬ মাসের সোল ও পেস্টিং ওয়ারেন্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-05T12:00:00',
    status: 'published'
  },
  {
    id: 'prod-men-shoe-02',
    vendorId: 'v-005',
    vendorName: 'এলিগেন্ট মেনজ ক্লাব',
    vendorVerified: true,
    titleBn: 'লাইটওয়েট ব্রিদেবল ক্যাজুয়াল ওয়াকিং স্নিকার্স',
    titleEn: 'Lightweight Breathable Casual Walking Sneakers',
    slug: 'lightweight-breathable-casual-sneakers',
    segment: 'men',
    categoryId: 'cat-fashion',
    categoryNameBn: 'জুতা',
    subcategoryId: 'sub-men-shoes',
    subcategoryNameBn: 'জুতা',
    brand: 'স্পোর্টসফিট',
    descriptionBn: 'অত্যন্ত হালকা ওজনের মেটালিশ ব্রিদেবল ফ্যাব্রিক স্নিকার্স। জিম, দৌড়ানো বা ক্যাজুয়াল আউটিংয়ের জন্য অত্যন্ত আরামদায়ক। শক-অ্যাবজরবিং ইভা সোল দীর্ঘক্ষণ ব্যবহারে পায়ের ক্লান্তি কমায়।',
    specifications: {
      'ওজন': 'মাত্র ৪০০ গ্রাম (জোড়া)',
      'উপাদান': 'এয়ার মেশ ও ব্রিদেবল ক্যানভাস',
      'সোল': 'আল্ট্রা-লাইট EVA কুশনিং',
      'উপযুক্ততা': 'ওয়াকিং, রানিং, ক্যাজুয়াল ওয়্যার'
    },
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2150,
    salePrice: 1550,
    stock: 22,
    rating: 4.7,
    reviewCount: 63,
    soldCount: 280,
    isFeatured: false,
    warranty: '৩ মাসের পেস্টিং গ্যারান্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-08T09:00:00',
    status: 'published'
  },

  // Men's Sunglasses
  {
    id: 'prod-men-sunglasses-01',
    vendorId: 'v-003',
    vendorName: 'টেক স্মার্ট বাংলাদেশ',
    vendorVerified: true,
    titleBn: 'ইউভি৪০০ পোলারাইজড এভিয়েটর সানগ্লাস ফর মেন',
    titleEn: 'UV400 Polarized Aviator Sunglasses for Men',
    slug: 'uv400-polarized-aviator-sunglasses-men',
    segment: 'men',
    categoryId: 'cat-fashion',
    categoryNameBn: 'সানগ্লাস',
    subcategoryId: 'sub-men-sunglasses',
    subcategoryNameBn: 'সানগ্লাস',
    brand: 'ভিজন প্রো',
    descriptionBn: 'ক্লাসিক এভিয়েটর মেটাল ফ্রেম সানগ্লাস যাতে রয়েছে ১০০% ইউভি৪০০ এবং এইচডি পোলারাইজড লেন্স। তীব্র রোদে চোখের সুরক্ষা, ড্রাইভিংয়ে গ্লেয়ার প্রতিরোধ এবং ফ্যাশনেবল লুকের সেরা সমন্বয়। প্রিমিয়াম লেদার কেস সহ সরবরাহ করা হয়।',
    specifications: {
      'ইউভি প্রোটেকশন': 'UV400 ১০০% ক্ষতিকর রশ্মি প্রতিরোধক',
      'লেন্স টাইপ': 'এইচডি পোলারাইজড অ্যান্টি-গ্লেয়ার',
      'ফ্রেম উপাদান': 'হালকা ওজনের টেকসই টাইটানিয়াম অ্যালয়',
      'সাথে পাবেন': 'হার্ড লেদার কেস ও মাইক্রোফাইবার ক্লথ'
    },
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 1650,
    salePrice: 1190,
    stock: 28,
    rating: 4.8,
    reviewCount: 88,
    soldCount: 390,
    isFeatured: true,
    isFlashDeal: true,
    warranty: '১ বছরের ফ্রেম ও কালার গ্যারান্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-10T14:00:00',
    status: 'published'
  },

  // Men's Watches
  {
    id: 'prod-men-watch-01',
    vendorId: 'v-003',
    vendorName: 'টেক স্মার্ট বাংলাদেশ',
    vendorVerified: true,
    titleBn: 'ক্লাসিক জেনুইন লেদার কোয়ার্টজ ক্রোনোগ্রাফ ওয়াচ',
    titleEn: 'Classic Genuine Leather Quartz Chronograph Men Watch',
    slug: 'classic-leather-quartz-chronograph-men-watch',
    segment: 'men',
    categoryId: 'cat-electronics',
    categoryNameBn: 'ঘড়ি',
    subcategoryId: 'sub-men-watches',
    subcategoryNameBn: 'ঘড়ি',
    brand: 'নাভিফোর্স ক্লাসিক',
    descriptionBn: 'স্টেইনলেস স্টিল গোল্ডেন বডি, নীল সানরে ডায়াল এবং ডার্ক ব্রাউন জেনুইন লেদার স্ট্র্যাপ। ৩টি সক্রিয় ক্রোনোগ্রাফ সাব-ডায়াল এবং অটো ডেট ফাংশন। ৩০ মিটার ওয়াটার রেজিস্ট্যান্ট ওয়াচ।',
    specifications: {
      'মুভমেন্ট': 'জাপানিজ প্রেসিসন কোয়ার্টজ মুভমেন্ট',
      'স্ট্র্যাপ': 'জেনুইন সফট কাউহাইড লেদার',
      'ওয়াটার রেজিস্ট্যান্স': '3ATM (30 মিটার ওয়াটারপ্রুফ)',
      'গ্লাস': 'স্ক্র্যাচ-রেজিস্ট্যান্ট হার্ডলেক্স ক্রিস্টাল'
    },
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 3450,
    salePrice: 2450,
    stock: 16,
    rating: 4.8,
    reviewCount: 52,
    soldCount: 215,
    isFeatured: true,
    warranty: '১ বছরের অফিশিয়াল মুভমেন্ট ওয়ারেন্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-11T16:00:00',
    status: 'published'
  },
  {
    id: 'prod-003',
    vendorId: 'v-003',
    vendorName: 'টেক স্মার্ট বাংলাদেশ',
    vendorVerified: true,
    titleBn: 'স্মার্ট ব্লুটুথ কলিং ওয়াচ প্রো - ১.৯৬ ইঞ্চি এইচডি ডিসপ্লে',
    titleEn: 'Smart Bluetooth Calling Watch Pro 1.96-inch HD',
    slug: 'smart-bluetooth-calling-watch-pro',
    segment: 'men',
    categoryId: 'cat-electronics',
    categoryNameBn: 'ঘড়ি',
    subcategoryId: 'sub-men-watches',
    subcategoryNameBn: 'ঘড়ি',
    brand: 'টেকস্মার্ট প্রো',
    descriptionBn: 'মেটালিক বডি, ১.৯৬ ইঞ্চি আল্ট্রা-ব্রাইট এইচডি অ্যামোলেড ডিসপ্লে এবং ব্লুটুথ হ্যান্ডস-ফ্রি কলিং সাপোর্ট। হার্ট রেট, এসপিও২ এবং ১২০+ স্পোর্টস মোড ট্র্যাকিং। জলরোধী আইপি৬৮ রেটিং এবং একবার ফুল চার্জে ৭ দিনের ব্যাটারি ব্যাকআপ।',
    specifications: {
      'ডিসপ্লে': '১.৯৬ ইঞ্চি AMOLED (410x502 পিক্সেল)',
      'ব্যাটারি লাইফ': '৭ থেকে ১০ দিন ব্যাকআপ',
      'ওয়াটারপ্রুফ রেটিং': 'IP68 ওয়াটার ও ডাস্ট রেজিস্ট্যান্ট',
      'কানেক্টিভিটি': 'Bluetooth 5.3',
      'সেন্সর': 'SpO2, 24/7 Heart Rate, Sleep Monitor'
    },
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 3890,
    salePrice: 2890,
    stock: 18,
    rating: 4.7,
    reviewCount: 67,
    soldCount: 198,
    isFeatured: true,
    variants: [
      { id: 'v-w-black', name: 'ম্যাট ব্ল্যাক মেটাল স্ট্র্যাপ', price: 3890, salePrice: 2890, stock: 10, sku: 'TS-WATCH-BLK' },
      { id: 'v-w-silver', name: 'সিলভার ও অরেঞ্জ স্পোর্টস স্ট্র্যাপ', price: 3890, salePrice: 2890, stock: 8, sku: 'TS-WATCH-SLV' }
    ],
    warranty: '১ বছরের অফিশিয়াল রিপ্লেসমেন্ট ওয়ারেন্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-02-01T09:00:00',
    status: 'published'
  },

  // Men's Belts
  {
    id: 'prod-men-belt-01',
    vendorId: 'v-005',
    vendorName: 'এলিগেন্ট মেনজ ক্লাব',
    vendorVerified: true,
    titleBn: '১০০% পিওর কাউহাইড লেদার রিভার্সিবল ফরমাল বেল্ট',
    titleEn: '100% Pure Cowhide Leather Reversible Formal Belt',
    slug: 'pure-cowhide-leather-reversible-belt',
    segment: 'men',
    categoryId: 'cat-fashion',
    categoryNameBn: 'বেল্ট',
    subcategoryId: 'sub-men-belts',
    subcategoryNameBn: 'বেল্ট',
    brand: 'লেদার ক্রাফট বিডি',
    descriptionBn: 'এক বেল্টেই দুটি রঙ! টুইস্ট মেকানিজমের মাধ্যমে কালো ও চকলেট ব্রাউন দুই রঙেই ব্যবহার করা যায়। জেনুইন প্রিমিয়াম কাউ লেদারে তৈরি যা ফাটবে না বা নষ্ট হবে না। অ্যান্টি-রাস্ট অ্যালয় বাকেল।',
    specifications: {
      'চামড়া': '১০০% ফুল-গ্রেইন কাউহাইড চামড়া',
      'বাকল': 'অ্যান্টি-রাস্ট রোটেটিং ক্রোম বাকল',
      'প্রস্থ': '১.৪ ইঞ্চি (স্ট্যান্ডার্ড ফরমাল মাপ)',
      'ফিচার': 'টু-ইন-ওয়ান রিভার্সিবল (ব্ল্যাক ও ব্রাউন)'
    },
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 1450,
    salePrice: 990,
    stock: 35,
    rating: 4.8,
    reviewCount: 95,
    soldCount: 410,
    isFeatured: true,
    variants: [
      { id: 'v-b-34', name: 'কোমর ৩৪-৩৬ ইঞ্চি', price: 1450, salePrice: 990, stock: 15, sku: 'BLT-34' },
      { id: 'v-b-38', name: 'কোমর ৩৮-৪০ ইঞ্চি', price: 1450, salePrice: 990, stock: 12, sku: 'BLT-38' },
      { id: 'v-b-42', name: 'কোমর ৪২-৪৪ ইঞ্চি', price: 1450, salePrice: 990, stock: 8, sku: 'BLT-42' }
    ],
    warranty: '২ বছরের চামড়া ফাটবে না নিশ্চয়তা',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-12T11:00:00',
    status: 'published'
  },
  {
    id: 'prod-men-belt-02',
    vendorId: 'v-005',
    vendorName: 'এলিগেন্ট মেনজ ক্লাব',
    vendorVerified: true,
    titleBn: 'প্রিমিয়াম জেনুইন লেদার ওয়ালেট ও অটো-লক বেল্ট গিফট কম্বো',
    titleEn: 'Premium Genuine Leather Wallet & Auto-Lock Belt Gift Combo',
    slug: 'genuine-leather-wallet-and-belt-combo',
    segment: 'men',
    categoryId: 'cat-fashion',
    categoryNameBn: 'বেল্ট',
    subcategoryId: 'sub-men-belts',
    subcategoryNameBn: 'বেল্ট',
    brand: 'ট্যানারি মাস্টার',
    descriptionBn: 'একটি বিলাসবহুল উপহার বক্স সহ জেনুইন লেদার বাইফোল্ড ওয়ালেট এবং স্বয়ংক্রিয় র‍্যাচেট অটো-লক বেল্টের যৌথ প্যাকেজ। আরএফআইডি প্রটেক্টেড ওয়ালেট কার্ডের তথ্য সুরক্ষিত রাখে। যেকোনো উপহারের জন্য সেরা পছন্দ।',
    specifications: {
      'উপাদান': '১০০% খাঁটি লেদার (ওয়ালেট ও বেল্ট উভয়েই)',
      'বাকল': 'অটোমেটিক স্লাইডিং র‍্যাচেট লক',
      'ওয়ালেট ফিচার': 'RFID ব্লকিং, ৮টি কার্ড স্লট ও ক্যাশ পকেট',
      'প্যাকেজিং': 'এক্সক্লুসিভ ম্যাগনেটিক গিফট বক্স'
    },
    images: [
      'https://images.unsplash.com/photo-1606503825008-909a67e63c2f?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2200,
    salePrice: 1590,
    stock: 24,
    rating: 4.9,
    reviewCount: 41,
    soldCount: 160,
    isFeatured: false,
    warranty: '১ বছরের গ্যারান্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-13T13:00:00',
    status: 'published'
  },

  // --- WOMEN'S SEGMENT ---
  // Women's Clothing & Sarees
  {
    id: 'prod-001',
    vendorId: 'v-001',
    vendorName: 'সিল্ক ও তাঁত ঘর',
    vendorVerified: true,
    titleBn: 'ঐতিহ্যবাহী টাঙ্গাইল জামদানি তাঁতের সুতি শাড়ি',
    titleEn: 'Traditional Tangail Jamdani Cotton Handloom Saree',
    slug: 'tangail-jamdani-cotton-saree',
    segment: 'women',
    categoryId: 'cat-fashion',
    categoryNameBn: 'মহিলাদের পোশাক ও শাড়ি',
    subcategoryId: 'sub-women-clothing',
    subcategoryNameBn: 'মহিলাদের পোশাক ও শাড়ি',
    brand: 'টাঙ্গাইল তন্তুবায়',
    descriptionBn: '১০০% পিওর কটন সুতায় বোনা আরামদায়ক টাঙ্গাইল জামদানি শাড়ি। গ্রীষ্মের যে কোনো উৎসব ও ঘরোয়া আয়োজনের জন্য চমৎকার। ১২ হাত লম্বা শাড়ি এবং সাথে রয়েছে ম্যাচিং ব্লাউজ পিস। আঁচলে আকর্ষণীয় সোনালি সুতার কাজ রয়েছে।',
    specifications: {
      'উপাদান': '১০০% খাঁটি সুতি (Cotton)',
      'দৈর্ঘ্য': '১২ হাত (সাথে ব্লাউজ পিস)',
      'উৎপাদন স্থান': 'টাঙ্গাইল, বাংলাদেশ',
      'ধৌত পদ্ধতি': 'হালকা শ্যাম্পু ওয়াশ বা ড্রাই ওয়াশ',
      'রঙের গ্যারান্টি': '১০০% পাকা রঙ'
    },
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2850,
    salePrice: 2190,
    stock: 24,
    rating: 4.8,
    reviewCount: 89,
    soldCount: 312,
    isFeatured: true,
    isFlashDeal: true,
    flashDealEnd: '2026-10-18T23:59:59',
    variants: [
      { id: 'v-s-red', name: 'গাঢ় লাল ও সোনালি জরি', price: 2850, salePrice: 2190, stock: 12, sku: 'TG-JAM-RED' },
      { id: 'v-s-blue', name: 'রয়েল ব্লু ও রূপালি কাজ', price: 2850, salePrice: 2190, stock: 8, sku: 'TG-JAM-BLU' },
      { id: 'v-s-green', name: 'সবুজ ও মিষ্টি কমলা', price: 2850, salePrice: 2190, stock: 4, sku: 'TG-JAM-GRN' }
    ],
    warranty: '৭ দিনের সহজ রিটার্ন পলিসি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-01-10T10:00:00',
    status: 'published'
  },
  {
    id: 'prod-women-three-piece',
    vendorId: 'v-001',
    vendorName: 'সিল্ক ও তাঁত ঘর',
    vendorVerified: true,
    titleBn: 'ডিজাইনার সফট কটন এমব্রয়ডারি থ্রি-পিস সেট',
    titleEn: 'Designer Soft Cotton Embroidered Three-Piece Suit',
    slug: 'designer-soft-cotton-embroidered-three-piece',
    segment: 'women',
    categoryId: 'cat-fashion',
    categoryNameBn: 'মহিলাদের পোশাক ও শাড়ি',
    subcategoryId: 'sub-women-clothing',
    subcategoryNameBn: 'মহিলাদের পোশাক ও শাড়ি',
    brand: 'রূপবতী বাংলা',
    descriptionBn: 'উচ্চমানের লাক্সারি সফট কটন ফ্যাব্রিকে সূক্ষ্ম এমব্রয়ডারি ও সিকোয়েন্সের কাজ করা থ্রি-পিস। সাথে রয়েছে আরামদায়ক সুতি সালোয়ার এবং শিফন ডিজিটাল প্রিন্ট ওড়না। গরমের দিনে পরার জন্য অত্যন্ত উপযোগী।',
    specifications: {
      'কামিজ': 'সফট পিওর কটন (লং ৪৪ ইঞ্চি)',
      'ওড়না': 'ডিজিটাল প্রিন্ট পিওর শিফন (৫ হাত)',
      'সালোয়ার': 'ম্যাচিং কটন বাটার ফ্যাব্রিক',
      'টাইপ': 'আনস্টিচড / সেমি-স্টিচড'
    },
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2650,
    salePrice: 1950,
    stock: 20,
    rating: 4.8,
    reviewCount: 35,
    soldCount: 140,
    isFeatured: true,
    warranty: '১০০% ফেব্রিক ও রঙের গ্যারান্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-01T11:00:00',
    status: 'published'
  },

  // Women's Shoes & Heels
  {
    id: 'prod-women-heel-01',
    vendorId: 'v-005',
    vendorName: 'এলিগেন্ট মেনজ ক্লাব',
    vendorVerified: true,
    titleBn: 'স্টাইলিশ ২.৫ ইঞ্চি ব্লক হিল পার্টি স্যান্ডেল',
    titleEn: 'Stylish 2.5 Inch Block Heel Party Sandals',
    slug: 'stylish-block-heel-party-sandals',
    segment: 'women',
    categoryId: 'cat-fashion',
    categoryNameBn: 'জুতা ও হিল',
    subcategoryId: 'sub-women-shoes',
    subcategoryNameBn: 'জুতা ও হিল',
    brand: 'বেল্লা ফ্যাশন',
    descriptionBn: 'ভারসাম্যপূর্ণ ২.৫ ইঞ্চি ব্লক হিল যা পায়ে কোনো ব্যথা ছাড়া সারাদিন স্বাচ্ছন্দ্যে পরা যায়। শাড়ি, পার্টি ড্রেস বা সালোয়ার কামিজের সাথে মানানসই গ্লসি সোনালী ও প্যাস্টেল ফিনিশ। কুশনড ফুটবেড আরাম নিশ্চিত করে।',
    specifications: {
      'হিলের উচ্চতা': '২.৫ ইঞ্চি স্টেবল ব্লক হিল',
      'ফুটবেড': 'সফট স্পঞ্জ কুশনিং',
      'আউটসোল': 'অ্যান্টি-স্লিপ গ্রিপ রাবার',
      'উপাদান': 'প্রিমিয়াম পিইউ লেদার'
    },
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2450,
    salePrice: 1790,
    stock: 19,
    rating: 4.8,
    reviewCount: 44,
    soldCount: 165,
    isFeatured: true,
    variants: [
      { id: 'v-wh-36', name: 'গোল্ডেন (সাইজ ৩৬)', price: 2450, salePrice: 1790, stock: 7, sku: 'HL-GLD-36' },
      { id: 'v-wh-37', name: 'গোল্ডেন (সাইজ ৩৭)', price: 2450, salePrice: 1790, stock: 8, sku: 'HL-GLD-37' },
      { id: 'v-wh-38', name: 'রোজ গোল্ড (সাইজ ৩৮)', price: 2450, salePrice: 1790, stock: 4, sku: 'HL-ROSE-38' }
    ],
    warranty: '৩ মাসের হিল ও সোল ওয়ারেন্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-02T12:00:00',
    status: 'published'
  },

  // Women's Sunglasses
  {
    id: 'prod-women-sunglasses-01',
    vendorId: 'v-003',
    vendorName: 'টেক স্মার্ট বাংলাদেশ',
    vendorVerified: true,
    titleBn: 'ক্যাট-আই ইউভি৪০০ প্রিমিয়াম ফ্যাশন সানগ্লাস',
    titleEn: 'Cat-Eye UV400 Premium Fashion Sunglasses for Women',
    slug: 'cat-eye-uv400-women-sunglasses',
    segment: 'women',
    categoryId: 'cat-fashion',
    categoryNameBn: 'সানগ্লাস',
    subcategoryId: 'sub-women-sunglasses',
    subcategoryNameBn: 'সানগ্লাস',
    brand: 'লুমিনা সান',
    descriptionBn: 'লেটেস্ট ট্রেন্ডি ক্যাট-আই ডিজাইনের গ্ল্যামারাস সানগ্লাস। আল্ট্রা-ভায়োলেট ইউভি৪০০ প্রোটেকশন চোখের সংবেদনশীল ত্বককে রক্ষা করে। লাইটওয়েট মেটাল ও অ্যাসিটেট ফ্রেম অত্যন্ত আরামদায়ক।',
    specifications: {
      'ইউভি ফিল্টার': 'UV400 প্রোটেকশন (ক্যাটাগরি ৩)',
      'ডিজাইন': 'ক্যাট-আই এলিগেন্ট ফ্রেম',
      'লেন্স কালার': 'গ্রেডিয়েন্ট স্মোক ব্রাউন',
      'অতিরিক্ত': 'লেদার পাউচ ও লেন্স ওয়াইপার'
    },
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 1550,
    salePrice: 1090,
    stock: 25,
    rating: 4.9,
    reviewCount: 58,
    soldCount: 220,
    isFeatured: true,
    warranty: '১ বছরের কালার গ্যারান্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-03T15:00:00',
    status: 'published'
  },

  // Women's Watches
  {
    id: 'prod-women-watch-01',
    vendorId: 'v-003',
    vendorName: 'টেক স্মার্ট বাংলাদেশ',
    vendorVerified: true,
    titleBn: 'রোজ গোল্ড ডায়মন্ড ডায়াল লাক্সারি লেডিস রিস্ট ওয়াচ',
    titleEn: 'Rose Gold Diamond Dial Luxury Ladies Wrist Watch',
    slug: 'rose-gold-diamond-dial-ladies-watch',
    segment: 'women',
    categoryId: 'cat-electronics',
    categoryNameBn: 'ঘড়ি',
    subcategoryId: 'sub-women-watches',
    subcategoryNameBn: 'ঘড়ি',
    brand: 'জুলিয়াস ফ্যাশন',
    descriptionBn: 'মেয়েদের হাতের সৌন্দর্য বাড়ানোর জন্য নান্দনিক রোজ গোল্ড ফিনিশিং এবং স্ফটিক ডায়মন্ড স্টাডেড বেজেল। জাপানিজ কোয়ার্টজ মুভমেন্ট সঠিক সময় নিশ্চিত করে। ওয়াটার রেজিস্ট্যান্ট এবং ম্যাগনেটিক মেটাল মেশ স্ট্র্যাপ।',
    specifications: {
      'ডায়াল': 'মাদার-অব-পার্ল শিমেয়ারিং ফিনিশ',
      'স্ট্র্যাপ': 'ম্যাগনেটিক অ্যাডজাস্টেবল মেশ ব্যান্ড',
      'ওয়াটারপ্রুফ': '3ATM ডেইলি স্প্ল্যাশপ্রুফ',
      'ওয়ারেন্টি': '১ বছরের অফিশিয়াল ওয়ারেন্টি'
    },
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2890,
    salePrice: 1990,
    stock: 20,
    rating: 4.8,
    reviewCount: 39,
    soldCount: 150,
    isFeatured: true,
    warranty: '১ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-04T10:00:00',
    status: 'published'
  },

  // Women's Bags
  {
    id: 'prod-women-bag-01',
    vendorId: 'v-004',
    vendorName: 'বাংলার পাট ও কারুশিল্প',
    vendorVerified: true,
    titleBn: 'প্রিমিয়াম লেদার এলিগেন্ট শোল্ডার হ্যান্ডব্যাগ',
    titleEn: 'Premium Leather Elegant Shoulder Handbag for Women',
    slug: 'premium-leather-elegant-shoulder-handbag',
    segment: 'women',
    categoryId: 'cat-fashion',
    categoryNameBn: 'ব্যাগ ও পার্স',
    subcategoryId: 'sub-women-bags',
    subcategoryNameBn: 'ব্যাগ ও পার্স',
    brand: 'ভার্দে লেদার',
    descriptionBn: 'দৈনন্দিন অফিস, বিশ্ববিদ্যালয় ও ভ্রমণের জন্য সুপরিসর প্রিমিয়াম লেদার শোল্ডার ব্যাগ। ভেতরে রয়েছে একাধিক জিপার চেম্বার ও মোবাইল পকেট। পানি ও ধুলাবালি প্রতিরোধক ফ্যাব্রিক লাইনিং।',
    specifications: {
      'উপাদান': 'প্রিমিয়াম পিইউ লেদার ও ওয়াটারপ্রুফ লাইনিং',
      'চেম্বার': '৩টি বড় জিপার চেম্বার ও ২টি সাইড স্লট',
      'স্ট্র্যাপ': 'অ্যাডজাস্টেবল শোল্ডার স্ট্র্যাপ',
      'সাইজ': '১২ x ১০ x ৫ ইঞ্চি'
    },
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2350,
    salePrice: 1690,
    stock: 27,
    rating: 4.9,
    reviewCount: 51,
    soldCount: 195,
    isFeatured: false,
    warranty: '৬ মাসের জিপার ও স্টিচ ওয়ারেন্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-05T14:00:00',
    status: 'published'
  },

  // Women's Jewelry
  {
    id: 'prod-women-jewelry-01',
    vendorId: 'v-001',
    vendorName: 'সিল্ক ও তাঁত ঘর',
    vendorVerified: true,
    titleBn: 'ঐতিহ্যবাহী গোল্ড-প্লেটেড কুন্দন চোকার নেকলেস সেট',
    titleEn: 'Traditional Gold-Plated Kundan Choker Necklace Set',
    slug: 'gold-plated-kundan-choker-necklace-set',
    segment: 'women',
    categoryId: 'cat-fashion',
    categoryNameBn: 'অলংকার ও গহনা',
    subcategoryId: 'sub-women-jewelry',
    subcategoryNameBn: 'অলংকার ও গহনা',
    brand: 'স্বর্ণাঞ্জলি ক্রাফটস',
    descriptionBn: 'বিয়ে ও উৎসবের জন্য আকর্ষণীয় কুন্দন ও রুবি ক্রিস্টাল খচিত গোল্ড-প্লেটেড চোকার নেকলেস সেট। সাথে ম্যাচিং কানের দুল ও টিকলি সংযুক্ত। অ্যান্টি-অ্যালার্জি এবং দীর্ঘস্থায়ী গোল্ড পালিশ।',
    specifications: {
      'প্লেটিং': '২৪ ক্যারেট মাইক্রো গোল্ড প্লেটেড',
      'পাথর': 'হাতে বসানো কুন্দন ও রুবি বিডস',
      'সেট অন্তর্ভুক্ত': '১টি চোকার নেকলেস, ২টা কানের দুল ও ১টা টিকলি',
      'উপযুক্ততা': 'বিয়ে, গায়ে হলুদ ও উৎসব অনুষ্ঠান'
    },
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2950,
    salePrice: 2150,
    stock: 14,
    rating: 4.9,
    reviewCount: 31,
    soldCount: 88,
    isFeatured: true,
    warranty: '১ বছরের কালার গ্যারান্টি কার্ড',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-06T11:00:00',
    status: 'published'
  },

  // --- OTHERS SEGMENT ---
  // Pure Foods & Organic
  {
    id: 'prod-002',
    vendorId: 'v-002',
    vendorName: 'খাঁটি বাংলা অর্গানিক',
    vendorVerified: true,
    titleBn: 'সুন্দরবনের প্রাকৃতিক চাকভাঙ্গা খাঁটি মধু (১ কেজি)',
    titleEn: 'Sundarbans Natural Wild Raw Honey 1kg',
    slug: 'sundarbans-natural-wild-raw-honey-1kg',
    segment: 'others',
    categoryId: 'cat-organic',
    categoryNameBn: 'খাঁটি খাদ্য ও অর্গানিক',
    subcategoryId: 'sub-organic',
    subcategoryNameBn: 'খাঁটি খাদ্য ও অর্গানিক',
    brand: 'খাঁটি বাংলা',
    descriptionBn: 'সুন্দরবনের গভীর অরণ্য থেকে সরাসরি মৌয়ালদের হাত দিয়ে সংগৃহীত প্রাকৃতিক চাকভাঙ্গা মধু। কোনো প্রকার চিনি, প্রিজারভেটিভ বা কেমিক্যাল মুক্ত। প্রাকৃতিকভাবে অ্যান্টিঅক্সিডেন্ট ও পুষ্টিগুণে ভরপুর। ল্যাব টেস্ট রিপোর্ট সহ পাঠানো হয়।',
    specifications: {
      'পরিমাণ': '১০০০ গ্রাম (১ কেজি)',
      'উৎস': 'সুন্দরবন, সাতক্ষীরা রেঞ্জ',
      'সংগ্রহের ধরন': 'প্রাকৃতিক চাকভাঙ্গা (Raw Honey)',
      'সংরক্ষণ': 'স্বাভাবিক তাপমাত্রায় শুষ্ক স্থানে রাখুন',
      'বিএসটিআই মান': 'পরীক্ষিত ও মানসম্মত'
    },
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 1450,
    salePrice: 1180,
    stock: 45,
    rating: 4.9,
    reviewCount: 210,
    soldCount: 840,
    isFeatured: true,
    isFlashDeal: true,
    flashDealEnd: '2026-10-17T23:59:59',
    warranty: 'শতভাগ খাঁটি না হলে দ্বিগুণ মূল্য ফেরত',
    returnPolicyDays: 7,
    shippingClass: 'fragile',
    createdAt: '2026-01-15T12:00:00',
    status: 'published'
  },
  {
    id: 'prod-005',
    vendorId: 'v-002',
    vendorName: 'খাঁটি বাংলা অর্গানিক',
    vendorVerified: true,
    titleBn: 'কাঠের ঘানিতে ভাঙানো প্রথম চাপের খাঁটি সরিষার তেল (২ লিটার)',
    titleEn: 'Cold Pressed Wood Ghani Pure Mustard Oil 2L',
    slug: 'cold-pressed-wood-ghani-mustard-oil-2l',
    segment: 'others',
    categoryId: 'cat-organic',
    categoryNameBn: 'খাঁটি খাদ্য ও অর্গানিক',
    subcategoryId: 'sub-organic',
    subcategoryNameBn: 'খাঁটি খাদ্য ও অর্গানিক',
    brand: 'খাঁটি বাংলা',
    descriptionBn: 'দেশি মাঘী সরিষা থেকে কাঠের ঘানিতে মৃদু চাপে নিষ্কাশিত শতভাগ খাঁটি সরিষার তেল। ঝাঁঝালো প্রাকৃতিক সুবাস ও খাঁটি গুণসম্পন্ন। রান্নায় আসল বাঙালি স্বাদ নিয়ে আসে এবং কোলেস্টেরল নিয়ন্ত্রণে সহায়ক।',
    specifications: {
      'পরিমাণ': '২ লিটার (ক্যান প্যাক)',
      'নিষ্কাশন পদ্ধতি': 'কাঠের ঘানি (Cold Pressed)',
      'সরিষার জাত': 'দেশি মাঘী সরিষা',
      'ঝাঁঝ': 'শতভাগ প্রাকৃতিক তীব্র ঝাঁঝ',
      'বিএসটিআই': 'অনুমোদিত মানসম্মত মোড়কজাত'
    },
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 780,
    salePrice: 650,
    stock: 50,
    rating: 4.9,
    reviewCount: 154,
    soldCount: 620,
    isFeatured: false,
    isFlashDeal: true,
    flashDealEnd: '2026-10-18T23:59:59',
    warranty: 'খাঁটি হওয়ার নিশ্চয়তা',
    returnPolicyDays: 5,
    shippingClass: 'standard',
    createdAt: '2026-02-18T10:00:00',
    status: 'published'
  },

  // Electronics & Gadgets
  {
    id: 'prod-007',
    vendorId: 'v-003',
    vendorName: 'টেক স্মার্ট বাংলাদেশ',
    vendorVerified: true,
    titleBn: 'ট্রু ওয়্যারলেস এএনসি ইয়ারবাডস - ৬০ ঘণ্টা প্লেব্যাক',
    titleEn: 'True Wireless ANC Earbuds 60H Playback',
    slug: 'true-wireless-anc-earbuds-60h-playback',
    segment: 'others',
    categoryId: 'cat-electronics',
    categoryNameBn: 'ইলেকট্রনিক্স ও গ্যাজেট',
    subcategoryId: 'sub-electronics',
    subcategoryNameBn: 'ইলেকট্রনিক্স ও গ্যাজেট',
    brand: 'সাউন্ডমাস্টার',
    descriptionBn: 'অ্যাক্টিভ নয়েজ ক্যান্সেলেশন (ANC) সহ ক্রিস্টাল ক্লিয়ার অডিও অভিজ্ঞতা। কোয়াড মাইক ইএনসি প্রযুক্তি ফলে স্পষ্ট ফোনালাপ। লো-লেটেন্সি গেমিং মোড ও টাইপ-সি ফাস্ট চার্জিং।',
    specifications: {
      'নয়েজ ক্যান্সেলেশন': '32dB হাইব্রিড ANC',
      'প্লেব্যাক সময়': 'কেস সহ ৬০ ঘণ্টা',
      'ব্লুটুথ ভার্সন': 'Bluetooth 5.4',
      'চার্জিং': 'টাইপ-সি ফাস্ট চার্জ (১০ মিনিটে ৩ ঘণ্টা গান)'
    },
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 2200,
    salePrice: 1650,
    stock: 30,
    rating: 4.6,
    reviewCount: 92,
    soldCount: 380,
    isFeatured: false,
    warranty: '৬ মাসের রিপ্লেসমেন্ট ওয়ারেন্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-01T08:00:00',
    status: 'published'
  },

  // Handicrafts
  {
    id: 'prod-004',
    vendorId: 'v-004',
    vendorName: 'বাংলার পাট ও কারুশিল্প',
    vendorVerified: true,
    titleBn: 'প্রিমিয়াম ইকো-ফ্রেন্ডলি পাটের টোট ব্যাগ ও শপিং ব্যাগ',
    titleEn: 'Premium Eco-friendly Jute Handcrafted Tote Bag',
    slug: 'premium-jute-handcrafted-tote-bag',
    segment: 'others',
    categoryId: 'cat-handicraft',
    categoryNameBn: 'হস্তশিল্প ও দেশীয় ঐতিহ্য',
    subcategoryId: 'sub-handicraft',
    subcategoryNameBn: 'হস্তশিল্প ও দেশীয় ঐতিহ্য',
    brand: 'সোনালী আঁশ ক্রাফট',
    descriptionBn: 'উচ্চমানের রপ্তানিযোগ্য সোনালী পাট এবং জেনুইন লেদার হ্যান্ডেলে তৈরি প্রিমিয়াম টোট ব্যাগ। অফিস, কলেজ কিংবা শপিংয়ের জন্য অত্যন্ত টেকসই ও আকর্ষণীয়। পরিবেশবান্ধব ও পানি প্রতিরোধক লাইনিং সহ তৈরি।',
    specifications: {
      'উপাদান': '১০০% প্রাকৃতিক সোনালী পাট ও চামড়ার হ্যান্ডেল',
      'আকার': '১৫ ইঞ্চি x ১৩ ইঞ্চি x ৫ ইঞ্চি',
      'ধারণক্ষমতা': '১০ কেজি পর্যন্ত সহজে বহনযোগ্য',
      'অভ্যন্তরীণ পকেট': '১টি জিপার পকেট এবং ২টি মোবাইল স্লট',
      'উৎপাদন': 'বগুড়া ও ঢাকা কারিগর কর্তৃক হস্তনির্মিত'
    },
    images: [
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 1250,
    salePrice: 890,
    stock: 35,
    rating: 4.9,
    reviewCount: 42,
    soldCount: 145,
    isFeatured: true,
    warranty: '৬ মাসের কারিগরি সেবা ওয়ারেন্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-02-12T14:00:00',
    status: 'published'
  },
  {
    id: 'prod-008',
    vendorId: 'v-004',
    vendorName: 'বাংলার পাট ও কারুশিল্প',
    vendorVerified: true,
    titleBn: 'হাতে বোনা সুতি নকশী কাঁথা (সিঙ্গেল সাইজ)',
    titleEn: 'Handstitched Cotton Nakshi Kantha Single Size',
    slug: 'handstitched-cotton-nakshi-kantha-single-size',
    segment: 'others',
    categoryId: 'cat-handicraft',
    categoryNameBn: 'হস্তশিল্প ও দেশীয় ঐতিহ্য',
    subcategoryId: 'sub-handicraft',
    subcategoryNameBn: 'হস্তশিল্প ও দেশীয় ঐতিহ্য',
    brand: 'পল্লী গাঁথা',
    descriptionBn: 'গ্রামের দক্ষ নারী কারিগরদের হাতে নিখুঁত সূঁচ ও রঙিন সুতায় বোনা ঐতিহ্যবাহী নকশী কাঁথা। শীত ও এসি রুমের জন্য চমৎকার আরামদায়ক। ১০০% ধোয়া সুতি কাপড়ে তৈরি।',
    specifications: {
      'সাইজ': '৭ ফুট x ৫ ফুট (সিঙ্গেল)',
      'উপাদান': '১০০% কটন সূতি ও রেশম সুতার সূচিকর্ম',
      'কারুকাজ': 'ঐতিহ্যবাহী ময়ূর ও লতাপাতা নকশা',
      'স্থায়িত্ব': 'দীর্ঘস্থায়ী ও সহজে ধোয়া যায়'
    },
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
    ],
    regularPrice: 3200,
    salePrice: 2490,
    stock: 15,
    rating: 4.9,
    reviewCount: 38,
    soldCount: 95,
    isFeatured: true,
    warranty: 'হস্তশিল্পের মৌলিকত্ব গ্যারান্টি',
    returnPolicyDays: 7,
    shippingClass: 'standard',
    createdAt: '2026-03-05T13:00:00',
    status: 'published'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-01',
    productId: 'prod-001',
    userId: 'usr-101',
    userName: 'নুসরাত জাহান',
    rating: 5,
    commentBn: 'শাড়ির কাপড়ের মান এবং আঁচলের জরি সত্যিই অসাধারণ! ছবির চেয়ে বাস্তবে আরও সুন্দর দেখাচ্ছে। সময়মত ডেলিভারি পেয়েছি।',
    createdAt: '২০২৬-০৩-২০',
    verifiedPurchase: true
  },
  {
    id: 'rev-02',
    productId: 'prod-men-shoe-01',
    userId: 'usr-102',
    userName: 'তানভীর আহমেদ',
    rating: 5,
    commentBn: 'অক্সফোর্ড শু গুলোর চামড়া শতভাগ পিওর এবং ভেতরে খুব আরামদায়ক। অফিসে প্রতিদিন পরছি, কোনো সমস্যা নেই।',
    createdAt: '২০২৬-০৩-২৫',
    verifiedPurchase: true
  },
  {
    id: 'rev-03',
    productId: 'prod-002',
    userId: 'usr-103',
    userName: 'মো. রফিকুল ইসলাম',
    rating: 5,
    commentBn: 'সুন্দরবনের খাঁটি মধুর প্রাকৃতিক গন্ধ এবং স্বাদ একদম আলাদা। কোনো কৃত্রিম মিষ্টি নেই। নিয়মিত নিব ইনশাআল্লাহ।',
    createdAt: '২০২৬-০৩-২২',
    verifiedPurchase: true
  },
  {
    id: 'rev-04',
    productId: 'prod-men-sunglasses-01',
    userId: 'usr-104',
    userName: 'ফারহান সাদিক',
    rating: 5,
    commentBn: 'সানগ্লাসের পোলারাইজড লেন্স চোখের জন্য খুবই আরামদায়ক। রোদ ও বাইক ড্রাইভের সময় সেরা সুরক্ষা দেয়।',
    createdAt: '২০২৬-০৩-২৮',
    verifiedPurchase: true
  }
];

export const LOCALIZED_STRINGS = {
  appName: 'বিশ্বাস বাজার',
  appTagline: 'বিশ্বাসের সাথে কেনাকাটা',
  currencySymbol: '৳',
  searchPlaceholder: 'পণ্য, পোশাক, জুতা, সানগ্লাস, ঘড়ি বা বেল্ট খুঁজুন...',
  cart: 'কার্ট',
  checkout: 'চেকআউট',
  login: 'লগইন',
  register: 'নিবন্ধন',
  vendorPortal: 'বিক্রেতা কর্নার',
  adminPortal: 'প্রশাসনিক পোর্টাল',
  cashOnDelivery: 'ক্যাশ অন ডেলিভারি (COD)',
  deliveryCharges: {
    insideDhaka: 60,
    outsideDhaka: 120,
    expressDhaka: 120
  }
};
