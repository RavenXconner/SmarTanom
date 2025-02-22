import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DarkModeContext } from '../components//DarkModeContext';

const SensorCard = ({ title, value, unit }) => {
  const { darkMode } = useContext(DarkModeContext);
  const styles = getStyles(darkMode);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value} {unit}</Text>
    </View>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: darkMode ? '#333333' : '#fff',
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: darkMode ? '#bdc3c7' : '#7f8c8d',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkMode ? '#ffffff' : '#2c3e50',
  },
});

export default SensorCard;