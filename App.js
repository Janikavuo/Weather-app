import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CurrentWeather from './CurrentWeather';
import Location from './Location';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='CurrentWeather' screenOptions={{
        headerTitleStyle: {
          fontSize: 20,
          color: 'white',
        },
        headerStyle: {
          backgroundColor: '#216583',
        },
      }}>
        <Stack.Screen
          name='Current'
          component={CurrentWeather}
          options={{
            title: 'Sääennuste',
          }}
        />
        <Stack.Screen
          name='Location'
          component={Location}
          options={{
            title: 'Sijainti kartalla',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}