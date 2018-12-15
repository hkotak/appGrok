import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//~~~~~~~~~~ MY IMPORTS ~~~~~~~~~~//
import HomeScreen from '../app/screens/HomeScreen.js'
import ContactScreen from '../app/screens/ContactScreen.js'

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





export default createBottomTabNavigator({
  HomeStack,
  ContactStack
  // LoginStack,
});
