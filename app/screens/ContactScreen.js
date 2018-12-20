import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground
} from 'react-native';
import { SearchBar } from 'react-native-elements'

import { connect } from 'react-redux';
import { getAllCards, getMyCard } from '../redux/actions/actions.js';

const mapStateToProps = (state) => {
  // console.log("STATE: ", state);
  return {
    allCards: state.allCards,
    myCard: state.myCard
  }
}

class ContactScreen extends Component {
  constructor(props){
    super(props)
    this.props.dispatch(getMyCard())
    this.props.dispatch(getAllCards())
  }

  componentDidUpdate = (prevProps) => {
    // console.log("CAN I SEE PREV PROPS", prevProps.myCard.users.length)
    // console.log("CURRENT PROPS", this.props.myCard.users.length)
    if(this.props.myCard.users.length !== prevProps.myCard.users.length){
      console.log("NEW PROPS!!!")
      this.props.dispatch(getAllCards())
    }
  }

  allContacts = () => {
    this.props.data
  }


  render() {
    // console.log("MYCARD PROPS", this.props.myCard)
    let contactData = this.props.allCards
    // console.log('CONTACT DATA: ', contactData);

    // const remote = "https://images.pexels.com/photos/1580625/pexels-photo-1580625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"

    return (
      <ScrollView>
        <SearchBar
          lightTheme
          // onChangeText={}
          // onClearText={}
          placeholder='Type Here...' />
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Your Connections</Text>
          {
            contactData.map(data => {
              return (
                <View key={data.user_id} style={styles.contacts}>
                  <Text>{data.data.name}</Text>
                  <Text>{data.data.email}</Text>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps)(ContactScreen)

//~~~~ STYLESHEET ~~~~//
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
    padding: 15
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
  },
  contacts: {
    borderWidth: .5,
    borderColor: 'red',
    alignItems: 'center',
    padding: 20,
    margin: 15,
    backgroundColor: 'lightblue',
    height: 150,



  }
  // img: {
  //   flex: 1,
  //   resizeMode: 'cover',
  //   width: '100%',
  //   height: '100%'
  // }
})