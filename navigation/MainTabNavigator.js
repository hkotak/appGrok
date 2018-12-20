import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//~~~~~~~~~~ MY IMPORTS ~~~~~~~~~~//
import HomeScreen from '../app/screens/HomeScreen.js'
import ContactScreen from '../app/screens/ContactScreen.js'
import QRScreen from '../app/screens/QRScreen.js'
import ScanScreen from '../app/screens/ScanScreen.js'
import SaveContactScreen from '../app/screens/SaveContactScreen.js'
import { create } from 'uuid-js';
import { Icon } from 'react-native-elements'


//~~~~ LOGGED OUT VIEW ~~~~//
const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: <Icon
    name="home"
  />
}


const ContactStack = createStackNavigator({
  Contacts: ContactScreen
})

ContactStack.navigationOptions = {
  tabBarLabel: <Icon
    name="search"
  />
}


const QRStack = createStackNavigator({
  QRcode: QRScreen,
  Scan: ScanScreen,
  Save: SaveContactScreen
})

QRStack.navigationOptions = {
  tabBarLabel: <Icon
    name="add-circle"

  />
}






export default createBottomTabNavigator({
  HomeStack,
  ContactStack,
  QRStack,



  // LoginStack,
});
