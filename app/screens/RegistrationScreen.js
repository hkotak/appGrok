import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { Button } from 'react-native-elements'
import colors from '../styles/colors/index.js';
import InputField from '../components/forms/inputField.js';
import NextArrowButton from '../components/buttons/NextArrowButton.js'

// aws auth
import { Auth } from 'aws-amplify'


export default class Registration extends Component {
  static navigationOptions = {
    title: "Register",
  }

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      isAuthenticated: ''
    }
  }

  handleRegister = () => {
    const { email, password, confirmPassword } = this.state

    if (password === confirmPassword) {
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email: email
        }
      })
        .then(user => {
          // console.log("register data", user)
          this.props.navigation.navigate('Confirm', { email: this.state.email })
        })
        .catch(err => {
          console.log("register error", err)
          alert(`Error while registering, please try again. Error: ${err.message}`)
        })
    } else {
      alert('Password do not match')
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>Register</Text>
           
            <TextInput style={styles.label}
              label="email"
              // leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={
                // this updates this.state.email to value in this Input
                (value) => this.setState({ email: value })
              }
              placeholder="Enter email"
              placeholderTextColor="white"
            />
            <TextInput style={styles.label}
              label="password"
              // leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={
                // this updates this.state.email to value in this Input
                (value) => this.setState({ password: value })
              }
              placeholder="Enter password"
              placeholderTextColor="white"
              secureTextEntry
            />
            <TextInput style={styles.label}
              label="confirm-password"
              // leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={
                // this updates this.state.email to value in this Input
                (value) => this.setState({ confirmPassword: value })
              }
              placeholder="Confirm password"
              placeholderTextColor="white"
              secureTextEntry
            />

          </ScrollView>
        </View>
        <View style={styles.nextButton}>
          <Button
          title="Sign Up!"
          onPress={this.handleRegister}
          rounded
          large
          />
        </View>
      </KeyboardAvoidingView>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.lightBlack,

  },
  scrollViewWrapper: {
    marginTop: 70,
    flex: 1,
  },
  scrollView: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    flex: 1,
  },
  loginHeader: {
    fontSize: 30,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  nextButton: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 20,
  },
  label: {
    // fontWeight: '300',
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  }
})