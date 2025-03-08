import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker'; 
import SensorCard from '../components/SensorCard';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { DarkModeContext } from '../components/DarkModeContext';

const DashboardScreen = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigation = useNavigation();
  const { width: screenWidth } = useWindowDimensions();

  const styles = getStyles(darkMode);

  // State for selected hydroponics system
  const [selectedSystem, setSelectedSystem] = useState('system1');

  // Mock data for multiple hydroponics systems
  const hydroponicsSystems = {
    system1: {
      plantName: 'Lettuce (Romaine)',
      plantHealth: 'Healthy',
      plantRecommendation: 'Maintain pH between 5.5 - 6.5 and ensure adequate light (60,000 - 100,000 Lux).',
      sensorData: {
        pH: 6.2,
        EC: 1.8,
        TDS: 900,
        temperature: 20,
        humidity: 60,
        light: 75000,
        co2: 450,
      },
      waterSystemData: {
        waterFlowSpeed: 2.5,
        waterPumpMode: 'High',
        waterFertilizer: 'NPK 10-10-10',
      },
    },
    system2: {
      plantName: 'Tomato',
      plantHealth: 'Needs Attention',
      plantRecommendation: 'Maintain pH between 6.0 - 6.8 and ensure adequate light (70,000 - 120,000 Lux).',
      sensorData: {
        pH: 6.5,
        EC: 2.0,
        TDS: 1000,
        temperature: 22,
        humidity: 65,
        light: 80000,
        co2: 500,
      },
      waterSystemData: {
        waterFlowSpeed: 3.0,
        waterPumpMode: 'Medium',
        waterFertilizer: 'NPK 12-12-12',
      },
    },
  };

  // Get data for the selected system
  const currentSystem = hydroponicsSystems[selectedSystem];

  // Solar and Battery data (shared across systems)
  const solarBatteryData = {
    batteryPercentage: 85,
    solarCurrent: 4.5,
    batteryHealth: 'Good',
  };

  // Maximum pump mode power
  const maxPumpMode = 'High';

  // Determine water change status based on pump mode
  const getWaterChangeStatus = (pumpMode) => {
    if (pumpMode === maxPumpMode) {
      return 'Triggered (Pump at Max)';
    } else {
      return 'Due in 2 days';
    }
  };

  // Chart data
  const chartData = {
    labels: ['12AM', '3AM', '6AM', '9AM', '12PM', '3PM', '6PM'],
    datasets: [
      {
        data: [6.0, 6.1, 6.2, 6.3, 6.2, 6.1, 6.0],
        color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  // Responsive chart width
  const chartWidth = screenWidth - 40;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      {/* Dropdown for selecting hydroponics system */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Select Hydroponics System:</Text>
        <Picker
          selectedValue={selectedSystem}
          onValueChange={(itemValue) => setSelectedSystem(itemValue)}
          style={styles.picker}
          dropdownIconColor={darkMode ? '#ffffff' : '#2c3e50'}
        >
          <Picker.Item label="System 1" value="system1" />
          <Picker.Item label="System 2" value="system2" />
        </Picker>
      </View>

      {/* Plant Information */}
      <View style={styles.plantContainer}>
        <Text style={styles.plantName}>{currentSystem.plantName}</Text>
        <Text style={styles.plantHealth}>
          Health: <Text style={{ color: '#27ae60' }}>{currentSystem.plantHealth}</Text>
        </Text>
        <Text style={styles.plantRecommendation}>{currentSystem.plantRecommendation}</Text>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>pH Level Over Time</Text>
        <View style={styles.chartWrapper}>
          <LineChart
            data={chartData}
            width={chartWidth}
            height={220}
            yAxisSuffix=" pH"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(39, 174, 96, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#27ae60',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </View>

      {/* Sensor Grid */}
      <View style={styles.sensorGrid}>
        <SensorCard title="pH" value={currentSystem.sensorData.pH} unit="" />
        <SensorCard title="EC" value={currentSystem.sensorData.EC} unit="mS/cm" />
        <SensorCard title="TDS" value={currentSystem.sensorData.TDS} unit="ppm" />
        <SensorCard title="Temperature" value={currentSystem.sensorData.temperature} unit="°C" />
        <SensorCard title="Humidity" value={currentSystem.sensorData.humidity} unit="%" />
        <SensorCard title="Light" value={currentSystem.sensorData.light} unit="Lux" />
        <SensorCard title="CO2" value={currentSystem.sensorData.co2} unit="ppm" />
      </View>

      {/* Water System Information */}
      <View style={styles.waterSystemContainer}>
        <Text style={styles.waterSystemTitle}>Water System Status</Text>
        <View style={styles.sensorGrid}>
          <SensorCard title="Flow Speed" value={currentSystem.waterSystemData.waterFlowSpeed} unit="L/min" />
          <SensorCard title="Pump Mode" value={currentSystem.waterSystemData.waterPumpMode} unit="" />
          <SensorCard
            title="Water Change"
            value={getWaterChangeStatus(currentSystem.waterSystemData.waterPumpMode)}
            unit=""
            statusColor={currentSystem.waterSystemData.waterPumpMode === maxPumpMode ? '#e74c3c' : '#2ecc71'}
          />
          <SensorCard title="Fertilizer" value={currentSystem.waterSystemData.waterFertilizer} unit="" />
        </View>
      </View>
    </ScrollView>
  );
};

const getStyles = (darkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkMode ? '#121212' : '#f0f4f7',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 30,
  },
  menuIcon: {
    fontSize: 24,
    color: darkMode ? '#ffffff' : '#2c3e50',
    marginTop: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: darkMode ? '#ffffff' : '#2c3e50',
    textAlign: 'center',
    flex: 1,
    marginTop: 10,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  dropdownLabel: {
    fontSize: 16,
    color: darkMode ? '#ffffff' : '#2c3e50',
    marginBottom: 10,
  },
  picker: {
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#ffffff' : '#2c3e50',
  },
  plantContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  plantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  plantHealth: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  plantRecommendation: {
    fontSize: 14,
    color: '#2c3e50',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  chartWrapper: {
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 16,
  },
  sensorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  waterSystemContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  waterSystemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
});

export default DashboardScreen;