export type ProductCategory = 
  | 'pocket-knives'
  | 'karambit'
  | 'pepper-spray'
  | 'stun-taser'
  | 'airguns'
  | 'gadgets'
  | 'outdoor-gear';

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  pricePKR: number;
  originalPricePKR?: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  inStock: boolean;
  stockQty: number;
  isRestrictedItem: boolean; // High impact item requiring CNIC verification
  badge?: string;
  specs: ProductSpec[];
  features: string[];
  karambitVariantId?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: number;
}

export interface CourierOption {
  id: string;
  name: string;
  estimate: string;
  costPKR: number;
  description: string;
}

export type PaymentMethodType = 'jazzcash' | 'easypaisa' | 'raast' | 'card' | 'cod';

export interface OrderCustomerInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
  cnicNumber?: string;
}

export interface OrderShippingInfo {
  address: string;
  city: string;
  province: string;
  postalCode: string;
  courierId: string;
  notes?: string;
}

export interface OrderRecord {
  orderId: string;
  date: string;
  items: CartItem[];
  customer: OrderCustomerInfo;
  shipping: OrderShippingInfo;
  paymentMethod: PaymentMethodType;
  paymentStatus: 'paid' | 'pending_otp' | 'verified_cod' | 'confirmed';
  subtotalPKR: number;
  discountPKR: number;
  shippingPKR: number;
  totalPKR: number;
  trackingNumber: string;
}

export interface KarambitVariant {
  id: number;
  name: string;
  subtitle: string;
  pricePKR: number;
  spineThickness: string;
  ringDiameter: string;
  bladeSteel: string;
  finish: string;
  weight: string;
  description: string;
  curveAngleDeg: number;
}
