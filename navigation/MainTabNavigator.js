import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//~~~~~~~~~~ MY IMPORTS ~~~~~~~~~~//
import LoggedOut from '../app/screens/LoggedOutScreen.js';
import LoginScreen from '../app/screens/LoginScreen.js';

//~~~~ LOGGED OUT VIEW ~~~~//
const LoggedOutStack = createStackNavigator({
  LoggedOut: LoggedOut,
})

LoggedOutStack.navigationOptions = {
  tabBarLabel: 'LogOut'
}


//~~~~ LOGIN SCREEN ~~~~//
const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Login'
}


export default createBottomTabNavigator({
  LoggedOutStack,
  LoginStack,
});
