// Font loading - simplified approach for React Native
// In React Native, fonts are automatically loaded when required in styles
// This ensures all font files are included in the bundle

// Force inclusion of all font files in the bundle
const fontAssets = [
  require('../assets/fonts/Manrope-Regular.ttf'),
  require('../assets/fonts/Manrope-Medium.ttf'),
  require('../assets/fonts/Manrope-Bold.ttf'),
  require('../assets/fonts/Manrope-Light.ttf'),
  require('../assets/fonts/Manrope-SemiBold.ttf'),
  require('../assets/fonts/Manrope-ExtraLight.ttf'),
  require('../assets/fonts/Manrope-ExtraBold.ttf'),
];

// Font family names - these should match the font file names exactly
const fonts = {
  regular: 'Manrope-Regular',
  medium: 'Manrope-Medium',
  bold: 'Manrope-Bold',
  light: 'Manrope-Light',
  semiBold: 'Manrope-SemiBold',
  extraLight: 'Manrope-ExtraLight',
  extraBold: 'Manrope-ExtraBold',
};

export default fonts;

// Export font assets for verification
export { fontAssets };
