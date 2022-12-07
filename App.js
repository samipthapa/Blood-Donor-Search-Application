import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as TaskManager from 'expo-task-manager'
import AppContext from './src/context/AppContext';
import { doc, updateDoc } from "firebase/firestore";
import { database } from './firebase';
import { Provider } from 'react-redux';
import store from './src/store';
import StackNavigator from './src/navigation/StackNavigator';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

const LOCATION_TASK_NAME = 'LOCATION_TASK_NAME'

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  const uid = store.getState().uid;
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
      if (uid) {
        const docToUpdate = doc(database, "location", uid);
        updateDoc(docToUpdate, {
          latitude: location.latitude,
          longitude: location.longitude
        }).then(
          console.log('Database updated')
        )
      }
  }
});

export default function App() {
  const [user, setUser] = React.useState({
    loggedIn: false
  });
  const state = {user, setUser};

  return (
    <Provider store={store}>
      <AppContext.Provider value={state}>
          <NavigationContainer>
              {!user.loggedIn ? <StackNavigator /> : <BottomTabNavigator />}
          </NavigationContainer>
      </AppContext.Provider>
    </Provider>
  );
}