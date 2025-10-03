import { GeoapifyResponse, GeoapifyPlace, CitySuggestion, GeoapifyAutocompleteResponse } from '../types';

const GEOAPIFY_BASE_URL = 'https://api.geoapify.com/v2/places';
const GEOCODE_BASE_URL = 'https://api.geoapify.com/v1/geocode/search';
const API_KEY = '9b86ceaad8f4473f96821661785dacb5'; // TODO: Replace with actual API key

interface BBox {
  lon1: number;
  lat1: number;
  lon2: number;
  lat2: number;
}

// Export the API service
export const apiService = {
  // Get detailed information about a specific place by its ID
  async getPlaceDetails(placeId: string): Promise<GeoapifyPlace> {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v2/place-details?id=${encodeURIComponent(placeId)}&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Error getting place details: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching place details:', error);
      throw error;
    }
  },

  // Step 1: Get bounding box (bbox) for city
  async getCityRect(city: string): Promise<BBox> {
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
      return {
        lon1: bbox.lon1,
        lat1: bbox.lat1,
        lon2: bbox.lon2,
        lat2: bbox.lat2
      };
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

  async getBuildings(city: string = 'Ahmedabad, India', limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const bbox = await this.getCityRect(city);
      const rect = `${bbox.lon1},${bbox.lat2},${bbox.lon2},${bbox.lat1}`;
      const url = `${GEOAPIFY_BASE_URL}?categories=building&filter=rect:${rect}&limit=${limit}&apiKey=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error fetching buildings:', error);
      throw error;
    }
  },

  async getSports(city: string = 'Ahmedabad, India', limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const bbox = await this.getCityRect(city);
      const categories = [
        'sport.dive_centre',
        'sport.fitness',
        'sport.fitness.fitness_centre',
        'sport.fitness.fitness_station',
        'sport.horse_riding',
        'sport.ice_rink',
        'sport.pitch',
        'sport.sports_centre',
        'sport.stadium',
        'sport.swimming_pool',
        'sport.track'
      ];

      const response = await fetch(
        `${GEOAPIFY_BASE_URL}?categories=${categories.join(',')}&filter=rect:${bbox.lon1},${bbox.lat1},${bbox.lon2},${bbox.lat2}&limit=${limit}&apiKey=${API_KEY}`
      );
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Error fetching sports: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }
      
      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error fetching sports:', error);
      throw error;
    }
  },

  async getPopulatedPlaces(city: string = 'Ahmedabad, India', limit: number = 20): Promise<GeoapifyPlace[]> {
    try {
      const bbox = await this.getCityRect(city);
      const rect = `${bbox.lon1},${bbox.lat2},${bbox.lon2},${bbox.lat1}`;
      const categories = [
        'populated_place',
        'populated_place.city',
        'populated_place.town',
        'populated_place.village',
        'populated_place.hamlet',
        'populated_place.suburb',
        'populated_place.neighbourhood'
      ].join(',');
      
      const url = `${GEOAPIFY_BASE_URL}?categories=${categories}&filter=rect:${rect}&limit=${limit}&apiKey=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
      }

      const data: GeoapifyResponse = await response.json();
      return data.features;
    } catch (error) {
      console.error('Error fetching populated places:', error);
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
