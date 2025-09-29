/**
 * Colors used throughout the City Explorer app
 * Organized into logical groups for better maintainability
 */

// Primary brand colors
export const primary = {
  white: '#FFFFFF',
  black: '#000000',
} as const;

// Category colors for different place types
export const category = {
  restaurants: '#FF6B6B',    // Coral red
  hotels: '#4ECDC4',         // Teal
  entertainment: '#FFD93D',  // Yellow
  touristPlaces: '#45B7D1',  // Blue
  healthcare: '#FF7675',     // Light red
} as const;

// Text colors
export const text = {
  primary: '#2E3440',        // Dark text
  secondary: '#666666',      // Gray text
  muted: '#999999',          // Light gray text
  light: '#CCCCCC',          // Very light gray
} as const;

// Background colors
export const background = {
  primary: '#FFFFFF',        // White background
  secondary: '#F8F9FA',      // Light gray background
  card: '#FFFFFF',           // Card background
} as const;

// Border and divider colors
export const border = {
  light: '#F0F0F0',          // Light border
  medium: '#E0E0E0',         // Medium border
} as const;

// Shadow colors
export const shadow = {
  default: '#000000',        // Black shadow
} as const;

// Status colors (for ratings, etc.)
export const status = {
  rating: '#FF6B6B',         // Rating color (same as restaurants)
  cuisine: '#4ECDC4',        // Cuisine color (same as hotels)
  website: '#45B7D1',        // Website link color (same as tourist places)
} as const;

// Export all colors as a single object for easy importing
const colors = {
  primary,
  category,
  text,
  background,
  border,
  shadow,
  status,
} as const;

export default colors;