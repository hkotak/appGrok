import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';

// import * as Actions from '../redux/actions/actions.js';
import { getMyCard } from '../redux/actions/actions.js';


// const mapStateToProps = (state) => {
//   return {
//     data: state.dataReducer.data
//   }
// }

const mapStateToProps = (state) => {
  console.log("state", state)
  return {
    MyCardData: state.MyCardData,
    myCardCSS: state.myCardCSS
  }
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.dispatch(getMyCard())
  }

  render() {
    console.log('this.props: ', this.props)
    return (
      <View>
        <Text style={styles.text1}>DATA SCREEN</Text>
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