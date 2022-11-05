import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LogInScreen from "./src/screens/LogInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import MapScreen from "./src/screens/MapScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const navigator = createStackNavigator(
  {
    Login: LogInScreen,
    Signup: SignUpScreen,
    Map: MapScreen,
    Profile: ProfileScreen,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerShown: false
    }
  }
);

export default createAppContainer(navigator);