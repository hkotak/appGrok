import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'; 
import { createSwitchNavigator } from 'react-navigation';

// aws authentication
import Amplify, { Auth } from 'aws-amplify'

// navigators
import MainTabNavigator from './MainTabNavigator';
import AuthNavigator from './AuthNavigator.js'

class AppLoad extends React.Component {
  constructor(){
  super();
  this.state = {
    isAuthenticated: false
   }
  }

  componentDidMount(){
    const user = this.state.isAuthenticated;
    // this.props.navigation.navigate(!user ? 'Auth' : 'Main')

    Auth.currentSession()
    .then( data => {
      console.log("session data", data)
      this.props.navigation.navigate('Home')
    })
    .catch(err => {
      console.log("session err", err)
      this.props.navigation.navigate('Auth')
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Loading: AppLoad,
  Auth: AuthNavigator,
  Main: MainTabNavigator,
},
{
  initialRouteName: 'Loading',
});