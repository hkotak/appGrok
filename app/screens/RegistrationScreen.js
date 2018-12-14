import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Button
} from 'react-native';
import colors from '../styles/colors/index.js';
import InputField from '../components/forms/inputField.js';
import NextArrowButton from '../components/buttons/NextArrowButton.js'

// aws auth
import { Auth } from 'aws-amplify'


export default class Registration extends Component {
  static navigationOptions = {
    title: "Register",
  }

  constructor(){
    super();
    this.state ={
      email: '',
      password: '',
      confirmPassword:'',
      isAuthenticated: ''
    }
  }
  
  handleRegister = () => {
    const {email, password, confirmPassword} = this.state

    if(password === confirmPassword){
      Auth.signUp({
        username: email,
        password,
        attributes: {
          email: email
        }
      })
      .then(user => {
        console.log("register data", user)
        this.props.navigation.navigate('Confirm', {email: this.state.email})
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
            {/* <InputField
              labelText="First Name"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="first name"
              customStyle={{ marginBottom: 30 }}
            />
            <InputField
              labelText="Last Name"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="last name"
              customStyle={{ marginBottom: 30 }}
            /> */}
            {/* <InputField
              labelText="Email"
              labelTextSize={14}
              labelColor={colors.white}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{ marginBottom: 30 }}
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
            label="email"
            // leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={
              // this updates this.state.email to value in this Input
              (value) => this.setState({email: value})
            }
            placeholder="Enter email"
            />
            <TextInput
            label="password"
            // leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={
              // this updates this.state.email to value in this Input
              (value) => this.setState({password: value})
            }
            placeholder="Enter password"
            />
            <TextInput
            label="confirm-password"
            // leftIcon={{ type: "font-awesome", name: "envelope" }}
            onChangeText={
              // this updates this.state.email to value in this Input
              (value) => this.setState({confirmPassword: value})
            }
            placeholder="Confirm password"
            />

          </ScrollView>
        </View>
        <View style={styles.nextButton}>
          {/* <NextArrowButton
            handleNextButton={this.handleNextButton}
          /> */}
          <Button
          title="Sign Up!"
          onPress={this.handleRegister}
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
  }
})