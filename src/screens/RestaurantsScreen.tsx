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
import Header from '../components/Header';
import styles from '../styles/screens/RestaurantsScreenStyles';
import { useRoute } from '@react-navigation/native';

interface RestaurantsScreenProps {
  city?: string;
}

export const RestaurantsScreen: React.FC<RestaurantsScreenProps> = ({
  city = 'Ahmedabad, India',
}) => {
  // fetch city from route params
  const route = useRoute();
  const [restaurants, setRestaurants] = useState<GeoapifyPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRestaurants = useCallback(
    async (isRefreshing = false) => {
      try {
        if (!isRefreshing) setLoading(true);
        setError(null);

        const data = await apiService.getRestaurants(route.params?.city);
        setRestaurants(data);
      } catch (err) {
        setError('Failed to load restaurants. Please try again.');
        console.error('Error loading restaurants:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [city],
  );

  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadRestaurants(true);
  };

  const renderRestaurant = ({ item }: { item: GeoapifyPlace }) => (
    <PlaceCard place={item} containerStyle={{shadowColor: "#FF6B6B"}} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{error || 'No restaurants found'}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaWrapper backgroundColor="#FFFFFF" barStyle="dark-content">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
          <Text style={styles.loadingText}>Loading restaurants...</Text>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper backgroundColor="#FFFFFF" barStyle="dark-content">
        <Header 
        containerStyle={{backgroundColor:"#FF6B6B" }}
          title=" Restaurants"
        />

      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
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
