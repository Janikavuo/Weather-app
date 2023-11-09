import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Location from 'expo-location';
import Map from './screens/Map';

export default function MapLocation({ navigation }) {

  useLayoutEffect(() => {
    navigation.setOptions({
        headerStyle: {
            backgroundColor: '#216583'
        },
        headerLeft: () => (
            <AntDesign
                style={styles.navButton}
                name="arrowleft"
                size={25}
                color={'white'}
                onPress={() => navigation.navigate('Current')}
            />
        )
    });
}, []);

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log("Permission status:", status);

      if (status !== 'granted') {
        console.log('Sijaintia ei ole sallittu.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setIsLoading(false);
    };

    getLocation();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Haetaan sijaintia...</Text>
      </View>
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        <Map latitude={latitude} longitude={longitude} />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});