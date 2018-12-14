import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

//~~~~~~~~~~ MY IMPORTS ~~~~~~~~~~//
import HomeScreen from '../app/screens/HomeScreen.js'

//~~~~ LOGGED OUT VIEW ~~~~//
const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home'
}




export default createBottomTabNavigator({
  HomeStack,
  // LoginStack,
});
