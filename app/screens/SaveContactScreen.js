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

const mapStateToProps = (state) => {
  // console.log("STATE", state)
  return {
    myCardData: state.myCardData,
    myCardCSS: state.myCardCSS,
    authInfo: state.authInfo
  }
}

class SaveContactScreen extends Component {
  constructor(props){
    console.log("YYYYY", props)
    const { navigation } =  props
    const userInfo = navigation.getParam('cardData')
    super(props);
    this.state = {
      saveCard: userInfo
    }

  }
  

  componentDidMount = () => {
  //  const { navigation } = this.props
  //  const userInfo = navigation.getParam('cardData')
   console.log("SAVE SCREEN", this.state)
  //  this.setState({saveCard: userInfo})
       
  }

  render() {
    console.log("WHAT STATE", this.state)
    const cardInfo = this.state.saveCard.myCardData
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text1}>Hi!</Text>
        <Text style={styles.text2}>{cardInfo.name}</Text>
        <View style={styles.cardWrapper}>
          <Text>Name: {cardInfo.name}</Text>
          <Text>Company Name: {cardInfo.company_name}</Text>
          <Text>Email: {cardInfo.email}</Text>
          <Text>Phone #: {cardInfo.phone}</Text>
          <Text>Title: {cardInfo.title}</Text>
        </View>
        {/* <Button
            style={styles.exButton}
            title="LOGOUT FOR TESTING"
            onPress={this.logout}
          /> */}
      </View>

    )
  }
}


export default connect(mapStateToProps)(SaveContactScreen)



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
