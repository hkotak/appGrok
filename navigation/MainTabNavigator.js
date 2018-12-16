import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//~~~~~~~~~~ MY IMPORTS ~~~~~~~~~~//
import HomeScreen from '../app/screens/HomeScreen.js'
import ContactScreen from '../app/screens/ContactScreen.js'
import QRScreen from '../app/screens/QRScreen.js'
import ScanScreen from '../app/screens/ScanScreen.js'
import { create } from 'uuid-js';

//~~~~ LOGGED OUT VIEW ~~~~//
const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home'
}

const ContactStack = createStackNavigator({
  Contacts: ContactScreen
})

ContactStack.navigationOptions = {
  tabBarLabel: 'Contacts'
}

const QRStack = createStackNavigator({
  QRcode: QRScreen,
  Scan: ScanScreen
})

QRStack.navigationOptions = {
  tabBarLabel: 'Share'
}




export default createBottomTabNavigator({
  HomeStack,
  ContactStack,
  QRStack
  // LoginStack,
});
