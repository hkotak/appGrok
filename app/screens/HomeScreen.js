import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button
} from 'react-native';

//aws auth
import { Auth } from 'aws-amplify'

// redux
import { connect } from 'react-redux';

// import * as Actions from '../redux/actions/actions.js';
import { getMyCard, authenticated } from '../redux/actions/actions.js';


// const mapStateToProps = (state) => {
//   return {
//     data: state.dataReducer.data
//   }
// }


const mapStateToProps = (state) => {
  // console.log("STATE", state)
  return {
    myCardData: state.myCardData,
    myCardCSS: state.myCardCSS,
    authInfo: state.authInfo
  }
}

class HomeScreen extends Component {

  componentWillMount = () => {
    console.log('THIS HITS FIRST??');
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
    // console.log("AVAILABLE PROPS: ", this.props);
    const Data = this.props.myCardData;
    console.log("CARD DATA: ", Data);


    return (
      <View style={styles.wrapper}>
        <Text style={styles.text1}>Welcome</Text>
        <Text style={styles.text2}>{Data.name}</Text>
        <View style={styles.cardWrapper}>
          <Text>Name: {Data.name}</Text>
          <Text>Company Name: {Data.company_name}</Text>
          <Text>Email: {Data.email}</Text>
          <Text>Phone #: {Data.phone}</Text>
          <Text>Title: {Data.title}</Text>
        </View>
        <Button
            style={styles.exButton}
            title="LOGOUT FOR TESTING"
            onPress={this.logout}
          />
      </View>

    )
  }
}


export default connect(mapStateToProps)(HomeScreen)



//~~~~ STYLESHEET ~~~~//
const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    backgroundColor: "lightblue",
    height: '100%',
    alignItems: 'center',
  },
  text1: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 35,
  },
  text2: {
    textAlign: 'center',
    fontSize: 30,
  },
  cardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    backgroundColor: 'red',
    width: '80%',
    height: '30%',
    borderRadius: 50,
  }
})
