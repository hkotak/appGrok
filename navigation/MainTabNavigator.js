import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { Icon } from 'react-native-elements'
//~~~~~~~~~~ MY IMPORTS ~~~~~~~~~~//
import HomeScreen from '../app/screens/HomeScreen.js'
import ContactScreen from '../app/screens/ContactScreen.js'
import QRScreen from '../app/screens/QRScreen.js'
import ScanScreen from '../app/screens/ScanScreen.js'
import SaveContactScreen from '../app/screens/SaveContactScreen.js'
import { create } from 'uuid-js';

//~~~~ LOGGED OUT VIEW ~~~~//
const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: <Icon name="home-circle" type="material-community"/>
}

const ContactStack = createStackNavigator({
  Contacts: ContactScreen
})

ContactStack.navigationOptions = {
  tabBarLabel: 'Contacts',
  tabBarIcon: <Icon name="contact-mail" type="material-community" />
}

const QRStack = createStackNavigator({
  QRcode: QRScreen,
  Scan: ScanScreen,
  Save: SaveContactScreen
})

QRStack.navigationOptions = {
  tabBarLabel: 'Share',
  tabBarIcon: <Icon name="camera-front" type="material" />
}




export default createBottomTabNavigator({
  HomeStack,
  ContactStack,
  QRStack
  // LoginStack,
},
{
  tabBarOptions:{
    style: {
      backgroundColor: 'light-grey'
    }
  }
});
