import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text, Pressable } from 'react-native';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = () => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  useEffect(() => {
    (async () => {

      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission not granted')
      }

      const position = await Location.getCurrentPositionAsync();
      setLocation(prev => ({
        ...prev,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }))
    })();
  }, [])
  
  return (
    <View style={styles.container}>
      {/* {console.log(location)} */}
      <MapView
        style={styles.map}
        center={location}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker coordinate={location} />
        <Circle center={location} radius={500} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;