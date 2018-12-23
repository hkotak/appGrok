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

import FlipCard from 'react-native-flip-card'

import { connect } from 'react-redux';
import { getAllCards, getMyCard } from '../redux/actions/actions.js';

import transform from 'css-to-react-native';


const mapStateToProps = (state) => {
  // console.log("STATE: ", state);
  return {
    allCards: state.allCards,
    myCard: state.myCard
  }
}

class ContactScreen extends Component {
  constructor(props) {
    super(props)
    this.props.dispatch(getMyCard())
    this.props.dispatch(getAllCards())

    this.state = {
      flip: false
    }

  }

  componentDidUpdate = (prevProps) => {
    // console.log("CAN I SEE PREV PROPS", prevProps.myCard.users.length)
    // console.log("CURRENT PROPS", this.props.myCard.users.length)
    if (this.props.myCard.users.length !== prevProps.myCard.users.length) {
      console.log("NEW PROPS!!!")
      this.props.dispatch(getAllCards())
    }
  }

  allContacts = () => {
    this.props.data
  }

  transformCss = (obj) => {

    let arr = [];
  
    for(var key in obj) {
      let innerArr = [];
      innerArr.push(`${key}`);
      innerArr.push(`${obj[key]}`);
      
      arr.push(innerArr);
    }
  
    return arr;
  
  // let mobileCss = transform(Object.entries(this.props.myCard.css.front))

  // console.log("WHAT", mobileCss)
}

  render() {
    // console.log("MYCARD PROPS", this.props.myCard)
    let contactData = this.props.allCards
    console.log('CONTACT DATA: ', contactData);

    // const remote = "https://images.pexels.com/photos/1580625/pexels-photo-1580625.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    const Data = this.props.myCard.data;

    
    // let transformed = transform(this.transformCss(this.props.allCards.css.info))

    console.log("~~~~PROP DATA~~~~");
    // console.log(data);
    // console.log("CSS:", css);
    
    return (
      <ScrollView>
        <SearchBar
          lightTheme
          onKeyUp={this._handleKeyUp}
          // onClearText={}
          placeholder='Type Here...' />
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Your Connections</Text>
          {
            contactData.map(info => {
              console.log("can i do this", info)
              const { data, css } = info;
              let string = `${css.front.backgroundImage}`
              let backString = `${css.back.backgroundImage}`
              let frontImage = string.split("'")[1]
              let backImage = backString.split("'")[1]
              console.log("WHAT", backImage)


              return (
                <View key={info.user_id} style={styles.contacts}>
                  <FlipCard
                    flip={this.state.flip}
                  >
                    <View style={styles.flipcard}
>
                    <ImageBackground source={{uri: frontImage}} 
                      style={{
                        backgroundRepeat: css.front.backgroundRepeat,
                        resizeMode: css.front.backgroundSize,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }} >
                        
                          <View style={transform(this.transformCss(this.props.myCard.css.info))}>
                            <Text> {data.name}</Text>
                            <Text> {data.email}</Text>
                            <Text> {data.phone}</Text>
                            <Text> {data.title}</Text>
                          </View>
                    </ImageBackground>
                    </View>

                    <View>
                    <ImageBackground source={{uri: backImage}} 
                      style={{ 
                        backgroundRepeat: css.back.backgroundRepeat,
                        resizeMode: css.back.backgroundSize,
                        borderRadius: 50,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: css.back.textAlign,
                      }} >
                          <Text style={transform(this.transformCss(this.props.myCard.css.company))}>{Data.company_name}</Text>
                    </ImageBackground>
                    </View>
                    
                  </FlipCard>
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
    alignItems: 'center',
    flexDirection: 'column',
    padding: 15
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
  },
  contacts: {
    flex: 0,
    width: 300,
    height: 200,
    borderWidth: .5,
    borderColor: 'red',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    marginTop: 30,
    
  },
  flipcard: {
    width: '100%',
    height: '100%'
  }

})