import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const REVERSE_GEOCODE_URL =
  'https://api.bigdatacloud.net/data/reverse-geocode-client';

// ask permission
const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

// wrap geolocation in promise
const getPosition = (): Promise<Geolocation.GeoPosition> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      pos => resolve(pos),
      err => reject(err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });
};

// exported function
export const getCurrentCity = async (): Promise<string> => {
  try {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return 'Ahmedabad, India';

    const position = await getPosition();

    const response = await fetch(
      `${REVERSE_GEOCODE_URL}?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`,
    );

    if (!response.ok) throw new Error('Failed to fetch city');

    const data = await response.json();
    return data?.city || 'Ahmedabad, India';
  } catch (e) {
    console.log('getCurrentCity error:', e);
    return 'Ahmedabad, India';
  }
};
