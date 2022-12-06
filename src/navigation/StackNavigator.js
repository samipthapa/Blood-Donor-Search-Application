import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from '../screens/SignUpScreen';
import LogInScreen from "../screens/LogInScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
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

export default StackNavigator;