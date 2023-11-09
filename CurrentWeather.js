import React, { useLayoutEffect } from "react";
import { StyleSheet, View, StatusBar } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Position from './components/Position';

export default function Current({ navigation }) {
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#216583'
            },
            headerRight: () => (
                <AntDesign
                    style={styles.navButton}
                    name="arrowright"
                    size={25}
                    color={'white'}
                    onPress={() => navigation.navigate('Location')}
                />
            )
        });
    }, []);

    return (
        <View style={styles.container}>
          <StatusBar
            style="light-content"
            backgroundColor="#216583"
          />
          <LinearGradient
            colors={['#216583', '#f07810']}
            style={styles.gradientBackground}
          >
            <Position />
          </LinearGradient>
        </View>
      );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navButton: {
        marginRight: 5,
        padding: 4,
    },
    gradientBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});