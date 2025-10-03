import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import colors from '../themes/colors';
import { HomeScreen } from '../screens/HomeScreen';
import { RestaurantsScreen } from '../screens/RestaurantsScreen';
import { HotelsScreen } from '../screens/HotelsScreen';
import { TouristPlacesScreen } from '../screens/TouristPlacesScreen';
import { HealthcareScreen } from '../screens/HealthcareScreen';
import { EntertainmentScreen } from '../screens/EntertainmentScreen';
import { FavouritesScreen } from '../screens/FavouritesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { CommonScreen } from '../screens/CommonScreen';
import { PlaceDetailScreen } from '../screens/PlaceDetailScreen';
import { scale, verticalScale } from '../themes/styleConfig';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  PlaceDetail: { place: any };
  Settings: any;
};

export type RootTabParamList = {
  Explore: undefined;
  Favourites: undefined;
  Profile: undefined;
};

export type ExploreStackParamList = {
  Home: undefined;
  Restaurants: { city?: string };
  Hotels: { city?: string };
  Healthcare: { city?: string };
  Entertainment: { city?: string };
  TouristPlaces: { city?: string };
  CommonScreen: any;
};

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color, lineHeight: size * 1.2 }}>🏠</Text>
);

const FavouritesIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color, lineHeight: size * 1.2 }}>❤️</Text>
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color, lineHeight: size * 1.2 }}>👤</Text>
);

const ExploreStack = createStackNavigator<ExploreStackParamList>();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="Home" component={HomeScreen} />
      <ExploreStack.Screen name="Restaurants" component={RestaurantsScreen} />
      <ExploreStack.Screen name="Hotels" component={HotelsScreen} />
      <ExploreStack.Screen name="Healthcare" component={HealthcareScreen} />
      <ExploreStack.Screen
        name="Entertainment"
        component={EntertainmentScreen}
      />
      <ExploreStack.Screen
        name="TouristPlaces"
        component={TouristPlacesScreen}
      />
      <ExploreStack.Screen name="CommonScreen" component={CommonScreen} />
    </ExploreStack.Navigator>
  );
}

const Tab = createBottomTabNavigator<RootTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.category.restaurants,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border.medium,
          borderTopWidth: 1,
          paddingBottom: verticalScale(5),
          paddingTop: verticalScale(5),
          height: verticalScale(65),
          borderTopLeftRadius: scale(25),
          borderTopRightRadius: scale(25),
          shadowColor: colors.shadow.default,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.4,
          shadowRadius: scale(15),
          elevation: scale(15),
          position: 'absolute',
          left: scale(15),
          right: scale(15),
          bottom: verticalScale(15),
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreNavigator}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: HomeIcon,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{ tabBarLabel: 'Favourites', tabBarIcon: FavouritesIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile', tabBarIcon: ProfileIcon }}
      />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="PlaceDetail"
          component={PlaceDetailScreen}
          options={({ route }) => ({
            title: route.params.place?.properties?.name || 'Place Details',
          })}
        />
        <RootStack.Screen
          name="Settings"
          component={SettingsScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
