import React, { useState, useCallback, useEffect } from 'react';
import { 
  View, 
  Text, 
  ActivityIndicator, 
  FlatList, 
  RefreshControl, 
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GeoapifyPlace } from '../types';
import { PlaceCard } from '../components/PlaceCard';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import Header from '../components/Header';
import { apiService } from '../services/apiService';

export const CommonScreen: React.FC= () => {
  const [items, setItems] = useState<GeoapifyPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute();
  const navigation = useNavigation<any>();
  const { category, city, title, color, fetchData, emptyMessage, loadingMessage, data } = route.params as {
    category: 'restaurants' | 'hotels' | 'entertainment' | 'healthcare' | 'tourist_places' | 'buildings' | 'populated_places' | 'sport';
    city?: string;
    title: string;
    color: string;
    fetchData: (city?: string) => Promise<GeoapifyPlace[]>;
    emptyMessage?: string;
    loadingMessage?: string;
    data?: any;
  };

  const loadItems = useCallback(
    async (isRefreshing = false) => {
      try {
        if (!isRefreshing) setLoading(true);
        setError(null);
        let data:any
        const city = (route.params as { city?: string })?.city;
        if(category ==="restaurants"){
            data =await apiService.getRestaurants(city);
        }
        else if(category ==="hotels"){
            data =await apiService.getHotels(city);
        }
        else if(category ==="entertainment"){
            data =await apiService.getEntertainment(city);
        }
        else if(category ==="healthcare"){
            data =await apiService.getHealthcare(city);
        }
        else if(category === "tourist_places"){
            data = await apiService.getTouristPlaces(city);
        }
        else if(category === "buildings"){
            data = await apiService.getBuildings(city);
        }
        else if(category === "populated_places"){
            data = await apiService.getPopulatedPlaces(city);
        }
        else if(category === "sport"){
            data = await apiService.getSports(city);
        }
        setItems(data);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error(`Error loading ${category}:`, err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [fetchData, route.params, category]
  );

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadItems(true);
  };
const handlePlacePress = (place:any) => {
  navigation.navigate('PlaceDetail', { place });
}

const handleEndReached = () => {
}

  const renderItem = ({ item }: { item: GeoapifyPlace }) => (
    <PlaceCard onPress={() => handlePlacePress(item)} place={item} containerStyle={{ shadowColor: color }} />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: color }]}>
        {error || emptyMessage}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaWrapper backgroundColor="#FFFFFF" barStyle="dark-content">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={color} />
          <Text style={[styles.loadingText, { color }]}>{loadingMessage}</Text>
        </View>
      </SafeAreaWrapper>
    );
  }

  return (
    <SafeAreaWrapper backgroundColor="#FFFFFF" barStyle="dark-content">
      <Header 
        containerStyle={{ backgroundColor: color }}
        title={data?.icon +" "+title?.toUpperCase()}
      />

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          `${item.properties.place_id || item.properties.osm_id || index}`
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            tintColor={color}
          />
        }
        ListEmptyComponent={renderEmpty}
        onEndReached={handleEndReached}
      />
    </SafeAreaWrapper>
  )
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 70,
  },
} as const);
