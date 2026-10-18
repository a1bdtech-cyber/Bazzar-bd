export type UserRole = 
  | 'guest' 
  | 'customer' 
  | 'vendor_applicant' 
  | 'approved_vendor' 
  | 'support_staff' 
  | 'operations_manager' 
  | 'finance_manager' 
  | 'super_admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  avatarUrl?: string;
  vendorShopId?: string;
  savedAddresses: Address[];
  createdAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  division: string; // ঢাকা, চট্টগ্রাম, রাজশাহী, etc.
  district: string;
  thana: string;
  areaDetails: string;
  isDefault: boolean;
  deliveryType: 'home' | 'office';
}

export type MainCategorySegment = 'men' | 'women' | 'others';

export interface SubCategoryItem {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  iconName: string;
  imageUrl?: string;
  segment: MainCategorySegment;
}

export interface CategorySegment {
  id: MainCategorySegment;
  nameBn: string;
  nameEn: string;
  slug: string;
  descriptionBn: string;
  iconName: string;
  subcategories: SubCategoryItem[];
}

export interface Category {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  iconName: string;
  imageUrl?: string;
  subcategories: { id: string; nameBn: string; nameEn: string; slug: string }[];
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "লাল / M" or "১২৮ জিবি / নীল"
  price: number;
  salePrice?: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  vendorId: string;
  vendorName: string;
  vendorVerified: boolean;
  titleBn: string;
  titleEn?: string;
  slug: string;
  segment?: MainCategorySegment; // 'men' | 'women' | 'others'
  categoryId: string;
  categoryNameBn: string;
  subcategoryId?: string;
  subcategoryNameBn?: string;
  brand?: string;
  descriptionBn: string;
  specifications: Record<string, string>;
  images: string[];
  regularPrice: number;
  salePrice?: number;
  stock: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  flashDealEnd?: string;
  variants?: ProductVariant[];
  warranty?: string;
  returnPolicyDays: number;
  shippingClass: 'standard' | 'fragile' | 'express';
  createdAt: string;
  status: 'published' | 'pending_approval' | 'draft' | 'paused' | 'archived';
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
  vendorId: string;
}

export interface VendorShop {
  id: string;
  ownerId: string;
  shopNameBn: string;
  shopNameEn: string;
  slug: string;
  logoUrl: string;
  bannerUrl: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  division: string;
  district: string;
  isVerified: boolean;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'suspended';
  phone: string;
  email: string;
  tradeLicenseNo?: string;
  commissionRate: number; // e.g. 5%
  returnPolicyBn: string;
  joinedDate: string;
}

export interface Campaign {
  id: string;
  titleBn: string;
  subtitleBn: string;
  badgeBn: string;
  bannerImage: string;
  bgColor: string;
  actionTextBn: string;
  categoryId?: string;
  discountTagBn: string;
  validUntil: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  commentBn: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

export type OrderStatus =
  | 'pending_confirmation'
  | 'confirmed'
  | 'processing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancellation_requested'
  | 'cancelled'
  | 'return_requested'
  | 'returned'
  | 'refund_pending'
  | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discountAmount: number;
  couponCode?: string;
  totalPayable: number;
  paymentMethod: 'cash_on_delivery' | 'bkash_sandbox' | 'nagad_sandbox' | 'rocket_sandbox' | 'upay_sandbox' | 'card_sandbox';
  paymentStatus: 'unpaid' | 'paid' | 'refunded' | 'failed';
  orderStatus: OrderStatus;
  orderDate: string;
  vendorIds: string[];
  trackingNotes?: string;
}
