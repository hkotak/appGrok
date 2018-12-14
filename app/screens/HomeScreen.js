import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';

//aws auth
import { Auth } from 'aws-amplify'

import { connect } from 'react-redux';

// import * as Actions from '../redux/actions/actions.js';
import { getMyCard, authenticated } from '../redux/actions/actions.js';


// const mapStateToProps = (state) => {
//   return {
//     data: state.dataReducer.data
//   }
// }


const mapStateToProps = (state) => {
  console.log("state", state)
  return {
    MyCardData: state.MyCardData,
    myCardCSS: state.myCardCSS,
    authInfo: state.authInfo
  }
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const { navigation } = this.props
    const userInfo = navigation.getParam('authInfo')
    
    this.props.dispatch(authenticated(userInfo))
    this.props.dispatch(getMyCard())
    
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
    console.log('this.props: ', this.props)

    return (
      <View style={styles.container}>
        <Text>HOME SCREEN</Text>
        <Button
            style={styles.exButton}
            title="LOGOUT FOR TESTING"
            onPress={this.logout}
          />
      
      <View>
        <Text style={styles.text1}>DATA SCREEN</Text>
      </View>
    </View>
    )
  }
}


export default connect(mapStateToProps)(HomeScreen)



//~~~~ STYLESHEET ~~~~//
const styles = StyleSheet.create({
  text1: {
    display: 'flex',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 30,

  }
})
