import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/auth_screens/LoginScreen';
import SignUpScreen from '../screens/auth_screens/SignUpScreen';

export const LoginNavigator = createStackNavigator({
      Login: LoginScreen,
      SignUp: SignUpScreen
    },{
      headerMode:"none"
    });