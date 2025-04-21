
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "staff" | "customer";
  addresses?: {
    id: string;
    address: string;
    latitude: number;
    longitude: number;
    isDefault: boolean;
  }[];
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addAddress: (address: { address: string; latitude: number; longitude: number; }) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

// Mock user data for development
const MOCK_USERS = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@basadiskitchen.com",
    phone: "0123456789",
    role: "admin" as const,
    password: "admin123", // Not secure, just for demo
  },
  {
    id: "staff-1",
    name: "Staff User",
    email: "staff@basadiskitchen.com",
    phone: "0123456789",
    role: "staff" as const,
    password: "staff123", // Not secure, just for demo
  },
  {
    id: "customer-1",
    name: "Customer User",
    email: "customer@example.com",
    phone: "0123456789",
    role: "customer" as const,
    password: "customer123", // Not secure, just for demo
    addresses: [
      {
        id: "addr1",
        address: "123 Main Street, Johannesburg",
        latitude: -26.2607103,
        longitude: 27.851005,
        isDefault: true,
      }
    ]
  },
];

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (userData: User) => {
        set(() => ({
          user: userData,
          isAuthenticated: true,
        }));
      },
      
      logout: () => {
        set(() => ({
          user: null,
          isAuthenticated: false,
        }));
      },
      
      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },
      
      addAddress: (address) => {
        set((state) => {
          if (!state.user) return state;
          
          const newAddress = {
            id: Date.now().toString(),
            ...address,
            isDefault: !state.user.addresses || state.user.addresses.length === 0,
          };
          
          return {
            user: {
              ...state.user,
              addresses: [...(state.user.addresses || []), newAddress],
            },
          };
        });
      },
      
      removeAddress: (addressId) => {
        set((state) => {
          if (!state.user || !state.user.addresses) return state;
          
          const filteredAddresses = state.user.addresses.filter(
            (address) => address.id !== addressId
          );
          
          return {
            user: {
              ...state.user,
              addresses: filteredAddresses,
            },
          };
        });
      },
      
      setDefaultAddress: (addressId) => {
        set((state) => {
          if (!state.user || !state.user.addresses) return state;
          
          const updatedAddresses = state.user.addresses.map((address) => ({
            ...address,
            isDefault: address.id === addressId,
          }));
          
          return {
            user: {
              ...state.user,
              addresses: updatedAddresses,
            },
          };
        });
      },
    }),
    {
      name: "basadi-auth-storage",
    }
  )
);

// Add a helper function to verify login credentials for the mock data
export const verifyCredentials = (email: string, password: string) => {
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  
  if (user) {
    const { password, ...userData } = user;
    return userData as User;
  }
  
  return null;
};
