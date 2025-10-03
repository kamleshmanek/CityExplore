import React from 'react';
import { apiService } from '../services/apiService';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { GeoapifyPlace } from '../types';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import { scale, verticalScale } from '../themes/styleConfig';
import colors from '../themes/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatBusinessHours } from '../services/formatBusinessHours';
import Header from '../components/Header';

// Format opening hours string into a more readable format
interface FormattedHours {
  days: string;
  hours: string;
}

const formatOpeningHours = (openingHours: string): FormattedHours[] => {
  if (!openingHours) return [];

  // Split the string into day groups
  const dayGroups = openingHours.split(';').map(group => group.trim());
  const formattedHours: FormattedHours[] = [];

  const dayMap = {
    Mo: 'Monday',
    Tu: 'Tuesday',
    We: 'Wednesday',
    Th: 'Thursday',
    Fr: 'Friday',
    Sa: 'Saturday',
    Su: 'Sunday',
  };

  for (const group of dayGroups) {
    if (!group) continue;

    const [days, hours] = group.split(' ');
    if (!days || !hours) continue;

    // Handle day ranges (e.g., "Mo-Th")
    if (days.includes('-')) {
      const [startDay, endDay] = days.split('-');
      const startIndex = Object.keys(dayMap).indexOf(startDay);
      const endIndex = Object.keys(dayMap).indexOf(endDay);

      if (startIndex !== -1 && endIndex !== -1) {
        const dayRange = Object.values(dayMap).slice(startIndex, endIndex + 1);
        const daysText = `${dayRange[0]} - ${dayRange[dayRange.length - 1]}`;
        formattedHours.push({ days: daysText, hours: hours });
      }
    } else {
      // Single day
      const dayName = dayMap[days as keyof typeof dayMap] || days;
      formattedHours.push({ days: dayName, hours: hours });
    }
  }

  return formattedHours;
};

type RootStackParamList = {
  PlaceDetail: { place: GeoapifyPlace };
};

interface PlaceProperties {
  name?: string;
  formatted?: string;
  phone?: string;
  rating?: number;
  review_count?: number;
  price_level?: number;
  internet_access?: string;
  opening_hours?: string;
  categories?: string[];
  contact?: {
    phone?: string;
    [key: string]: any;
  };
  facilities?: {
    wheelchair?: string;
    [key: string]: any;
  };
  amenities?: string[];
  [key: string]: any;
}

type PlaceDetailScreenRouteProp = RouteProp<RootStackParamList, 'PlaceDetail'>;
type PlaceDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PlaceDetail'
>;

interface PlaceDetailScreenProps {
  route: PlaceDetailScreenRouteProp;
  navigation: PlaceDetailScreenNavigationProp;
}

