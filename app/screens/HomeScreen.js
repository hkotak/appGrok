import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
  ImageBackground,
  Image
} from 'react-native';

import { Icon } from 'react-native-elements'

//~~~~ Card Data ~~~~//
import { Card } from '../components/CardComponent.js';
import { cardContainer, front, title, back, info, company, name, address, phone, email } from '../components/CardClassing.js';

//~~~~ AWS Auth ~~~~//
import { Auth } from 'aws-amplify'

//~~~~ Redux ~~~~//
import { connect } from 'react-redux';

// CSS stuff
import transform from 'css-to-react-native'
import FlipCard from 'react-native-flip-card'


import { getMyCard, authenticated } from '../redux/actions/actions.js';

const mapStateToProps = (state) => {
  // console.log("STATE", state)
  return {
    myCard: state.myCard,
    // myCardData: state.myCardData,
    // myCardCSS: state.myCardCSS,
    authInfo: state.authInfo
  }
}

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerRight: (
        <Button
          onPress={navigation.getParam('LogOut')}
          title="Log Out"
        />
      )
    }
  };


  constructor(props) {
    super(props)
    console.log("PRRRROPPS", props)
    const { navigation } = props
    const userInfo = navigation.getParam('authInfo')
    console.log("HUH", userInfo)
    this.props.dispatch(authenticated(userInfo))
    this.props.dispatch(getMyCard(userInfo.sub))

    this.state = {
      flip: false
    }

  }


  componentDidMount() {
    this.props.navigation.setParams({ LogOut: this._logOut })
  }

  _logOut = () => {
    alert('Good Bye :)')
    Auth.signOut()
      .then(data => {
        // console.log("signout data", data)
        this.props.navigation.navigate('Auth')
      })
      .catch(err => {
        console.log("signout err", err)
      })
  }


  transformCss = (obj) => {

    let arr = [];

    for (var key in obj) {
      let innerArr = [];
      innerArr.push(`${key}`);
      innerArr.push(`${obj[key]}`);

      arr.push(innerArr);
    }

    return arr;

    // let mobileCss = transform(Object.entries(this.props.myCard.css.front))

    // console.log("WHAT", mobileCss)
  }

  getBackgroundImage = (url) => {
    return url.substr(4, url.length - 2)
  }

  render() {
    console.disableYellowBox = true;
    // console.log("AVAILABLE PROPS: ", this.props);
    const Data = this.props.myCard.data;

   
    const { myCard } = this.props;
    const { data } = myCard;
    const { css } = myCard.style  
    let string = `${css.front.backgroundImage}`
    let backString = `${css.back.backgroundImage}`
    let frontImage = string.split("'")[1]
    let backImage = backString.split("'")[1]
    console.log("WHAT", frontImage)

    let fontString = `${css.front.fontFamily}`
    let fontCheck = fontString.split(",")[1]

    let backFontString = `${css.back.fontFamily}`
    let backCheck = backFontString.split(",")[1]

    let backTransformed = transform(this.transformCss(this.props.myCard.style.css.back))
    // let frontTransformed = transform(this.transformCss(this.props.myCard.style.css.front))
    let infoTransformed = transform(this.transformCss(this.props.myCard.style.css.info))
    // let companyTransformed = transform(this.transformCss(this.props.myCard.style.css.company))
    let nameTransformed = transform(this.transformCss(this.props.myCard.style.css.name))

    
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text1}>Welcome</Text>
        <Text style={styles.text2}>{Data.name}</Text>
        
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
                  fontSize: nameTransformed.fontSize,
                  fontFamily: 'Cochin',
                  color: css.front.color,
                  left: nameTransformed.left,
                  letterSpacing: nameTransformed.letterSpacing,
                  padding: nameTransformed.padding,
                  position: nameTransformed.position,
                  top: nameTransformed.top
                  }}> 
                    {Data.name}
                </Text>
                <Text style={{
                color: css.front.color,
                fontSize: infoTransformed.fontSize,
                fontFamily: 'Cochin',
                left: infoTransformed.left,
                position: infoTransformed.position,
                textAlign: infoTransformed.text,
                top: infoTransformed.top
              }}>
                  {Data.title} {"\n"}
                  {Data.address} {"\n"}
                  {Data.phone} {"\n"}
                  {Data.email}
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
              }}>{Data.company_name}</Text>
            </ImageBackground>
            </View>
            
          </FlipCard>
          <View>
          <Icon
            containerStyle={styles.icon}
            raised
            reverse
            name='refresh'
            type='font-awesome'
            size={30}
            onPress={()=>this.setState({flip: !this.state.flip})}
          />
          </View>


      </View>
    )
  }



}


export default connect(mapStateToProps)(HomeScreen)



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
  icon: {
    // position: 'absolute',
    right: 5
  }
})
