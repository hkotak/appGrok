'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Button
} from 'react-native';

// small navigator and Avatar
import { ButtonGroup, Avatar } from 'react-native-elements'

// qrcode generator
import QRCode from 'react-native-qrcode'

import ScanScreen from './ScanScreen.js'

import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  // console.log("STATE", state)
  return {
    myCardData: state.myCardData,
    myCardCSS: state.myCardCSS,
    authInfo: state.authInfo
  }
}

class QRScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 1,
      myCardCSS: props.myCardCSS,
      myCardData: props.myCardData
    }
    this.updateIndex = this.updateIndex.bind(this)
    console.log("ALL THE PROPS",)
  }

  // state = {
  //   myCardCSS: this.props.myCardCSS,
  //   myCardData: this.props.myCardData
  // }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex})
  }



  componentDidMount = () => {
    // console.log("state", this.state)   
    console.log("QRSCREEN", this.qrCodeData())

  }

  qrCodeData = () => {
    return JSON.stringify(this.state)
  }


  render(){
   
    return(
      <View style={styles.container}>
        {/* <Text>QRScreen!!!</Text> */}
       
        <Text>{this.state.myCardData.name}</Text>
        <QRCode medium
         value={this.qrCodeData()}
         size={250}
         
        />
       <View>
        <Button
        style={styles.exButton}
        title="SCAN WITH CAMERA"
        onPress={ () => this.props.navigation.navigate('Scan')}
        />
       </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
  },

  input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      borderRadius: 5,
      padding: 5,
  }
});

export default connect(mapStateToProps)(QRScreen)