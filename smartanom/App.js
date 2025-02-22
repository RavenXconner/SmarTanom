import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { DarkModeProvider } from './components//DarkModeContext'; // Ensure this path is correct

export default function App() {
  return (
    <DarkModeProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </DarkModeProvider>
  );
}