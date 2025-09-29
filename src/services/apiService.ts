import { text } from '../themes/colors';
import { GeoapifyResponse, GeoapifyPlace, GeoapifyFeature, GeoapifyAutocompleteResponse, CitySuggestion } from '../types';

const GEOAPIFY_BASE_URL = 'https://api.geoapify.com/v2/places';
const GEOCODE_BASE_URL = 'https://api.geoapify.com/v1/geocode/search';
const API_KEY = '9b86ceaad8f4473f96821661785dacb5'; // TODO: Replace with actual API key

interface BBox {
  lon1: number;
  lat1: number;
  lon2: number;
  lat2: number;
}

export const apiService = {
  // Step 1: Get bounding box (bbox) for city
  async getCityRect(city: string): Promise<BBox> {
    console.log('city', city);
    try {
      const response = await fetch(
        `${GEOCODE_BASE_URL}?text=${encodeURIComponent(city)}&type=city&format=json&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Geocoding error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error(`City not found: ${city}`);
      }

      const bbox = data.results[0].bbox;
      const result = {
        lon1: bbox.lon1,
        lat1: bbox.lat1,
        lon2: bbox.lon2,
        lat2: bbox.lat2
      };
      return result;
    } catch (error) {
      console.error('Error getting city bounding box:', error);
      throw error;
    }
  },

  // Step 2: Fetch restaurants/cafes in that rect
  async getRestaurants(city: string = 'Ahmedabad, India', limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const bbox = await this.getCityRect(city);
      const rect = `${bbox.lon1},${bbox.lat2},${bbox.lon2},${bbox.lat1}`;
      const url = `${GEOAPIFY_BASE_URL}?categories=catering.restaurant,catering.cafe&filter=rect:${rect}&limit=${limit}&apiKey=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      throw error;
    }
  },
  async getHotels(city: string = 'Ahmedabad, India', limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const bbox = await this.getCityRect(city);
      const rect = `${bbox.lon1},${bbox.lat2},${bbox.lon2},${bbox.lat1}`;
      const url = `${GEOAPIFY_BASE_URL}?categories=accommodation.hotel&filter=rect:${rect}&limit=${limit}&apiKey=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error fetching hotels:', error);
      throw error;
    }
  },

  async getHealthcare(city: string = 'Ahmedabad, India', limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const bbox = await this.getCityRect(city);
      const rect = `${bbox.lon1},${bbox.lat2},${bbox.lon2},${bbox.lat1}`;
      const url = `${GEOAPIFY_BASE_URL}?categories=healthcare&filter=rect:${rect}&limit=${limit}&apiKey=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error fetching healthcare places:', error);
      throw error;
    }
  },

  async getEntertainment(city: string = 'Ahmedabad, India', limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const bbox = await this.getCityRect(city);
      const rect = `${bbox.lon1},${bbox.lat2},${bbox.lon2},${bbox.lat1}`;
      const url = `${GEOAPIFY_BASE_URL}?categories=entertainment&filter=rect:${rect}&limit=${limit}&apiKey=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error fetching entertainment places:', error);
      throw error;
    }
  },

  async getTouristPlaces(city: string = 'Ahmedabad, India', limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const bbox = await this.getCityRect(city);
      const rect = `${bbox.lon1},${bbox.lat2},${bbox.lon2},${bbox.lat1}`;
      const url = `${GEOAPIFY_BASE_URL}?categories=tourism.sights&filter=rect:${rect}&limit=${limit}&apiKey=${API_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error fetching tourist places:', error);
      throw error;
    }
  },

  async searchPlaces(query: string, categories: string[] = [], city: string = 'Ahmedabad, India', limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const bbox = await this.getCityRect(city);
      const rect = `${bbox.lon1},${bbox.lat2},${bbox.lon2},${bbox.lat1}`;
      const categoriesParam = categories.length > 0 ? `&categories=${categories.join(',')}` : '&categories=catering.restaurant';
      const url = `${GEOAPIFY_BASE_URL}?text=${encodeURIComponent(query)}${categoriesParam}&filter=rect:${rect}&limit=${limit}&apiKey=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error searching places:', error);
      throw error;
    }
  },

  // Helper method to get places by bounding box directly
  async getPlacesByLocation(lon1: number, lat1: number, lon2: number, lat2: number, categories: string[] = ['catering.restaurant'], limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const categoriesParam = categories.join(',');
      const response = await fetch(
        `${GEOAPIFY_BASE_URL}?categories=${categoriesParam}&filter=rect:${lon1},${lat1},${lon2},${lat2}&limit=${limit}&apiKey=${API_KEY}`
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error Response:', errorData);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error fetching places by location:', error);
      throw error;
    }
  },
  // City autocomplete for search suggestions
  async getCitySuggestions(text: string, limit: number = 5): Promise<CitySuggestion[]> {
    if (text.length < 2) {
      return [];
    }

    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          text,
        )}&apiKey=${API_KEY}`,
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Geocoding error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyAutocompleteResponse = await response.json();
      console.log('City suggestions data:', data);

      if (data.features && data.features.length > 0) {
        const suggestions: CitySuggestion[] = data.features.slice(0, limit).map(feature => ({
          feature,
          displayName: feature.properties.formatted ||
                      feature.properties.city ||
                      feature.properties.name ||
                      'Unknown City'
        }));
        return suggestions;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      throw error;
    }
  },
};
