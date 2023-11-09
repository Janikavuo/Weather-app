import { Text, View, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const EXPO_PUBLIC_API_KEY = 'YOUR_API_KEY';
const EXPO_PUBLIC_API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const EXPO_PUBLIC_ICONS_URL = 'http://openweathermap.org/img/wn/';

export default function Weather({ latitude, longitude }) {

    const [temp, setTemp] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [feelsLike, setFeelsLike] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [windSpeed, setWindSpeed] = useState(0);
    const [visibility, setVisibility] = useState(0);

    useEffect(() => {
        const url = EXPO_PUBLIC_API_URL +  
            'lat=' + latitude +  
            '&lon=' + longitude +  
            '&units=metric' +  
            '&lang=fi' + 
            '&appid=' + EXPO_PUBLIC_API_KEY;

        fetch(url)
            .then((res) => res.json()) 
            .then((json) => {
                setTemp(json.main.temp);
                setDescription(json.weather[0].description.charAt(0).toUpperCase() + json.weather[0].description.slice(1));
                setIcon(EXPO_PUBLIC_ICONS_URL + json.weather[0].icon + '@2x.png');
                setFeelsLike(json.main.feels_like);
                setHumidity(json.main.humidity);
                setWindSpeed(json.wind.speed);
                setVisibility(json.visibility);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.weatherInfo}>
                <View style={styles.weatherText}>
                    <Text style={[styles.temperature, { color: 'white' }]}>{temp.toFixed(0)}&#x2103;</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
                {icon && <Image source={{ uri: icon }} style={styles.weatherIcon} />}
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                <FontAwesome5 name="temperature-high" size={22} color="white" style={{ marginTop: 10 }}/>
        <Text style={styles.infoText}>Tuntuu kuin:</Text>
        <Text style={styles.infoText}>{feelsLike.toFixed(0)}&#x2103;</Text>
                </View>
                <View style={styles.infoItem}>
                <FontAwesome5 name="wind" size={22} color="white" style={{ marginTop: 10 }}/>
        <Text style={styles.infoText}>Tuulen nopeus:</Text>
        <Text style={styles.infoText}>{windSpeed} m/s</Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                <MaterialCommunityIcons name="weather-fog" size={22} color="white" style={{ marginTop: 10 }}/>
        <Text style={styles.infoText}>Näkyvyys:</Text>
        <Text style={styles.infoText}>{(visibility / 1000).toFixed(0)} km</Text>
                </View>
                <View style={styles.infoItem}>
                <FontAwesome5 name="tint" size={22} color="white" style={{ marginTop: 10 }}/>
        <Text style={styles.infoText}>Ilmankosteus:</Text>
        <Text style={styles.infoText}>{humidity}%</Text>
                </View>
            </View>
        </View>
    );    
}

    const styles = StyleSheet.create({
        container: {
            marginTop: 5,
            marginBottom: 5,
            marginLeft: 25,
            marginRight: 25,
        },
        weatherInfo: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
        },
        weatherText: {
            alignItems: 'center',
        },
        description: {
            fontSize: 15,
            alignItems: 'center',
            color: 'white',
        },
        infoContainer: {
            flexDirection: 'row',
            marginTop: 12,
        },
        infoItem: {
            alignItems: 'center',
            backgroundColor: 'rgba(241 , 236 , 225 , 0.1)',
            borderRadius: 15,
            marginLeft: 12,
            marginRight: 12,
            height: 92,
            flex: 1,       
        },
        weatherIcon: {
            width: 100,
            height: 100,
            alignSelf: 'center',
        },
        temperature: {
            fontSize: 75,
            marginRight: 10,
        },
        infoText: {
            fontSize: 15,
            marginTop: 5,
            color: 'white',
        },
    });