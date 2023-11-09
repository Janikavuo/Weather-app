import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ latitude, longitude, backgroundColor }) {

  const region = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      style={[styles.map, { backgroundColor }]}
      region={region}
    >
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        title="Sijaintisi"
        description="Olet täällä"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
});