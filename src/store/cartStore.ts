import { create } from 'zustand';
import { Product, CartItem, OrderRecord, ProductCategory } from '../types';
import { PRODUCTS, COURIER_OPTIONS } from '../data/products';

interface CartState {
  // Navigation & Modals
  activePage: 'home' | 'catalog' | 'detail' | 'safety' | 'about' | 'contact' | 'karambit-lab';
  selectedProductId: string | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isWishlistOpen: boolean;
  isAgeVerified: boolean;
  isAgeModalOpen: boolean;
  isDbModalOpen: boolean;
  searchQuery: string;
  categoryFilter: ProductCategory | 'all';
  
  // Cart & Commerce
  items: CartItem[];
  wishlist: string[];
  promoCode: string;
  discountPercentage: number;
  selectedCourierId: string;
  stockHoldSeconds: number; // 10 minutes hold = 600s
  stockTimerActive: boolean;
  
  // Toast & Notifications
  toast: { message: string; type: 'success' | 'info' | 'warning' } | null;
  
  // Animation coordinates for Add-to-Cart particle arc
  flyingParticle: {
    id: number;
    startX: number;
    startY: number;
  } | null;

  // Order History for simulated checkout tracking
  orders: OrderRecord[];
  latestOrder: OrderRecord | null;

  // Actions
  setActivePage: (page: CartState['activePage'], productId?: string) => void;
  openProductDetail: (productId: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  setIsAgeVerified: (verified: boolean) => void;
  setIsAgeModalOpen: (open: boolean) => void;
  setIsDbModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: ProductCategory | 'all') => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number, eventOrCoords?: { clientX: number; clientY: number }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  
  // Checkout & Promo
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  setSelectedCourierId: (id: string) => void;
  tickStockTimer: () => void;
  resetStockTimer: () => void;
  createOrder: (order: OrderRecord) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  clearToast: () => void;
}

export const useCartStore = create<CartState>((set, get) => {
  // Check local storage safely
  const initialAgeVerified = typeof window !== 'undefined' 
    ? localStorage.getItem('imvor_age_verified') === 'true' 
    : false;

  return {
    activePage: 'home',
    selectedProductId: null,
    isCartOpen: false,
    isCheckoutOpen: false,
    isWishlistOpen: false,
    isAgeVerified: initialAgeVerified,
    isAgeModalOpen: !initialAgeVerified,
    isDbModalOpen: false,
    searchQuery: '',
    categoryFilter: 'all',
    
    items: [
      // Preload 1 starter item so the cart isn't completely bare on initial exploratory glance
      {
        product: PRODUCTS[0],
        quantity: 1,
        addedAt: Date.now()
      }
    ],
    wishlist: ['imvor-folder-edc-shadow'],
    promoCode: '',
    discountPercentage: 0,
    selectedCourierId: 'tcs',
    stockHoldSeconds: 600, // 10 minutes hold according to PRD
    stockTimerActive: true,
    toast: null,
    flyingParticle: null,
    orders: [],
    latestOrder: null,

    setActivePage: (page, productId) => {
      set({ 
        activePage: page, 
        selectedProductId: productId || null,
        isCartOpen: false 
      });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    openProductDetail: (productId) => {
      set({ 
        activePage: 'detail', 
        selectedProductId: productId,
        isCartOpen: false 
      });
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    setIsCartOpen: (open) => set({ isCartOpen: open }),
    setIsCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
    setIsWishlistOpen: (open) => set({ isWishlistOpen: open }),
    
    setIsAgeVerified: (verified) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('imvor_age_verified', verified ? 'true' : 'false');
      }
      set({ isAgeVerified: verified, isAgeModalOpen: !verified });
    },

    setIsAgeModalOpen: (open) => set({ isAgeModalOpen: open }),
    setIsDbModalOpen: (open) => set({ isDbModalOpen: open }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setCategoryFilter: (category) => set({ categoryFilter: category }),

    addToCart: (product, quantity = 1, eventOrCoords) => {
      const state = get();
      
      // Particle animation trigger if coordinates provided
      if (eventOrCoords) {
        set({
          flyingParticle: {
            id: Date.now(),
            startX: eventOrCoords.clientX,
            startY: eventOrCoords.clientY
          }
        });
        setTimeout(() => {
          set({ flyingParticle: null });
        }, 800);
      }

      const existingIndex = state.items.findIndex(item => item.product.id === product.id);
      let updatedItems: CartItem[];

      if (existingIndex > -1) {
        updatedItems = state.items.map((item, index) => 
          index === existingIndex 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, { product, quantity, addedAt: Date.now() }];
      }

      set({ 
        items: updatedItems,
        stockHoldSeconds: 600, // Reset 10-minute hold timer on fresh add
        stockTimerActive: true
      });

      // Show alert toast
      get().showToast(`Added ${product.name} to tactical cart`, 'success');
    },

    removeFromCart: (productId) => {
      const updated = get().items.filter(item => item.product.id !== productId);
      set({ 
        items: updated,
        stockTimerActive: updated.length > 0 
      });
      get().showToast('Item removed from cart', 'info');
    },

    updateQuantity: (productId, quantity) => {
      if (quantity <= 0) {
        get().removeFromCart(productId);
        return;
      }
      const updated = get().items.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      );
      set({ items: updated });
    },

    clearCart: () => set({ items: [], promoCode: '', discountPercentage: 0, stockHoldSeconds: 600 }),

    toggleWishlist: (productId) => {
      const current = get().wishlist;
      const exists = current.includes(productId);
      const updated = exists 
        ? current.filter(id => id !== productId)
        : [...current, productId];
      
      set({ wishlist: updated });
      get().showToast(
        exists ? 'Removed from saved armory' : 'Saved to armory wishlist',
        'info'
      );
    },

    applyPromoCode: (code) => {
      const clean = code.trim().toUpperCase();
      if (clean === 'IMVOR10') {
        set({ promoCode: 'IMVOR10', discountPercentage: 10 });
        get().showToast('Promo code applied: 10% Tactical Discount Activated', 'success');
        return true;
      }
      get().showToast('Invalid promo code. Use code IMVOR10 for demo discount.', 'warning');
      return false;
    },

    removePromoCode: () => {
      set({ promoCode: '', discountPercentage: 0 });
      get().showToast('Promo code removed', 'info');
    },

    setSelectedCourierId: (id) => set({ selectedCourierId: id }),

    tickStockTimer: () => {
      const current = get().stockHoldSeconds;
      if (current > 0 && get().items.length > 0) {
        set({ stockHoldSeconds: current - 1 });
      } else if (current === 0 && get().items.length > 0) {
        // Expired hold
        set({ stockHoldSeconds: 0 });
      }
    },

    resetStockTimer: () => set({ stockHoldSeconds: 600 }),

    createOrder: (order) => {
      set(state => ({
        orders: [order, ...state.orders],
        latestOrder: order,
        items: [],
        isCheckoutOpen: false,
        isCartOpen: false
      }));
    },

    showToast: (message, type = 'info') => {
      set({ toast: { message, type } });
      setTimeout(() => {
        if (get().toast?.message === message) {
          set({ toast: null });
        }
      }, 3500);
    },

    clearToast: () => set({ toast: null })
  };
});
