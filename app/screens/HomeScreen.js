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
import { Icon } from 'react-native-elements'


//aws auth
import { Auth } from 'aws-amplify'

// redux
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
  constructor(props) {
    super(props)
    const { navigation } = props
    const userInfo = navigation.getParam('authInfo')
    this.props.dispatch(authenticated(userInfo))
    this.props.dispatch(getMyCard())
    
    this.state = {
      flip: false
    }

  }

  _logOut = () => {
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

  componentDidMount = () => {
    // this.transformCss()
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

  getBackgroundImage = (url) => {
    return url.substr(4, url.length-2)
  }

  render() {
    // console.log("AVAILABLE PROPS: ", this.props);
    const Data = this.props.myCard.data;

    console.log("CARD DATA: ", transform(this.transformCss(this.props.myCard.css.info)));
    const css = this.props.myCard.css;
    console.log("can i see only the css", css)
    let string = `${css.front.backgroundImage}`
    let backString = `${css.back.backgroundImage}`
    let frontImage = string.split("'")[1]
    let backImage = string.split("'")[1]
    console.log("WHAT", backImage)

    

    return (
      <View style={styles.wrapper}>
        <Text style={styles.text1}>Welcome</Text>
        <Text style={styles.text2}>{Data.name}</Text>
        <View style={styles.cardWrapper}>
          <FlipCard
            flip={this.state.flip}
           >
            <View>
            <ImageBackground source={{uri: frontImage}} 
              style={{
                backgroundRepeat: css.front.backgroundRepeat,
                resizeMode: css.front.backgroundSize }} >
                  {/* <Text style={transform(this.transformCss(this.props.myCard.css.company))}>Company Name: {Data.company_name}</Text> */}
                    <View style={transform(this.transformCss(this.props.myCard.css.info))}>
                      <Text>Name: {Data.name}</Text>
                      <Text>Email: {Data.email}</Text>
                      <Text>Phone #: {Data.phone}</Text>
                      <Text>Title: {Data.title}</Text>
                    </View>
            </ImageBackground>
            </View>
            <View>
            <ImageBackground source={{uri: backImage}} 
              style={{
                backgroundRepeat: css.back.backgroundRepeat,
                resizeMode: css.back.backgroundSize,
                alignContent: css.back.textAlign }} >
                  <Text style={transform(this.transformCss(this.props.myCard.css.company))}>{Data.company_name}</Text>
            </ImageBackground>
            </View>
            
          </FlipCard>

          <Icon
            raised
            reverse
            name='refresh'
            type='font-awesome'
            onPress={()=>this.setState({flip: !this.state.flip})}
          />
          
        </View>
        <Button
          onPress={this._logOut}
          title="Log Out"
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
    backgroundColor: "#273746",
    height: '100%',
    alignItems: 'center',
  },
  text1: {
    // flex: 1,
    marginTop: 50,
    textAlign: 'center',
    fontSize: 35,
    color: "white"
  },
  text2: {
    // flex: 2,
    textAlign: 'center',
    fontSize: 30,
    color: "white"
  },
  cardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    // backgroundColor: 'red',
    width: '90%',
    height: '30%',
    borderRadius: 50,
  },
  bImage: {
    height: 400,
    width: 300,
    
  },
  flip: {

  }

})
