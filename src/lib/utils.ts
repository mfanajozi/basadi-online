
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency in ZAR (South African Rand)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2
  }).format(amount);
}

// Calculate distance between two coordinates using the Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Check if an address is within delivery radius
export function isWithinDeliveryRadius(
  lat: number,
  lon: number,
  storeCoordinates = { lat: -26.2607103, lon: 27.851005 },
  radiusInKm = 5
): boolean {
  const distance = calculateDistance(
    lat,
    lon,
    storeCoordinates.lat,
    storeCoordinates.lon
  );
  return distance <= radiusInKm;
}

// Generate a unique ID (simple implementation)
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
