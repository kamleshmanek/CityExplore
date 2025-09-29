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
import styles from '../styles/screens/EntertainmentScreenStyles';
import colors from '../themes/colors';
import { useRoute } from '@react-navigation/native';

interface EntertainmentScreenProps {
  city?: string;
}

export const EntertainmentScreen: React.FC<EntertainmentScreenProps> = ({
  city = 'Ahmedabad, India',
}) => {
  // fetch city from route params
  const route = useRoute();
  const [entertainment, setEntertainment] = useState<GeoapifyPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEntertainment = useCallback(
    async (isRefreshing = false) => {
      try {
        if (!isRefreshing) setLoading(true);
        setError(null);

        const data = await apiService.getEntertainment(route.params?.city);
        setEntertainment(data);
      } catch (err) {
        setError('Failed to load entertainment places. Please try again.');
        console.error('Error loading entertainment:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [city],
  );

  useEffect(() => {
    loadEntertainment();
  }, [loadEntertainment]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadEntertainment(true);
  };

  const renderEntertainment = ({ item }: { item: GeoapifyPlace }) => (
    <PlaceCard place={item} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {error || 'No entertainment places found'}
      </Text>
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
            color={colors.category.entertainment}
          />
          <Text style={styles.loadingText}>Loading entertainment...</Text>
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
        <Text style={styles.title}>🎭 Entertainment</Text>
        <Text style={styles.subtitle}>Find fun places to enjoy</Text>
      </View>

      <FlatList
        data={entertainment}
        renderItem={renderEntertainment}
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
