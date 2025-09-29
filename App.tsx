/**
 * City Explorer App
 * A React Native app for exploring restaurants, hotels, and tourist places
 */

import React, { useEffect } from 'react';
import {
  StatusBar,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';

// Import fonts to ensure they're bundled
import './src/themes/fonts';

function App() {
  const [fontsReady, setFontsReady] = React.useState(false);

  useEffect(() => {
    // Simple timeout to ensure fonts are loaded
    const timer = setTimeout(() => {
      setFontsReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!fontsReady) {
    return (
      <SafeAreaProvider>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ECDC4" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default App;
