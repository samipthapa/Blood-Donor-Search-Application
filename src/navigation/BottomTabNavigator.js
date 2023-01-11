import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RequestScreen from '../screens/RequestScreen';
import RequestList from '../screens/RequestList';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
      <Tab.Navigator
          sceneContainerStyle={{ backgroundColor: 'white' }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size}) => {
                let iconName;
                let rn = route.name;
      
                if (rn === 'Map View') {
                  iconName = focused ? 'map-sharp' : 'map-outline'
                } else if (rn === 'Profile') {
                  iconName = focused ? 'ios-person' : 'ios-person-outline'
                } else if (rn === 'Request Blood') {
                  iconName = focused ? 'water' : 'water-outline'
                } else if (rn === 'Request List') {
                  iconName = focused ? 'list-sharp' : 'list-outline'
                }
                return <Ionicons name={iconName} size={size} color='rgb(178,34,34)' />
            },
            headerShown: false,
          })}
          initialRouteName={HomeScreen}
        >
          <Tab.Screen name="Map View" component={HomeScreen} />
          <Tab.Screen name="Request List" component={RequestList} />
          <Tab.Screen name="Request Blood" component={RequestScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    )
  }

  export default BottomTab;