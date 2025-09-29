import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { GeoapifyPlace } from '../types';
import { PlaceCard } from '../components/PlaceCard';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import styles from '../styles/screens/FavouritesScreenStyles';
import colors from '../themes/colors';

interface FavouritesScreenProps {}

export const FavouritesScreen: React.FC<FavouritesScreenProps> = () => {
  const [favourites] = useState<GeoapifyPlace[]>([]);

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>❤️</Text>
      <Text style={styles.emptyTitle}>No Favourites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start exploring and add places to your favourites!
      </Text>
    </View>
  );

  const renderFavourite = ({ item }: { item: GeoapifyPlace }) => (
    <PlaceCard place={item} />
  );

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
        data={favourites}
        renderItem={renderFavourite}
        keyExtractor={(item, index) =>
          `${item.properties.place_id || item.properties.osm_id || index}`
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaWrapper>
  );
};
