import axios from 'axios';

export const GET_MY_CARD = "GET_MY_CARD";
export const GET_ALL_CARDS = 'GET_ALL_CARDS'
export const AUTH_INFO = 'AUTH_INFO'

//~~~~ IMPORT THE SAMPLE DATA ~~~~//
import Data from '../instructions.json'

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
      .get("http://localhost:8000/specific/A100001001")
      .then(response => {
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
      .get(`http://localhost:8000/all/A100001001`)
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
