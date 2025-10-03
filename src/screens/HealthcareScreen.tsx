import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { GeoapifyPlace } from '../types';
import { apiService } from '../services/apiService';
import { PlaceCard } from '../components/PlaceCard';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { useRoute } from '@react-navigation/native';
import colors from '../themes/colors';
import styles from '../styles/screens/HealthcareScreenStyles';
import Header from '../components/Header';

interface HealthcareScreenProps {
  city?: string;
}

export const HealthcareScreen: React.FC<HealthcareScreenProps> = ({
  city = 'Ahmedabad, India',
}) => {
  // fetch city from route params
  const route = useRoute();
  const [healthcare, setHealthcare] = useState<GeoapifyPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHealthcare = useCallback(
    async (isRefreshing = false) => {
      try {
        if (!isRefreshing) setLoading(true);
        setError(null);

        const data = await apiService.getHealthcare(route.params?.city);
        setHealthcare(data);
      } catch (err) {
        setError('Failed to load healthcare places. Please try again.');
        console.error('Error loading healthcare:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [city],
  );

  useEffect(() => {
    loadHealthcare();
  }, [loadHealthcare]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadHealthcare(true);
  };

  const renderHealthcare = ({ item }: { item: GeoapifyPlace }) => (
    <PlaceCard place={item} containerStyle={{shadowColor:colors.category.healthcare}}/>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        {error || 'No healthcare places found'}
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
          <ActivityIndicator size="large" color={colors.category.healthcare} />
          <Text style={styles.loadingText}>Loading healthcare...</Text>
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
        <Text style={styles.title}>🏥 Healthcare</Text>
        <Text style={styles.subtitle}>
          Find medical facilities and services
        </Text>
      </View> */}
      <Header 
      containerStyle={{backgroundColor:colors.category.healthcare }}
        title="Healthcare"
      />

      <FlatList
        data={healthcare}
        renderItem={renderHealthcare}
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
