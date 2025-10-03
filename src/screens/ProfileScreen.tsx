import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaWrapper } from '../components/SafeAreaWrapper';
import colors from '../themes/colors';
import styles from '../styles/screens/ProfileScreenStyles';
import { verticalScale } from '../themes/styleConfig';
import { useNavigation } from '@react-navigation/native';

interface ProfileScreenProps {}

export const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const navigation = useNavigation<any>()
  const profileOptions = [
    { title: 'Settings', icon: '⚙️', action: () => navigation.navigate('Settings') },
    { title: 'Help & Support', icon: '❓', action: () => {} },
    { title: 'About', icon: 'ℹ️', action: () => {} },
    { title: 'Rate App', icon: '⭐', action: () => {} },
  ];

  const renderProfileOption = (
    option: (typeof profileOptions)[0],
    index: number,
  ) => (
    <TouchableOpacity
      key={index}
      style={styles.optionItem}
      onPress={option.action}
    >
      <Text style={styles.optionIcon}>{option.icon}</Text>
      <Text style={styles.optionTitle}>{option.title}</Text>
      <Text style={styles.optionArrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaWrapper
      backgroundColor={colors.background.secondary}
      barStyle="dark-content"
    >
      <ScrollView style={{flex:1,paddingBottom:verticalScale(70)}} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.profileImage}>
            <Text style={styles.profileEmoji}>👤</Text>
          </View>
          <Text style={styles.name}>City Explorer User</Text>
          <Text style={styles.email}>user@cityexplorer.com</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Favourites</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Places Visited</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Account</Text>
          {profileOptions.map(renderProfileOption)}
        </View>

        <View style={styles.footer}>
          <Text style={styles.version}>City Explorer v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};
