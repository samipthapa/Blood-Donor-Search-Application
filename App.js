import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LogInScreen from './src/screens/LogInScreen';
import RequestScreen from './src/screens/RequestScreen';
import 'react-native-gesture-handler';
import * as TaskManager from 'expo-task-manager'
import AppContext from './src/context/AppContext';
import { doc, updateDoc } from "firebase/firestore";
import { database } from './firebase';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'white' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size}) => {
              let iconName;
              let rn = route.name;
    
              if (rn === 'Home') {
                iconName = focused ? 'home' : 'home-outline'
              } else if (rn === 'Profile') {
                iconName = focused ? 'ios-person' : 'ios-person-outline'
              } else if (rn === 'Request Blood') {
                iconName = focused ? 'water' : 'water-outline'
              }
              return <Ionicons name={iconName} size={size} color={color} />
          },
          headerShown: false,
        })}
        initialRouteName={HomeScreen}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Request Blood" component={RequestScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

const MyStack = () => {
  return (
    <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
  )
}
const LOCATION_TASK_NAME = 'LOCATION_TASK_NAME'

export default function App() {
  const [user, setUser] = React.useState({
    loggedIn: false
  });
  const state = {user, setUser};

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
        if (user?.uid) {
          const docToUpdate = doc(database, "users", user.uid);
          updateDoc(docToUpdate, {
            location: location,
          }).then(
            console.log('Database updated')
          )
        }
    }
  });

  return (
    <AppContext.Provider value={state}>
        <NavigationContainer>
            {!user.loggedIn ? <MyStack /> : <BottomTab />}
        </NavigationContainer>
    </AppContext.Provider>
  );
}