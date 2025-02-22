import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons name="arrow-back" size={24} color="#3498db" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/user-avatar.png')} // Replace with your user avatar image
          style={styles.avatar}
        />
        <Text style={styles.username}>SmarTanom</Text> {/* Replace with dynamic username */}
        <Text style={styles.userEmail}>smartanom@gmail.com</Text> {/* Replace with dynamic email */}
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="create" size={20} color="#3498db" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Profile Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="person" size={24} color="#3498db" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTitle}>Full Name</Text>
            <Text style={styles.detailValue}>John Doe</Text> {/* Replace with dynamic data */}
          </View>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="mail" size={24} color="#3498db" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTitle}>Email</Text>
            <Text style={styles.detailValue}>johndoe@example.com</Text> {/* Replace with dynamic data */}
          </View>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="call" size={24} color="#3498db" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailTitle}>Phone</Text>
            <Text style={styles.detailValue}>+1 234 567 890</Text> {/* Replace with dynamic data */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40, // Add marginTop to push the button lower
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
    marginLeft: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userEmail: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  editButtonText: {
    fontSize: 16,
    color: '#3498db',
    marginLeft: 10,
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  detailTitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  detailValue: {
    fontSize: 16,
    color: '#2c3e50',
  },
});

export default ProfileScreen;