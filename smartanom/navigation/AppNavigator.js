import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../components/LoginScreen'; // Import the LoginScreen
import DashboardScreen from '../components/DashboardScreen'; // Import the DashboardScreen
import ForgotPasswordScreen from '../components/ForgotPasswordScreen'; // Import the ForgotPasswordScreen
import SignupScreen from '../components/SignupScreen'; // Import the SignupScreen
import SettingsScreen from '../components/SettingsScreen'; // Import the SettingsScreen
import ProfileScreen from '../components/ProfileScreen'; // Import the ProfileScreen
import Sidebar from '../components/Sidebar'; // Import the Sidebar

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <Sidebar {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

// Main Stack Navigator
const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }} // Hide the header for the Login screen
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }} // Hide the header for the ForgotPassword screen
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }} // Hide the header for the Signup screen
      />
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{ headerShown: false }} // Hide the header for the DrawerNavigator
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;