import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { GeoapifyPlace } from '../types';
import { apiService } from '../services/apiService';
import { PlaceCard } from '../components/PlaceCard';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import colors from '../themes/colors';
import styles from '../styles/screens/TouristPlacesScreenStyles';
import { useRoute } from '@react-navigation/native';

interface TouristPlacesScreenProps {
  city?: string;
}

export const TouristPlacesScreen: React.FC<TouristPlacesScreenProps> = ({
  city = 'Ahmedabad, India',
}) => {
  // fetch city from route params
  const route = useRoute();
  const [places, setPlaces] = useState<GeoapifyPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTouristPlaces = useCallback(
    async (isRefreshing = false) => {
      try {
        if (!isRefreshing) setLoading(true);
        setError(null);

        const data = await apiService.getTouristPlaces(route.params?.city);
        setPlaces(data);
      } catch (err) {
        setError('Failed to load tourist places. Please try again.');
        console.error('Error loading tourist places:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [city],
  );

  useEffect(() => {
    loadTouristPlaces();
  }, [loadTouristPlaces]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadTouristPlaces(true);
  };

  const renderPlace = ({ item }: { item: GeoapifyPlace }) => (
    <PlaceCard place={item} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{error || 'No tourist places found'}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaWrapper
        backgroundColor={colors.background.primary}
        barStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={colors.category.touristPlaces}
          />
          <Text style={styles.loadingText}>Loading tourist places...</Text>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper
      backgroundColor={colors.background.primary}
      barStyle="dark-content"
    >
      <View style={styles.header}>
        <Text style={styles.title}>🏛️ Tourist Places</Text>
        <Text style={styles.subtitle}>Explore amazing attractions</Text>
      </View>

      <FlatList
        data={places}
        renderItem={renderPlace}
        keyExtractor={(item, index) =>
          `${item.properties.place_id || item.properties.osm_id || index}`
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaWrapper>
  );
};
