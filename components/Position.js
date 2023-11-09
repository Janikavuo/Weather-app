import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import Weather from './Weather';
import Forecast from './5DayWeather';

const EXPO_PUBLIC_API_KEY = 'YOUR_API_KEY';
const EXPO_PUBLIC_API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const EXPO_PUBLIC_ICONS_URL = 'http://openweathermap.org/img/wn/';

export default function Position() {

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('Haetaan sijaintia...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            console.log(status);
            try {
                if (status !== 'granted') {
                    setMessage("Sijaintia ei ole sallittu.");
                } else {
                    const position = await Location.getCurrentPositionAsync({
                        accuracy: Location.Accuracy.High
                    });
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setMessage('Sijainti haettu.');
                    await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${EXPO_PUBLIC_API_KEY}`)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.length > 0) {
                                setCity(data[0].name);
                            }
                        })
                        .catch((error) => {
                            console.error("Virhe kaupungin hakemisessa:", error);
                        });
                }
            } catch (error) {
                setMessage("Virhe sijainnin hakemisessa.");
                console.log(error);
            }
            setIsLoading(false);
        })();
    }, [latitude, longitude]);

    if (isLoading) {
        return <View style={styles.container}><Text style={styles.label}>{message}</Text></View>;
    } else {
        
        return (
            <View style={styles.container}>
                <View style={styles.locationText}>
                    <Text style={styles.locationText}>{city}</Text>
                    <MaterialIcons name="location-pin" size={18} color="white" marginTop={5} marginLeft= {15} marginBottom= {15}/>
                </View>
                <Weather latitude={latitude} longitude={longitude} apiURL={EXPO_PUBLIC_API_URL} apiKey={EXPO_PUBLIC_API_KEY} iconsURL={EXPO_PUBLIC_ICONS_URL} />
                <Forecast latitude={latitude} longitude={longitude} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 15,
    },
    locationText: {
        color: 'white',
        fontSize: 35,
        marginLeft: 15,
        marginTop: 10,
    },
    label: {
        color: 'white',
        fontSize: 15,
    }
});