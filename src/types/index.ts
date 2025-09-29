export interface GeoapifyPlace {
  type: string;
  properties: {
    name?: string;
    street?: string;
    housenumber?: string;
    postcode?: string;
    city?: string;
    state?: string;
    country?: string;
    country_code?: string;
    formatted?: string;
    address_line1?: string;
    address_line2?: string;
    categories?: string[];
    details?: string[];
    datasource?: {
      sourcename: string;
      attribution: string;
      license: string;
      url: string;
    };
    distance?: number;
    place_id?: string;
    bbox?: number[];
    website?: string;
    phone?: string;
    opening_hours?: string;
    description?: string;
    email?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    wikidata?: string;
    wikipedia?: string;
    osm_id?: string;
    osm_type?: string;
    tourism?: string;
    historic?: string;
    heritage?: string;
    rating?: number;
    stars?: number;
    price_level?: string;
    cuisine?: string[];
    takeaway?: string;
    delivery?: string;
    outdoor_seating?: boolean;
    indoor_seating?: boolean;
    smoking?: string;
    reservation?: string;
    wheelchair?: string;
    internet_access?: string;
    dog_friendly?: string;
    drive_through?: string;
    drive_in?: string;
    capacity?: number;
    rooms?: number;
    beds?: number;
    check_in?: string;
    check_out?: string;
    payment_options?: string[];
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}

export interface GeoapifyResponse {
  type: string;
  features: GeoapifyPlace[];
  metadata: {
    query: {
      text: string;
      parsed: {
        city: string;
        state: string;
        country: string;
      };
    };
    sources: {
      osm: {
        url: string;
      };
    };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  category: string;
  color: string;
}

export interface GeoapifyFeature {
  type: string;
  properties: {
    formatted?: string;
    city?: string;
    name?: string;
    place_id?: string;
    country?: string;
    state?: string;
    postcode?: string;
    street?: string;
    housenumber?: string;
    lon?: number;
    lat?: number;
  };
  geometry?: {
    type: string;
    coordinates: number[];
  };
}

export interface GeoapifyAutocompleteResponse {
  type: string;
  features: GeoapifyFeature[];
}

export interface CitySuggestion {
  feature: GeoapifyFeature;
  displayName: string;
}
