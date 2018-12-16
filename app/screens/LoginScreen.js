import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// import Icon from 'react-native-vector-icons/FontAwesome'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Button,
  TextInput
} from 'react-native';
import colors from '../styles/colors/index.js';
import InputField from '../components/forms/inputField.js';
import NextArrowButton from '../components/buttons/NextArrowButton.js'

//aws authentication
import { Auth } from 'aws-amplify'

export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isAuthenticated: false,
    }
  }


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
      <KeyboardAvoidingView style={styles.wrapper}>
        <View style={styles.scrollViewWrapper}>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.loginHeader}>Log In</Text>
            {/* <InputField
              labelText="Email Address"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
              onChangeText={(value)=>this.setState({email: value})}
            />
            <InputField
              labelText="Password"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="password"
              customStyle={{ marginBottom: 30 }}
            /> */}


            <TextInput
              labelText="Email"
              autoCorrect={false}
              onChangeText={(value) => this.setState({ email: value })}
              placeholder="Enter email"
            />
            <TextInput
              labelText="Password"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(value) => this.setState({ password: value })}
              placeholder="Enter password"
            />
          </ScrollView>
        </View>
        <View style={styles.nextButton}>
          <Button
            title="Login"
            onPress={this._logginIn}
          />
          {/* <NextArrowButton
            onPress={this.handleNextButton}
          /> */}
        </View>
      </KeyboardAvoidingView>
    );
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
  }
})