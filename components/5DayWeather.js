import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';

const EXPO_PUBLIC_API_KEY = 'YOUR_API_KEY';
const EXPO_PUBLIC_API_URL = 'https://api.openweathermap.org/data/2.5/forecast?';
const EXPO_PUBLIC_ICONS_URL = 'http://openweathermap.org/img/wn/';

export default function Forecast({ latitude, longitude }) {

  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    const url = `${EXPO_PUBLIC_API_URL}lat=${latitude}&lon=${longitude}&units=metric&lang=fi&appid=${EXPO_PUBLIC_API_KEY}`;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setForecastData(json.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.forecastTitle}>5 päivän sääennuste</Text>
      <FlatList
        data={forecastData}
        keyExtractor={(item) => item.dt.toString()}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.forecastItem}>
            <Text style={styles.forecastTime}>
              {new Date(item.dt * 1000).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Image
              source={{ uri: `${EXPO_PUBLIC_ICONS_URL}${item.weather[0].icon}@2x.png` }}
              style={styles.forecastIcon}
            />
            <Text style={styles.forecastTemp}>{item.main.temp.toFixed(0)}&#x2103;</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 30,
    backgroundColor: 'rgba(241, 236, 225, 0.1)',
    flex: 1,
  },
  forecastTitle: {
    fontSize: 18,
    marginBottom: 15,
    marginLeft: 25,
    marginTop: 10,
    color: 'white',
  },
  forecastItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  forecastTime: {
    fontSize: 12,
    color: 'white',
  },
  forecastIcon: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 15,
    color: 'white',
  },
});