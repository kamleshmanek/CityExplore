import { useState, useEffect } from 'react';
import { fontAssets } from '../themes/fonts';

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontError, setFontError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeFonts = async () => {
      try {
        // Fonts are now loaded at module level via fontAssets
        console.log('Font assets loaded:', fontAssets.length);
        setFontsLoaded(true);
        console.log('Custom fonts initialized successfully');
      } catch (error) {
        console.error('Error initializing fonts:', error);
        setFontError(error as Error);
        // Continue with app even if fonts fail
        setFontsLoaded(true);
      }
    };

    initializeFonts();
  }, []);

  return { fontsLoaded, fontError };
};
