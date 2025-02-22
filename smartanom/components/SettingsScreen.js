import React, { useContext } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { DarkModeContext } from '../components//DarkModeContext';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const navigation = useNavigation();

  const styles = getStyles(darkMode);

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons name="arrow-back" size={24} color={darkMode ? '#3498db' : '#3498db'} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      {/* Notification Settings */}
      <View style={styles.settingItem}>
        <Ionicons name="notifications" size={24} color={darkMode ? '#3498db' : '#3498db'} />
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Enable Notifications</Text>
          <Text style={styles.settingDescription}>Receive app notifications</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
          trackColor={{ false: '#bdc3c7', true: '#3498db' }}
          thumbColor="#ffffff"
        />
      </View>

      {/* Dark Mode Settings */}
      <View style={styles.settingItem}>
        <Ionicons name="moon" size={24} color={darkMode ? '#3498db' : '#3498db'} />
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Dark Mode</Text>
          <Text style={styles.settingDescription}>Switch to dark theme</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#bdc3c7', true: '#3498db' }}
          thumbColor="#ffffff"
        />
      </View>

      {/* Account Settings */}
      <View style={styles.settingItem}>
        <Ionicons name="person" size={24} color={darkMode ? '#3498db' : '#3498db'} />
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Account Settings</Text>
          <Text style={styles.settingDescription}>Manage your account</Text>
        </View>
      </View>

      {/* Privacy Settings */}
      <View style={styles.settingItem}>
        <Ionicons name="lock-closed" size={24} color={darkMode ? '#3498db' : '#3498db'} />
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Privacy</Text>
          <Text style={styles.settingDescription}>Manage your privacy settings</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#121212' : '#ffffff',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  backButtonText: {
    fontSize: 16,
    color: darkMode ? '#3498db' : '#3498db',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkMode ? '#ffffff' : '#2c3e50',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: darkMode ? '#333333' : '#ecf0f1',
  },
  settingTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: darkMode ? '#ffffff' : '#2c3e50',
  },
  settingDescription: {
    fontSize: 14,
    color: darkMode ? '#bdc3c7' : '#7f8c8d',
  },
});

export default SettingsScreen;