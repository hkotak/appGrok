import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

//aws auth
import { Auth } from 'aws-amplify'

class Home extends React.Component {
  static navigationOptions = {
    title: "Home",
  }

  logout = () => {
    alert('LOL')
    Auth.signOut()
      .then(data => {
        console.log("signout data", data)
        this.props.navigation.navigate('Auth')
      })
      .catch(err => {
        console.log("signout err", err)
      })
  }

  render() {
    console.log("Hit the Home Screen")
    return (
      <View style={styles.container}>
        <Text>HOME SCREEN</Text>
        <Button
            style={styles.exButton}
            title="LOGOUT FOR TESTING"
            onPress={this.logout}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home