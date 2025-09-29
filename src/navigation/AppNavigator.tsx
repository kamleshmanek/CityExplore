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
import { scale, verticalScale, moderateScale } from '../themes/styleConfig';

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
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color }}>🏠</Text>
);

const FavouritesIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color }}>❤️</Text>
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Text style={{ fontSize: size, color }}>👤</Text>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
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
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.4,
            shadowRadius: scale(15),
            elevation: scale(15),
            position: 'absolute',
            left: scale(15),
            right: scale(15),
            bottom: verticalScale(15),
          },
          headerStyle: {
            backgroundColor: colors.text.primary,
          },
          headerTintColor: colors.background.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
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
          options={{
            tabBarLabel: 'Favourites',
            tabBarIcon: FavouritesIcon,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ProfileIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Create a stack navigator for the Explore tab
const ExploreStack = createStackNavigator<ExploreStackParamList>();

function ExploreNavigator() {
  return (
    <ExploreStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.text.primary,
        },
        headerTintColor: colors.background.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <ExploreStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'City Explorer',
          headerTitleAlign: 'center',
        }}
      />
      <ExploreStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          title: 'Restaurants',
        }}
      />
      <ExploreStack.Screen
        name="Hotels"
        component={HotelsScreen}
        options={{
          title: 'Hotels',
        }}
      />
      <ExploreStack.Screen
        name="Healthcare"
        component={HealthcareScreen}
        options={{
          title: 'Healthcare',
        }}
      />
      <ExploreStack.Screen
        name="Entertainment"
        component={EntertainmentScreen}
        options={{
          title: 'Entertainment',
        }}
      />
      <ExploreStack.Screen
        name="TouristPlaces"
        component={TouristPlacesScreen}
        options={{
          title: 'Tourist Places',
        }}
      />
    </ExploreStack.Navigator>
  );
}
