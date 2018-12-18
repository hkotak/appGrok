import React, { Component } from 'react';
import colors from '../styles/colors/index.js';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import RoundedButton from '../components/buttons/RoundedButton.js'

import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

import { Auth } from 'aws-amplify';

// screens for nav
import LoginScreen from './LoginScreen.js';
import Register from './RegistrationScreen.js'

export default class LoggedOut extends Component {
  static navigationOptions = {
    // title: "Welcome",
  }

  componentDidMount() {
    // console.log("PROPS", this.props.navigation)
  }

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image
            source={require('../img/dino.png')}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Welcome to Grok</Text>
          <RoundedButton
            text="Get Started"
            textColor={colors.lightBlack}
            background={colors.white}
            icon={<Icon name="facebook" size={20} style={styles.facebookButtonIcon} />}
            handleOnPress={this.onGetStarted}
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            handleOnPress={this._onCreateAccount}
          />
          {/* <Button
            style={styles.exButton}
            title="LOGOUT FOR TESTING"
            onPress={this._onPressLearnMore}
          /> */}
        </View>
      </View>
    )
  }


  onGetStarted = () => {
    // console.log('hitting')
    this.props.navigation.navigate('Login')

  }

  _onCreateAccount = () => {
    // alert('Create Account Pressed')
    // console.log('can i register???')
    this.props.navigation.navigate('Register')
  }

  _onPressLearnMore() {
    alert('LOL')
    Auth.signOut()
      .then(data => {
        console.log("signout data", data)
      })
      .catch(err => {
        console.log("signout err", err)
      })
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    backgroundColor: colors.lightBlack,
  },
  welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginTop: 50,
    marginBottom: 40,
    marginLeft: 20,
  },
  facebookButtonIcon: {
    color: colors.lightBlack,
    position: 'relative',
    left: 20,
    zIndex: 8,
  },

})

