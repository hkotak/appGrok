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
    myCard: state.myCard,
    authInfo: state.authInfo
  }
}

class ContactScreen extends Component {
  constructor(props) {
    super(props)
    this.props.dispatch(getMyCard(props.authInfo.user.sub))
    this.props.dispatch(getAllCards(props.authInfo.user.sub))

    this.state = {
      flip: false
    }

  }

  componentDidUpdate = (prevProps) => {
    // console.log("CAN I SEE PREV PROPS", prevProps.myCard.users.length)
    // console.log("CURRENT PROPS", this.props.myCard)
    if (this.props.myCard.users.length !== prevProps.myCard.users.length) {
      console.log("NEW PROPS!!!")
      this.props.dispatch(getAllCards(this.props.authInfo.user.sub))
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
  
}

  render() {
    // console.log("MYCARD PROPS", this.props.myCard)
    let contactData = this.props.allCards
    console.log('CONTACT DATA: ', contactData);

    
    // let transformed = transform(this.transformCss(this.props.allCards.css.info))

    // console.log("~~~~PROP DATA~~~~");
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
              const { data } = info
              const { css } = info.style;
              let string = `${css.front.backgroundImage}`
              let backString = `${css.back.backgroundImage}`
              let frontImage = string.split("'")[1]
              let backImage = backString.split("'")[1]
              console.log("WHAT", backImage)


              return (
                <View key={info.user_id} style={styles.contacts}>
                
                <FlipCard
                  flip={this.state.flip}
                  style={styles.flipcard}
                  >
  {/* Front of the Card */}

            <View>
            <ImageBackground source={{uri: frontImage}} 
              style={{
                backgroundRepeat: css.front.backgroundRepeat,
                resizeMode: css.front.backgroundSize,
                backgroundColor: css.front.backgroundColor || null,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                
              }} >
              
              <View >
                <Text style={{
                  fontSize: css.name.fontSize,
                  fontFamily: 'Cochin',
                  color: css.front.color,
                  left: css.name.left,
                  letterSpacing: css.name.letterSpacing,
                  // padding: css.name.padding,
                  position: css.name.position,
                  top: css.name.top
                  }}> 
                    {data.name}
                </Text>
                <Text style={{
                color: css.front.color,
                fontSize: css.info.fontSize,
                fontFamily: 'Cochin',
                left: css.info.left,
                position: css.info.position,
                textAlign: css.info.text,
                top: css.info.top
              }}>
                  {data.title} {"\n"}
                  {data.address} {"\n"}
                  {data.phone} {"\n"}
                  {data.email}
                </Text>
              </View>
            </ImageBackground>
          </View>

{/* the back of the card */}
          <View>
            <ImageBackground source={{ uri: backImage }}
              style={{
                backgroundRepeat: css.back.backgroundRepeat,
                resizeMode: css.back.backgroundSize,
                borderRadius: 50,
                width: '100%',
                height: '100%',
              }} >
              <Text style={{
                color: css.company.color,
                fontSize: css.company.fontSize,
                fontFamily: 'Cochin-Bold',
                left: css.company.left,
                position: css.company.position,
                textAlign: css.company.text,
                top: css.company.top
              }}>{data.company_name}</Text>
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