import React, { useState, useCallback, useRef } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CategoryCard } from '../components/CategoryCard';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import colors from '../themes/colors';
import styles from '../styles/screens/HomeScreenStyles';
import { apiService } from '../services/apiService';

const MIN_SEARCH_LENGTH = 2;
const MAX_SUGGESTIONS = 5;
const SEARCH_DEBOUNCE_MS = 300;
const DEFAULT_CITY = 'Ahmedabad, India';

// Types
interface GeoapifyFeature {
  properties: {
    formatted?: string;
    city?: string;
    name?: string;
    place_id?: string;
  };
}

interface GeoapifyResponse {
  features: GeoapifyFeature[];
}

interface CitySuggestion {
  feature: GeoapifyFeature;
  displayName: string;
}

interface HomeScreenProps {}

interface Category {
  id: string;
  name: string;
  icon: string;
  category: string;
  color: string;
}

type ExploreStackParamList = {
  Home: undefined;
  Restaurants: { city?: string };
  Hotels: { city?: string };
  Healthcare: { city?: string };
  Entertainment: { city?: string };
  TouristPlaces: { city?: string };
};

type HomeScreenNavigationProp = StackNavigationProp<
  ExploreStackParamList,
  'Home'
>;

const categories: Category[] = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    icon: '🍽️',
    category: 'catering.restaurant',
    color: colors.category.restaurants,
  },
  {
    id: 'hotels',
    name: 'Hotels',
    icon: '🏨',
    category: 'accommodation.hotel',
    color: colors.category.hotels,
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    icon: '🎭',
    category: 'entertainment',
    color: colors.category.entertainment,
  },
  {
    id: 'tourist_places',
    name: 'Tourist Places',
    icon: '🏛️',
    category: 'tourism.sights',
    color: colors.category.touristPlaces,
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    category: 'healthcare',
    color: colors.category.healthcare,
  },
];

export const HomeScreen: React.FC<HomeScreenProps> = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [currentCity, setCurrentCity] = useState(DEFAULT_CITY);
  const [showCityModal, setShowCityModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceTimerRef = useRef<number | null>(null);

  const fetchCitySuggestions = useCallback(
    async (text: string): Promise<void> => {
      if (text.length < MIN_SEARCH_LENGTH) {
        setCitySuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const suggestions = await apiService.getCitySuggestions(
          text,
          MAX_SUGGESTIONS,
        );
        setCitySuggestions(suggestions);
      } catch (error) {
        console.error('Error fetching city suggestions:', error);
        Alert.alert(
          'Search Error',
          'Unable to fetch city suggestions. Please check your connection and try again.',
          [{ text: 'OK' }],
        );
        setCitySuggestions([]);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const handleSearchTextChange = useCallback(
    (text: string) => {
      setSearchText(text);

      // Clear previous debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new debounce timer
      debounceTimerRef.current = setTimeout(() => {
        fetchCitySuggestions(text);
      }, SEARCH_DEBOUNCE_MS);
    },
    [fetchCitySuggestions],
  );

  const selectCity = useCallback((suggestion: CitySuggestion) => {
    console.log('Selected city:', suggestion.displayName);

    setCurrentCity(suggestion.displayName);
    setShowCityModal(false);
    setSearchText('');
    setCitySuggestions([]);

    // Clear debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
  }, []);

  // Screen name mapping for better maintainability
  const screenMapping: Record<string, keyof ExploreStackParamList> = {
    restaurants: 'Restaurants',
    hotels: 'Hotels',
    healthcare: 'Healthcare',
    entertainment: 'Entertainment',
    tourist_places: 'TouristPlaces',
  };

  const handleCategoryPress = useCallback(
    (category: Category) => {
      console.log(
        'Selected category:',
        category.name,
        'for city:',
        currentCity,
      );
      const screenName = screenMapping[category.id];

      if (screenName) {
        (navigation as any).navigate(screenName, { city: currentCity });
      } else {
        console.warn('No screen mapping found for category:', category.id);
      }
    },
    [currentCity, navigation],
  );

  const renderCitySuggestion = ({ item }: { item: CitySuggestion }) => (
    <TouchableOpacity
      style={styles.citySuggestion}
      onPress={() => selectCity(item)}
      accessibilityLabel={`Select city ${item.displayName}`}
      accessibilityRole="button"
    >
      <Text style={styles.citySuggestionText}>{item.displayName}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper
      backgroundColor={colors.background.primary}
      barStyle="dark-content"
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>City Explorer</Text>
          <TouchableOpacity
            style={styles.citySelector}
            onPress={() => setShowCityModal(true)}
            accessibilityLabel={`Current city: ${currentCity}. Tap to change`}
            accessibilityRole="button"
          >
            <Text style={styles.cityText}>{currentCity}</Text>
            <Text style={styles.cityIcon}>📍</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          Discover amazing places in your city
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            category={category}
            onPress={handleCategoryPress}
          />
        ))}
      </View>

      {/* City Selection Modal */}
      <Modal
        visible={showCityModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCityModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select City</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search for a city..."
              value={searchText}
              onChangeText={handleSearchTextChange}
              autoFocus={true}
              accessibilityLabel="City search input"
              accessibilityHint="Type to search for cities"
            />

            {loading && (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Searching...</Text>
              </View>
            )}

            <FlatList
              data={citySuggestions}
              renderItem={renderCitySuggestion}
              keyExtractor={(item, index) =>
                `${item.feature.properties.place_id || index}`
              }
              style={styles.suggestionsList}
              showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCityModal(false)}
              accessibilityLabel="Close city selection modal"
              accessibilityRole="button"
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaWrapper>
  );
};
