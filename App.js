import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import store from './app/redux/store.js'
import { Provider } from 'react-redux';


import LoggedOut from './app/screens/LoggedOutScreen.js';
import Login from './app/screens/LoginScreen.js';
import Registration from './app/screens/RegistrationScreen.js';
import Home from './app/screens/Home.js'


import AppNavigator from './navigation/AppNavigator';
import { createStackNavigator, createAppContainer } from 'react-navigation';


export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}


