import axios from 'axios';

export const GET_MY_CARD = "GET_MY_CARD";
export const GET_ALL_CARDS = 'GET_ALL_CARDS'
export const AUTH_INFO = 'AUTH_INFO'
export const SCAN_CARD = 'SCAN_CARD'

//~~~~ IMPORT THE SAMPLE DATA ~~~~//
import Data from '../instructions.json'

// ip address changes

// const ip = "192.168.173.225" // DC Home
const ip = "192.168.200.130" // DevLeague

//Auth Actions 
export const authenticated = (data) => {
  return dispatch => {
    dispatch({
      type: AUTH_INFO,
      payload: data
    })
  }
}


//~~~~ GET USER CARD ~~~~//
export const getMyCard = (id) => {
  return dispatch => {
    axios
      .get(`http://${ip}:8000/specific/A100001004`)
      .then(response => {
        // console.log("GET MY CARD RESPONSE", response.data)
        dispatch({
          type: GET_MY_CARD,
          payload: response.data
        })
      })
      .catch(err => {
        console.log("Error at getting my card", err)
      })
  }
}


//~~~~ ACTION TO GET ALL CARDS ~~~~//
export const getAllCards = () => {
  return dispatch => {
    axios
      .get(`http://${ip}:8000/all/A100001004`)
      .then(response => {
        dispatch({
          type: GET_ALL_CARDS,
          payload: response.data
        })
      })
      .catch(err => {
        console.log("Error at getting all cards", err)
      })
  }
}

// Scan a card and see in contacts
export const scanCard = (id, newCardId) => {
  return dispatch => {
    axios
      .get(`http://${ip}:8000/specific/A100001004`)
      .then(response => {
        response.data.users.push(newCardId)
        let newBody = response.data
        return newBody
      })
      .then(response => {
        console.log("RESPONSE", response)
        axios
          .put(`http://${ip}:8000/update/A100001004`, response)
          .then(response => {
            dispatch({
              type: GET_MY_CARD,
              payload: response.data
            })
            console.log("DB RESPONSE", response)
          })
          .catch(err => {
            console.log("Error at dispatching scanned card", err)
          })
      })
      .catch(err => {
        console.log("Error at adding a scanned card", err)
      })
    // .put(`http://${ip}:/update/A100001004`, newCardId)
    // .then(response => {
    //   dispatch({
    //     type: SCAN_CARD,
    //     payload: response.data
    //   })
    //   .catch(err => {
    //     console.log("Error at adding a scanned card", err)
    //   })
    // })
  }
}
