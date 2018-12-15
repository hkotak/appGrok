import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

import { getAllCards } from '../redux/actions/actions.js';

const mapStateToProps = (state) => {
  console.log("STATE: ", state);
  return {
    allCardsData: state.allCardsData,
    allCardsCSS: state.allCardsCSS
  }
}

class ContactScreen extends Component {

  componentDidMount = () => {
    this.props.dispatch(getAllCards())
  }


  render() {
    return (
      <ScrollView>
        <View>
          <Text>All Contacts Here</Text>
        </View>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps)(ContactScreen)