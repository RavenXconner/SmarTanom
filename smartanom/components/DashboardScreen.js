import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import SensorCard from '../components/SensorCard';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { DarkModeContext } from '../components//DarkModeContext';

const DashboardScreen = () => {
  const { darkMode } = useContext(DarkModeContext);
  const navigation = useNavigation();
  const { width: screenWidth } = useWindowDimensions();

  const styles = getStyles(darkMode);

  // Plant data
  const plantName = 'Lettuce (Romaine)';
  const plantHealth = 'Healthy';
  const plantRecommendation =
    'Maintain pH between 5.5 - 6.5 and ensure adequate light (60,000 - 100,000 Lux).';

  // Sensor data
  const sensorData = {
    pH: 6.2,
    EC: 1.8,
    TDS: 900,
    temperature: 20,
    humidity: 60,
    light: 75000,
    co2: 450,
  };

  // Solar and Battery data
  const solarBatteryData = {
    batteryPercentage: 85, // Battery percentage
    solarCurrent: 4.5, // Current from solar in Amperes (A)
    batteryHealth: 'Good', // Battery health status
  };

  // Water System data
  const waterSystemData = {
    waterFlowSpeed: 2.5, // Water flow speed in liters per minute (L/min)
    waterPumpMode: 'High', // Water pump mode (Low, Medium, High)
    waterFertilizer: 'NPK 10-10-10', // Recommended water fertilizer
  };

  // Maximum pump mode power
  const maxPumpMode = 'High';

  // Determine water change status based on pump mode
  const getWaterChangeStatus = () => {
    if (waterSystemData.waterPumpMode === maxPumpMode) {
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
  const chartWidth = screenWidth - 40; // Adjust padding dynamically

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Dashboard</Text>
      </View>

      {/* Plant Information */}
      <View style={styles.plantContainer}>
        <Text style={styles.plantName}>{plantName}</Text>
        <Text style={styles.plantHealth}>
          Health: <Text style={{ color: '#27ae60' }}>{plantHealth}</Text>
        </Text>
        <Text style={styles.plantRecommendation}>{plantRecommendation}</Text>
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
        <SensorCard title="pH" value={sensorData.pH} unit="" />
        <SensorCard title="EC" value={sensorData.EC} unit="mS/cm" />
        <SensorCard title="TDS" value={sensorData.TDS} unit="ppm" />
        <SensorCard title="Temperature" value={sensorData.temperature} unit="°C" />
        <SensorCard title="Humidity" value={sensorData.humidity} unit="%" />
        <SensorCard title="Light" value={sensorData.light} unit="Lux" />
        <SensorCard title="CO2" value={sensorData.co2} unit="ppm" />
      </View>

      {/* Solar and Battery Information */}
      <View style={styles.solarBatteryContainer}>
        <Text style={styles.solarBatteryTitle}>Solar & Battery Status</Text>
        <View style={styles.sensorGrid}>
          <SensorCard title="Battery %" value={solarBatteryData.batteryPercentage} unit="%" />
          <SensorCard title="Solar Current" value={solarBatteryData.solarCurrent} unit="A" />
          <SensorCard title="Battery Health" value={solarBatteryData.batteryHealth} unit="" />
        </View>
      </View>

      {/* Water System Information */}
      <View style={styles.waterSystemContainer}>
        <Text style={styles.waterSystemTitle}>Water System Status</Text>
        <View style={styles.sensorGrid}>
          <SensorCard title="Flow Speed" value={waterSystemData.waterFlowSpeed} unit="L/min" />
          <SensorCard title="Pump Mode" value={waterSystemData.waterPumpMode} unit="" />
          <SensorCard
            title="Water Change"
            value={getWaterChangeStatus()}
            unit=""
            statusColor={waterSystemData.waterPumpMode === maxPumpMode ? '#e74c3c' : '#2ecc71'}
          />
          <SensorCard title="Fertilizer" value={waterSystemData.waterFertilizer} unit="" />
        </View>
      </View>

      {/* Plant Health Status */}
      <View style={styles.healthContainer}>
        <Text style={styles.healthTitle}>Plant Health Status</Text>
        <View style={styles.healthStatus}>
          <Text style={styles.healthText}>pH: {sensorData.pH} (Ideal: 5.5 - 6.5)</Text>
          <Text style={styles.healthText}>EC: {sensorData.EC} mS/cm (Ideal: 1.2 - 2.4)</Text>
          <Text style={styles.healthText}>TDS: {sensorData.TDS} ppm (Ideal: 600 - 1,200)</Text>
          <Text style={styles.healthText}>Temperature: {sensorData.temperature}°C (Ideal: 18°C - 22°C)</Text>
          <Text style={styles.healthText}>Humidity: {sensorData.humidity}% (Ideal: 50% - 70%)</Text>
          <Text style={styles.healthText}>Light: {sensorData.light} Lux (Ideal: 60,000 - 100,000)</Text>
          <Text style={styles.healthText}>CO2: {sensorData.co2} ppm (Ideal: 400 - 600)</Text>
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
  solarBatteryContainer: {
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
  solarBatteryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
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
  healthContainer: {
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
  healthTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  healthStatus: {
    marginLeft: 10,
  },
  healthText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 5,
  },
});

export default DashboardScreen;