import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { doc, updateDoc } from "firebase/firestore";
import { database } from '../../firebase';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"

const Map = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {

      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted) await Location.requestBackgroundPermissionsAsync()

      const position = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })

      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 10000,
        distanceInterval: 0
      })
    })();
  }, [])

  if (!location) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker 
          coordinate={location} 
          draggable
          onDragEnd={({nativeEvent}) => {
            setLocation(prev => ({
              ...prev,
              latitude: nativeEvent.coordinate.latitude,
              longitude: nativeEvent.coordinate.longitude
            }))
          }}
        />
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

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
      console.log('LOCATION_TRACKING task ERROR:', error);
      return;
  }
  if (data) {
      const { locations } = data;
      const location = {
        latitude: locations[0].coords.latitude,
        longitude: locations[0].coords.longitude
      }
      // const docToUpdate = doc(database, "users", 'lQde0PgFMzMQz0RbXaNj');
      // updateDoc(docToUpdate, {
      //   location: location,
      // }).then(
      //   console.log('Database updated')
      // )
  }
});

export default Map;