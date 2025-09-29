import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SafeAreaWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  statusBarBackgroundColor?: string;
}

export const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  backgroundColor = '#FFFFFF',
  barStyle = 'dark-content',
  statusBarBackgroundColor,
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={statusBarBackgroundColor || backgroundColor}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
