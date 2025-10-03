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
import styles from '../styles/screens/HotelsScreenStyles';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';

interface HotelsScreenProps {
  city?: string;
}

export const HotelsScreen: React.FC<HotelsScreenProps> = ({
  city = 'Ahmedabad, India',
}) => {
  // fetch city from route params
  const route = useRoute();
  const [hotels, setHotels] = useState<GeoapifyPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHotels = useCallback(
    async (isRefreshing = false) => {
      try {
        if (!isRefreshing) setLoading(true);
        setError(null);

        const data = await apiService.getHotels(route.params?.city);
        setHotels(data);
      } catch (err) {
        setError('Failed to load hotels. Please try again.');
        console.error('Error loading hotels:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [city],
  );

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadHotels(true);
  };

  const renderHotel = ({ item }: { item: GeoapifyPlace }) => (
    <PlaceCard place={item} containerStyle={{shadowColor:colors.category.hotels}} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{error || 'No hotels found'}</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaWrapper
        backgroundColor={colors.background.primary}
        barStyle="dark-content"
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.category.hotels} />
          <Text style={styles.loadingText}>Loading hotels...</Text>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper
      backgroundColor={colors.background.primary}
      barStyle="dark-content"
    >
      {/* <View style={styles.header}>
        <Text style={styles.title}>🏨 Hotels</Text>
        <Text style={styles.subtitle}>Find perfect places to stay</Text>
      </View> */}
      <Header 
      containerStyle={{backgroundColor:colors.category.hotels }}
        title="Hotels"
      />

      <FlatList
        data={hotels}
        renderItem={renderHotel}
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
