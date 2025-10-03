import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert, ViewStyle, StyleSheet, Platform } from 'react-native';
import { GeoapifyPlace } from '../types';
import styles from '../styles/screens/PlaceCardStyles';
import FavoriteButton from './FavoriteButton';

interface PlaceCardProps {
  place: GeoapifyPlace;
  onPress?: (place: GeoapifyPlace) => void;
  containerStyle?: ViewStyle;
}

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  touchable: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress, containerStyle }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(place);
    }
  };

const Property ={
  id: place.properties.place_id || String(Math.random()),
  ...place
}

const handleCall = () => {
  if (place.properties.phone) {
    const phoneNumber = place.properties.phone.replace(/\s+/g, '');
    const url = Platform.OS === 'ios' ? `telprompt:${phoneNumber}` : `tel:${phoneNumber}`;
    
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert(
            'Error',
            'Phone calls are not supported on this device'
          );
        }
      })
      .catch(err => console.error('Error opening phone dialer:', err));
  }
};


  const handleWebsite = () => {
    let url = place?.properties?.website;
    if (!url) {
      Alert.alert('Error', 'No website found');
      return;
    }
  
    url = url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
  
    try {
      url = encodeURI(url);
    } catch {}
    Linking.openURL(url)
      .catch(err => {
        console.error('Error opening website:', err, url);
        Alert.alert('Error', 'Failed to open website');
      });
  };

  const getRatingStars = (rating?: number) => {
    if (!rating) return null;
    const stars = Math.round(rating);
    return '⭐'.repeat(stars);
  };

  return (
    <View style={[localStyles.container, containerStyle]}>
      <TouchableOpacity 
        style={localStyles.touchable}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <View style={localStyles.headerRow}>
            <Text style={styles.name} numberOfLines={1}>
              {place.properties.name || 'Unnamed Place'}
            </Text>
            <FavoriteButton item={Property} size={20} />
          </View>
          {place.properties.rating && (
            <Text style={styles.rating}>
              {getRatingStars(place.properties.rating)}
              {' '}{place.properties.rating}
            </Text>
          )}

          <Text style={styles.address} numberOfLines={2}>
            {place.properties.formatted ||
              place.properties.address_line1 ||
              'Address not available'}
          </Text>

          {place.properties.cuisine && (
            <Text style={styles.cuisine}>
              🍽️ {place.properties.cuisine.join(', ')}
            </Text>
          )}

          <View style={styles.footer}>
            <View style={styles.actions}>
              {place.properties.phone && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleCall}
                >
                  <Text style={styles.actionButtonText}>📞 Call</Text>
                </TouchableOpacity>
              )}
              {place.properties.website && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={handleWebsite}
                >
                  <Text style={styles.actionButtonText}>🌐 Website</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
