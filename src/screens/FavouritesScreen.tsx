import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { PlaceCard } from '../components/PlaceCard';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { useFavorites } from '../hooks/useFavorites';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import colors from '../themes/colors';

type FavouritesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlaceDetail'>;

export const FavouritesScreen = () => {
  const { favorites } = useFavorites() as { favorites: any[] };
  const navigation = useNavigation<FavouritesScreenNavigationProp>();

  const handlePlacePress = (place: any) => {
    navigation.navigate('PlaceDetail', { place });
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>❤️</Text>
      <Text style={styles.emptyTitle}>No Favourites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start exploring and add places to your favourites!
      </Text>
    </View>
  );

  const renderFavourite = ({ item }: { item: any }) => {
    const place = {
      ...item,
      properties: {
        ...item.properties,
        place_id: item.properties?.place_id || item.id,
        name: item.properties?.name || item.name,
        formatted: item.properties?.formatted || item.address || '',
        categories: item.properties?.categories || (item.category ? [item.category] : []),
        rating: item.properties?.rating || (item.rating ? Number(item.rating) : undefined),
        cuisine: item.properties?.cuisine || item.cuisine,
        phone: item.properties?.phone || item.phone,
        website: item.properties?.website || item.website,
      },
      geometry: item.geometry || { type: 'Point', coordinates: [0, 0] }
    };
    
    return (
      <View style={styles.cardContainer}>
        <PlaceCard 
          place={place} 
          onPress={() => handlePlacePress(place)}
        />
      </View>
    );
  };

  return (
    <SafeAreaWrapper
      backgroundColor={colors.background.primary}
      barStyle="dark-content"
    >
      <View style={styles.header}>
        <Text style={styles.title}>❤️ Favourites</Text>
        <Text style={styles.subtitle}>Your saved places</Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderFavourite}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text.primary,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  header: {
    padding: 16,
    backgroundColor: colors.background.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
});
