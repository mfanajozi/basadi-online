
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Product {
  id: string;
  product: string;
  ingredients: string[];
  price: number;
  category: string;
  image: string;
  quantity?: number;
}

interface CartStore {
  items: Product[];
  cartItemsCount: number;
  totalAmount: number;
  paymentMethod: string;
  deliveryMethod: 'collection' | 'delivery';
  deliveryAddress?: {
    address: string;
    latitude: number;
    longitude: number;
    distance?: number;
  };
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setPaymentMethod: (method: string) => void;
  setDeliveryMethod: (method: 'collection' | 'delivery') => void;
  setDeliveryAddress: (address: {
    address: string;
    latitude: number;
    longitude: number;
    distance?: number;
  }) => void;
  calculateTotalPrice: () => number;
  calculateDeliveryFee: () => number;
  calculatePaymentFee: () => number;
  calculateFinalAmount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartItemsCount: 0,
      totalAmount: 0,
      paymentMethod: "cash", // Default to cash
      deliveryMethod: "collection", // Default to collection
      deliveryAddress: undefined,
      
      addToCart: (product: Product) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Item exists, increase quantity
          const updatedItems = [...items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: (updatedItems[existingItemIndex].quantity || 1) + 1
          };
          
          set(() => ({ 
            items: updatedItems,
            cartItemsCount: updatedItems.reduce((acc, item) => acc + (item.quantity || 1), 0),
            totalAmount: updatedItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)
          }));
        } else {
          // New item, add to cart with quantity 1
          set((state) => ({ 
            items: [...state.items, { ...product, quantity: 1 }],
            cartItemsCount: state.cartItemsCount + 1,
            totalAmount: state.totalAmount + product.price
          }));
        }
      },
      
      removeFromCart: (productId: string) => {
        const items = get().items;
        const updatedItems = items.filter(item => item.id !== productId);
        
        set(() => ({ 
          items: updatedItems,
          cartItemsCount: updatedItems.reduce((acc, item) => acc + (item.quantity || 1), 0),
          totalAmount: updatedItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        const items = get().items;
        const updatedItems = items.map(item => {
          if (item.id === productId) {
            return { ...item, quantity: quantity };
          }
          return item;
        });
        
        set(() => ({ 
          items: updatedItems,
          cartItemsCount: updatedItems.reduce((acc, item) => acc + (item.quantity || 1), 0),
          totalAmount: updatedItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0)
        }));
      },
      
      clearCart: () => {
        set(() => ({ items: [], cartItemsCount: 0, totalAmount: 0 }));
      },
      
      setPaymentMethod: (method: string) => {
        set(() => ({ paymentMethod: method }));
      },
      
      setDeliveryMethod: (method: 'collection' | 'delivery') => {
        set(() => ({ deliveryMethod: method }));
      },
      
      setDeliveryAddress: (address) => {
        set(() => ({ deliveryAddress: address }));
      },
      
      calculateTotalPrice: () => {
        const items = get().items;
        return items.reduce((total, item) => {
          return total + (item.price * (item.quantity || 1));
        }, 0);
      },
      
      calculateDeliveryFee: () => {
        const { deliveryMethod, deliveryAddress } = get();

        if (deliveryMethod !== 'delivery' || !deliveryAddress?.latitude || !deliveryAddress?.longitude) {
          return 0;
        }

        // Store coordinates
        const storeLatitude = -26.2607103;
        const storeLongitude = 27.851005;

        // Placeholder for distance calculation (replace with actual calculation)
        const distance = calculateDistance(
          storeLatitude,
          storeLongitude,
          deliveryAddress.latitude,
          deliveryAddress.longitude
        );

        if (distance < 2) {
          return 10; // R10 for distances less than 2km
        } else if (distance <= 5) {
          return 20; // R20 for distances 2-5km
        } else {
          return 0; // No delivery beyond 5km
        }
      },
      
      calculatePaymentFee: () => {
        const { paymentMethod, totalAmount } = get();
        const basePrice = totalAmount;
        
        if (paymentMethod === 'cash' || paymentMethod === 'cash_on_delivery') {
          return 0; // No extra fee for cash
        }
        
        // Online payment fee (10% of base price)
        return basePrice * 0.1;
      },
      
      calculateFinalAmount: () => {
        const { calculateTotalPrice, calculateDeliveryFee, calculatePaymentFee } = get();
        
        const basePrice = calculateTotalPrice();
        const deliveryFee = calculateDeliveryFee();
        const paymentFee = calculatePaymentFee();
        
        return basePrice + deliveryFee + paymentFee;
      },
    }),
    {
      name: "basadi-cart-storage",
    }
  )
);

// Placeholder for distance calculation (replace with actual calculation)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  // This is a simplified calculation and doesn't account for the Earth's curvature
  const R = 6371; // Radius of the Earth in kilometers
  const latDiff = (lat2 - lat1) * Math.PI / 180;
  const lonDiff = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(lonDiff / 2) * Math.sin(lonDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};
