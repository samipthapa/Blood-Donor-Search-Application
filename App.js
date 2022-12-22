import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import * as TaskManager from 'expo-task-manager'
import AppContext from './src/context/AppContext';
import { Provider } from 'react-redux';
import store from './src/store';
import StackNavigator from './src/navigation/StackNavigator';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

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
        firestore()
          .collection('location')
          .doc(uid)
          .update({
            latitude: location.latitude,
            longitude: location.longitude
          })
          .then(() => {
            console.log('Location Updated');
          })
      }
  }
});

export default function App() {

  const addToken = (token) => {
    return {
      type: 'fcmToken',
      payload: token
    }
  }

  const [user, setUser] = React.useState({
    loggedIn: false
  });
  const state = {user, setUser};

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  }

  useEffect(() => {

    if (requestUserPermission()) {
      messaging().getToken().then(token => {
        store.dispatch(addToken(token));
      });
    }
    else {
      console.log("Failed token status", authStatus);
    }

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then( async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

      // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp( async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });    

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, [])

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