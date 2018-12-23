import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from 'react-native-elements'
// import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import { Button } from 'react-native-elements'
import colors from '../styles/colors/index.js';
import InputField from '../components/forms/inputField.js';
import NextArrowButton from '../components/buttons/NextArrowButton.js'

//aws authentication
import { Auth } from 'aws-amplify'

export default class Login extends Component {
  // static navigationOptions = {
  //   title: "Login",
  // }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAuthenticated: false,
    }
  }

  static navigationOptions = () => ({
    title: 'Login',
    headerStyle: {
      backgroundColor: 'transparent',
    },
    // header: null


  });


  _logginIn = () => {
    // alert('Next Button Pressed')
    const { email, password } = this.state
    Auth.signIn(email, password)
      .then(user => {
        console.log("user data", user)
        this.setState({ isAuthenticated: true })
        this.props.navigation.navigate('Home')
      })
      .catch(err => {
        console.log("user sign in err", err);
        alert("Email address or Password do not match, please try again")
      })
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>Log In</Text>
            <View styles={styles.fieldContainer}>
              <TextInput style={styles.label}
                label="Email"
                placeholderTextColor="white"
                onChangeText={(value) => this.setState({ email: value })} // this updates this.state.email to value in this Input                 
                placeholder="Enter email"
              />
            </View>
            <TextInput style={styles.label}
              label="password"
              placeholderTextColor="white"
              secureTextEntry
              // leftIcon={{ type: "font-awesome", name: "envelope" }}
              onChangeText={(value) => this.setState({ password: value })} // this updates this.state.email to value in this Input
              placeholder="Enter password"
            />
          </ScrollView>
          <Button style={styles.nextButton}
            large
            rounded
            title="Login"
            onPress={this._logginIn}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#273746',
    justifyContent: 'center'

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
  fieldContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    padding: 10,
  },
  nextButton: {
    alignItems: 'flex-end',
    right: 20,
    bottom: 40,
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