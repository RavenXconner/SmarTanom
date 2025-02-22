import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DarkModeContext } from '../components/DarkModeContext';

const Sidebar = ({ navigation }) => {
  const { darkMode } = useContext(DarkModeContext);
  const styles = getStyles(darkMode);

  // Handle logout confirmation
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => navigation.navigate('Login'),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/user-avatar.png')}
          style={styles.avatar}
        />
        <Text style={styles.username}>John Doe</Text>
        <Text style={styles.userEmail}>johndoe@example.com</Text>
      </View>

      {/* Menu Items */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Dashboard')}>
        <Ionicons name="home" size={24} color={darkMode ? '#3498db' : '#3498db'} />
        <Text style={styles.menuItemText}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings" size={24} color={darkMode ? '#3498db' : '#3498db'} />
        <Text style={styles.menuItemText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person" size={24} color={darkMode ? '#3498db' : '#3498db'} />
        <Text style={styles.menuItemText}>Profile</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Logout Button */}
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="#e74c3c" />
        <Text style={[styles.menuItemText, { color: '#e74c3c' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#121212' : '#ffffff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkMode ? '#ffffff' : '#2c3e50',
  },
  userEmail: {
    fontSize: 14,
    color: darkMode ? '#bdc3c7' : '#7f8c8d',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: darkMode ? '#333333' : '#ecf0f1',
  },
  menuItemText: {
    fontSize: 16,
    color: darkMode ? '#ffffff' : '#2c3e50',
    marginLeft: 20,
  },
  divider: {
    height: 1,
    backgroundColor: darkMode ? '#333333' : '#ecf0f1',
    marginVertical: 10,
  },
});

export default Sidebar;