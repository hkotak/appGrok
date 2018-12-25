import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
  ImageBackground
} from 'react-native';

import { scanCard } from '../redux/actions/actions.js'

// CSS stuff
import transform from 'css-to-react-native'
import FlipCard from 'react-native-flip-card'

//aws auth
import { Auth } from 'aws-amplify'

// redux
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = (state) => {
  // console.log("STATE", state)
  return {
    myCard: state.myCard,
    authInfo: state.authInfo,
  }
}

class SaveContactScreen extends Component {
  constructor(props){
    super(props);
    // console.log("YYYYY", props)
    const { navigation } =  props
    const userInfo = navigation.getParam('cardData')
  
    this.state = {
      saveCard: userInfo,
      flip: false
    }

  }


  componentDidMount = () => {
  
  //  console.log("SAVE SCREEN", this.state)
  }

  transformCss = (obj) => {

    let arr = [];

    for (var key in obj) {
      let innerArr = [];
      innerArr.push(`${key}`);
      innerArr.push(`${obj[key]}`);

      arr.push(innerArr);
    }
  }
  

  handleSave = (myId, newUserId) => {
    alert("Establish Save/Post method")
    // console.log("SAVE THE CARD", myId, newUserId)
    this.props.dispatch(scanCard(myId, newUserId))

    this.props.navigation.navigate('Contacts')
  }

  transformation = (obj) => {
   return transform(this.transformCss(obj))
  }

  render() {
    console.log("WHAT STATE", this.state)
    // console.log("WHATS THE PROPS", this.props)
    const cardInfo = this.state.saveCard
    const myId = this.props.authInfo.user.sub
    const newUserId = this.state.saveCard.user_id

    // const { myCard } = this.props;
    const { data } = cardInfo;
    const { css } = cardInfo.style  
    // console.log("CSSSSSS", css)
    

    let string = `${css.front.backgroundImage}`
    let backString = `${css.back.backgroundImage}`
    let frontImage = string.split("'")[1]
    let backImage = backString.split("'")[1]
    // console.log("WHAT", frontImage)

    let fontString = `${css.front.fontFamily}`
    let fontCheck = fontString.split(",")[1]

    let backFontString = `${css.back.fontFamily}`
    let backCheck = backFontString.split(",")[1]

    // let backTransformed = transform(this.transformCss(css.back))
    // let frontTransformed = transform(this.transformCss(css.front))
    // let infoTransformed = transform(this.transformCss(css.info))
    // let companyTransformed = transform(this.transformCss(css.company))
    // let nameTransformed = transform(this.transformCss(css.name))

    return (
      <View style={styles.wrapper}>
        <Text style={styles.text1}>SCANNED USER INFO</Text>
        <Text style={styles.text2}>{data.name}</Text>

        <FlipCard
            flip={this.state.flip}
            style={styles.cardWrapper}
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

        <Button
          title={"SAVE"}
          onPress={() => this.handleSave(myId, newUserId)}
        />
        <Button
          title="Try Again"
          onPress={ () => this.props.navigation.navigate('Scan')}
        />
      </View>

    )
  }
}


export default connect(mapStateToProps)(SaveContactScreen)



//~~~~ STYLESHEET ~~~~//
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#273746",
    alignItems: 'center',
  },
  text1: {
    color: 'white',
    marginTop: 50,
    textAlign: 'center',
    fontSize: 35,
  },
  text2: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
  },
  cardWrapper: {
    flex: 0,
    marginTop: 30,
    width: 350,
    height: 200,
    borderRadius: 50,
  },
})
