import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Switch, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const SettingsScreen = () => {
  const { colors } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleSwitch = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  const navigateToScreen = (screenName: string) => {
    console.log(`Navigating to ${screenName}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <Text style={[styles.username, { color: colors.text }]}>John Doe</Text>
            <Text style={[styles.email, { color: colors.text }]}>john.doe@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => navigateToScreen('EditProfile')}>
            <Ionicons name="pencil" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Notifications */}
        <View style={styles.optionItem}>
          <View style={styles.optionLeft}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} style={styles.optionIcon} />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Notifications
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={notificationsEnabled ? '#f5f5f5' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={notificationsEnabled}
          />
        </View>

        {/* Privacy & Security */}
        <TouchableOpacity 
          style={styles.optionItem}
          onPress={() => navigateToScreen('PrivacySecurity')}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="shield-checkmark-outline" size={24} color={colors.text} style={styles.optionIcon} />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Privacy & Security
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionItem}
          onPress={() => navigateToScreen('About')}
        >
          <View style={styles.optionLeft}>
            <Ionicons name="information-circle-outline" size={24} color={colors.text} style={styles.optionIcon} />
            <View>
              <Text style={[styles.optionText, { color: colors.text }]}>
                About
              </Text>
              <Text style={[styles.optionSubtext, { color: colors.text }]}>
                Version 1.0.0
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: colors.card }]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#e1e1e1',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    opacity: 0.7,
  },
  editButton: {
    padding: 8,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 16,
    opacity: 0.8,
  },
  optionText: {
    fontSize: 16,
  },
  optionSubtext: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 'auto',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.2)',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SettingsScreen;
