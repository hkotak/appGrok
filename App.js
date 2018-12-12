import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';

import LoggedOut from './app/screens/LoggedOutScreen.js';
import Login from './app/screens/LoginScreen.js';
import Registration from './app/screens/RegistrationScreen.js';

import { createStackNavigator, createAppContainer } from 'react-navigation';
export default class App extends Component {
  render() {
    return (
      <Registration />
    );
  }
}


