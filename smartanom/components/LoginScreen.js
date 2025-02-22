// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo (or any other icon library)

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading animation
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigation = useNavigation();

  const handleLogin = () => {
    setLoading(true); // Show loading animation
    // Simulate login process
    setTimeout(() => {
      setLoading(false); // Hide loading animation
      navigation.navigate('Main'); // Navigate to the DrawerNavigator
    }, 2000); // Simulate a 2-second delay
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>SmarTanom</Text>
      <Text style={styles.subtitle}>Vertical Hydroponic Monitoring</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.showHideButton}
          onPress={() => setShowPassword(!showPassword)} // Toggle password visibility
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'} // Change icon based on showPassword state
            size={24}
            color="#7f8c8d"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" /> // Show loading animation
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    padding: 10,
  },
  showHideButton: {
    padding: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: '#27ae60',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#27ae60',
    fontSize: 16,
    marginTop: 10,
  },
});

export default LoginScreen;