import { View, Text } from 'react-native'
import React from 'react'

export default function WeatherInfo(WeatherData) {

  const WeatherData={
    name,
    main:{ temp, humidity},
    wather,
    wind:{speed}
  }

  const weatherCondition = weather[0]

  const iconUrl = `https://openweathermap.org/img/wn/${weatherCondition.icon}@2x.png`
  return (
    <View style={StyleSheet.container}>
      <Text style={StyleSheet.cityName}>{name}</Text>

      <View style={styles.tempContanier}>
        <Image source={{uri: iconUrl}}
         styles={styles.weatherIcon}
        />
      <Text style={styles.Temperature}>{Math.round(temp)}</Text>
      </View>

      <Text style={styles.description}>{weatherCondition.description}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Humidity</Text>
          <Text style= {styles.detailValue}>{humidity}</Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Wind</Text>
          <Text style= {styles.detailValue}>{speed} m/s</Text>
        </View>
      </View>
    </View>
  )
}


const styles =StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    // Adding simple shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android
    margin: 10,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 20,
    color: '#666',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  detailBox: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '40%',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
})