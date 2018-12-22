import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  Image
} from 'react-native';

//~~~~ Card Data ~~~~//
import { Card } from '../components/CardComponent.js';
import { cardContainer, front, title, back, info, company, name, address, phone, email } from '../components/CardClassing.js';

//~~~~ AWS Auth ~~~~//
import { Auth } from 'aws-amplify'

//~~~~ Redux ~~~~//
import { connect } from 'react-redux';
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
  // static navigationOptions = {
  //   // headerTitle: <LogoTitle />,
  //   headerRight: (
  //     <Button
  //       onPress={() => alert('This is a button!')}
  //       title="Log Out"
  //     />
  //   ),

  // };



  constructor(props) {
    super(props)
    const { navigation } = props
    const userInfo = navigation.getParam('authInfo')
    this.props.dispatch(authenticated(userInfo))
    this.props.dispatch(getMyCard())

  }

  static navigationOptions = () => ({
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerRight: (
      <Button
        onPress={() => HomeScreen._logOut()}
        title="Log Out"
      />
    )


  });

  _logOut = () => {
    // alert('LOL')
    Auth.signOut()
      .then(data => {
        // console.log("signout data", data)
        this.props.navigation.navigate('Auth')
      })
      .catch(err => {
        console.log("signout err", err)
      })
  }

  render() {
    // console.log("AVAILABLE PROPS: ", this.props);
    // console.log("CARD DATA: ", this.props);

    const { myCard } = this.props;

    const { data, css } = myCard;

    console.log("~~~~PROP DATA~~~~");
    console.log(data);
    console.log("CSS:", css);

    // ~~~~ STYLESHEET ~~~~//
    // const newStyles = StyleSheet.create({
    // })

    // console.log("~~~~STYLE~~~~");

    const styles1 = StyleSheet.create({
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
      },
    })

    console.log("STYLES: ", styles1);

    return (
      // <View style={styles.wrapper}>
      //   <Text style={styles.text1}>Welcome</Text>
      //   <Text style={styles.text2}>{data.name}</Text>

      //   <View style={styles.cardWrapper}>
      //     <Text>Name: {data.name}</Text>
      //     <Text>Company Name: {data.company_name}</Text>
      //     <Text>Email: {data.email}</Text>
      //     <Text>Phone #: {data.phone}</Text>
      //     <Text>Title: {data.title}</Text>
      //   </View>
      //   <Button
      //     onPress={this._logOut}
      //     title="Log Out"
      //   />

      // </View>

      <View style={styles1.wrapper}>
        <Text style={styles1.text1}>Welcome</Text>
        <Text style={styles1.text2}>{data.name}</Text>
        <View style={styles1.cardWrapper}>
          {/* <ImageBackground
            style={styles.container}
            resizeMode='cover'
          // source={{ uri: remote }}
          > */}
          <Card
            cardContainer={cardContainer}
            front={front}
            info={info}
            name={name}
            title={title}
            address={address}
            phone={phone}
            company_name={company}
            email={email}
            data={data}
            style={css}
          />
          {/* </ImageBackground> */}

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


// const styles = StyleSheet.create({
//   wrapper: {
//     display: 'flex',
//     backgroundColor: "lightblue",
//     height: '100%',
//     alignItems: 'center',
//   },
//   text1: {
//     marginTop: 50,
//     textAlign: 'center',
//     fontSize: 35,
//   },
//   text2: {
//     textAlign: 'center',
//     fontSize: 30,
//   },
//   cardWrapper: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//     backgroundColor: 'red',
//     width: '80%',
//     height: '30%',
//     borderRadius: 50,
//   }
// })
