import React from 'react';
import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import { GeoapifyPlace } from '../types';
import styles from '../styles/screens/PlaceCardStyles';

interface PlaceCardProps {
  place: GeoapifyPlace;
  onPress?: (place: GeoapifyPlace) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  const handlePress = () => {
    if (onPress) {
      onPress(place);
    }
  };

  const handleCall = () => {
    if (place.properties.phone) {
      const phoneNumber = place.properties.phone.replace(/\s+/g, '');
      Linking.canOpenURL(`tel:${phoneNumber}`)
        .then(supported => {
          if (supported) {
            Linking.openURL(`tel:${phoneNumber}`);
          } else {
            Alert.alert(
              'Error',
              'Phone calls are not supported on this device',
            );
          }
        })
        .catch(err => console.error('Error opening phone dialer:', err));
    }
  };

  const handleWebsite = () => {
    if (place.properties.website) {
      Linking.canOpenURL(place.properties.website)
        .then(supported => {
          if (supported) {
            Linking.openURL(place.properties.website!);
          } else {
            Alert.alert('Error', 'Cannot open this website');
          }
        })
        .catch(err => console.error('Error opening website:', err));
    }
  };

  const getRatingStars = (rating?: number) => {
    if (!rating) return null;
    const stars = Math.round(rating);
    return '⭐'.repeat(stars);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {place.properties.name || 'Unknown Place'}
          </Text>
          {place.properties.rating && (
            <Text style={styles.rating}>
              {getRatingStars(place.properties.rating)}{' '}
              {place.properties.rating}
            </Text>
          )}
        </View>

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
  );
};