const DetailCard = ({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) => {

  const iconColor = '#007AFF';
  const titleColor = '#666';
  const valueColor = '#000';

  return (
    <View style={styles.detailCard}>
      <Icon name={icon} size={20} color={iconColor} style={styles.detailIcon} />
      <View>
        <Text style={[styles.detailTitle, { color: titleColor }]}>{title}</Text>
        <Text style={[styles.detailValue, { color: valueColor }]}>{value}</Text>
      </View>
    </View>
  );
};

export const PlaceDetailScreen: React.FC<PlaceDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { place } = route.params;
  const [placeDetails, setPlaceDetails] = React.useState<GeoapifyPlace | null>(
    null,
  );
  const [_isLoading, setIsLoading] = React.useState(true);
  const [_error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchPlaceDetails = async () => {
      if (!place.properties?.place_id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const details = await apiService.getPlaceDetails(
          place.properties.place_id,
        );
        setPlaceDetails(details);
      } catch (err) {
        console.error('Error fetching place details:', err);
        setError('Failed to load place details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [place.properties?.place_id]);

  const [fallback, setFallback] = React.useState(false);


  const properties: PlaceProperties = {
    ...(placeDetails?.properties || place?.properties || {}),
    phone: placeDetails?.properties?.contact?.phone || place?.properties?.contact?.phone,
    contact: placeDetails?.properties?.contact || place?.properties?.contact,
    facilities: placeDetails?.properties?.facilities || place?.properties?.facilities,
    // Ensure price_level is a number
    price_level: placeDetails?.properties?.price_level || place?.properties?.price_level 
      ? Number(placeDetails?.properties?.price_level || place?.properties?.price_level)
      : undefined,
  };
  console.log(JSON.stringify(properties),"properties=====")
  const rating = typeof properties?.rating === 'number' ? properties.rating : 0;
  const reviewCount = typeof properties?.review_count === 'number' ? properties.review_count : 0;
  const price = typeof properties?.price_level === 'number' 
    ? '$'.repeat(Math.min(4, Math.max(1, properties.price_level)))
    : '$$';

  const categories = properties?.categories
    ?.map(cat => typeof cat === 'string' ? cat.split('.').pop()?.replace(/_/g, ' ') : '')
    ?.filter(Boolean) as string[];

  const features = [
    properties?.internet_access === 'yes' ? 'Free WiFi' : null,
    properties?.facilities?.wheelchair === 'yes' ? 'Wheelchair accessible' : null,
    ...(properties?.amenities?.includes('wifi') ? ['WiFi Available'] : []),
    ...(properties?.amenities?.includes('parking') ? ['Parking Available'] : []),
  ].filter(Boolean) as string[];

  const aboutText =
    properties?.formatted || properties?.name || 'No description available';

  const handleOpenInMaps = () => {
    const lat =
      placeDetails?.geometry?.coordinates?.[1] ||
      place.geometry?.coordinates?.[1];
    const lon =
      placeDetails?.geometry?.coordinates?.[0] ||
      place.geometry?.coordinates?.[0];

    if (lat && lon) {
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
      Linking.openURL(url).catch(err =>
        console.error('Error opening maps:', err),
      );
    } else {
      console.warn('No coordinates available for this location');
    }
  };

  const handleCall = () => {
    const phoneNumber = properties.phone.replace(/[^0-9+]/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleOpenWebsite = () => {
    if (properties.website) {
      let websiteUrl = properties.website;
      if (!websiteUrl.startsWith('http')) {
        websiteUrl = `https://${websiteUrl}`;
      }
      Linking.openURL(websiteUrl).catch(err =>
        console.error('Error opening website:', err),
      );
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Icon key={i} name="star" size={16} color="#FFD700" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Icon key={i} name="star-half" size={16} color="#FFD700" />);
      } else {
        stars.push(
          <Icon key={i} name="star-outline" size={16} color="#FFD700" />,
        );
      }
    }

    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingText}>({reviewCount})</Text>
      </View>
    );
  };

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      {categories.map((category, index) => (
        <View key={index} style={styles.categoryTag}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      ))}
    </View>
  );

  const renderFeatures = () => (
    <View style={styles.featuresContainer}>
      <Text style={styles.sectionTitle}>Features</Text>
      <View style={styles.featuresGrid}>
        {features?.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Icon name="check-circle" size={16} color={colors.primary} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaWrapper>
       <Header 
        leftIconColor="black"
        containerStyle={styles.headerContainer}
        title={properties?.name}
        titleStyle={styles.headerTitle}
      />
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
        <Image
        source={{
          uri: fallback
            ? "https://via.placeholder.com/300x200.png?text=No+Image"
            : properties?.wiki_and_media?.image,
        }}
        style={styles.image}
        resizeMode="cover"
        onError={() => setFallback(true)}
      />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              {/* <Text style={styles.title}>
                {properties.name || 'Place Name'}
              </Text> */}
              <View style={styles.locationContainer}>
                <Icon name="location-on" size={16} color="#007AFF" />
                <Text style={styles.locationText}>
                  {[properties.address_line1, properties.address_line2]
                    .filter(Boolean)
                    .join(', ')}
                </Text>
              </View>
              {
                rating ? renderStars() : null
              }
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{price}</Text>
            </View>
          </View>

          {renderCategories()}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.aboutText}>{aboutText}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Opening Hours</Text>
            {properties.opening_hours ? (
              formatOpeningHours(properties.opening_hours).map(
                (hours, index) => (
                  <View key={index} style={styles.hoursRow}>
                    <Text style={styles.hoursDay}>{hours.days}:</Text>
                    <Text style={styles.hoursTime}>{hours.hours}</Text>
                  </View>
                ),
              )
            ) : (
              <Text style={styles.noHours}>Opening hours not available</Text>
            )}
          </View>

          {features?.length > 0 && renderFeatures()}

          <View style={styles.detailsContainer}>
            {properties.phone ? (
              <View
                style={styles.detailCard}
              >
                <Icon
                  name="phone"
                  size={20}
                  color={colors.primary}
                  style={styles.detailIcon}
                />
                <View>
                  <Text style={styles.detailTitle}>Phone</Text>
                  <TouchableOpacity onPress={() => {
                    const phoneNumber = properties.phone.replace(/[^0-9+]/g, '');
                    Linking.openURL(`tel:${phoneNumber}`);
                  }}>
                  <Text 
                  
                  style={[styles.detailValue, styles.linkText]}>
                    {properties.phone}
                  </Text>
                  </TouchableOpacity>
                 
                </View>
              </View>
            ) : (
              <DetailCard icon="phone" title="Phone" value="Not specified" />
            )}
            <View
              style={styles.detailCard}
            >
              <Icon
                name="language"
                size={20}
                color={colors.primary}
                style={styles.detailIcon}
              />
              <View>
                <Text style={styles.detailTitle}>Website</Text>
                <TouchableOpacity onPress={properties.website ? handleOpenWebsite : undefined}>
                <Text
                  style={[
                    styles.detailValue,
                    properties.website && styles.linkText,
                  ]}
                >
                  {properties.website ? 'Visit Website' : 'Not specified'}
                </Text>
                </TouchableOpacity>
                
              </View>
            </View>
          </View>

          <View style={styles.actionButtons}>
            {(placeDetails?.geometry?.coordinates?.[0] && placeDetails?.geometry?.coordinates?.[1]) || 
             (place?.geometry?.coordinates?.[0] && place?.geometry?.coordinates?.[1]) ? (
              <TouchableOpacity
                style={[styles.actionButton, styles.secondaryButton]}
                onPress={handleOpenInMaps}
              >
                <Icon name="directions" size={20} color={colors.primary} />
                <Text style={[styles.buttonText, styles.directionsText]}>
                  Directions
                </Text>
              </TouchableOpacity>
            ) : null}
            {
              properties?.phone && (
                <TouchableOpacity
                style={[styles.actionButton, styles.primaryButton]}
                onPress={handleCall}
              >
                <Icon name="phone" size={20} color="#FFF" />
                <Text style={[styles.buttonText, styles.callNowText]}>
                  Call Now
                </Text>
              </TouchableOpacity>
              )
            }
           
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    marginBottom: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    padding: 16,
    paddingTop: 44,
  },
  headerTitle: {
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    margin: 16,
    marginHorizontal:20
  },
  
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hoursDay: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  hoursTime: {
    fontSize: 14,
    color: '#666',
  },
  noHours: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  
  imageContainer: {
    height: verticalScale(300),
    width: '100%',
    overflow: 'scroll',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(16),
  },
  title: {
    fontSize: scale(28),
    fontWeight: 'bold',
    color: colors.text?.primary || '#000',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: scale(14),
    color: colors.text?.secondary || '#666',
    marginLeft: 4,
    marginHorizontal:20
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: scale(14),
    color: colors.text?.secondary || '#666',
    marginLeft: 8,
  },
  priceTag: {
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: scale(16),
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: verticalScale(16),
  },
  categoryTag: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: scale(12),
    color: colors.text?.secondary || '#666',
  },
  section: {
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: colors.text?.primary || '#000',
    marginBottom: verticalScale(12),
  },
  aboutText: {
    fontSize: scale(14),
    lineHeight: scale(22),
    color: colors.text?.secondary || '#666',
  },
  featuresContainer: {
    marginBottom: verticalScale(20),
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  featureText: {
    fontSize: scale(14),
    color: colors.text?.secondary || '#666',
    marginLeft: 8,
  },
  detailsContainer: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    padding: scale(16),
    marginBottom: verticalScale(20),
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    width: '100%',
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  detailIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  detailTitle: {
    fontSize: scale(12),
    marginBottom: 2,
  },
  detailValue: {
    fontSize: scale(14),
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(60),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: 12,
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    marginLeft: 12,
  },
  secondaryButton: {
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  buttonText: {
    fontSize: scale(14),
    fontWeight: '600',
    marginLeft: 8,
  },
  directionsText: {
    color: '#007AFF',
  },
  callNowText: {
    color: 'white',
  }
});
