// import { combineReducers } from 'redux';

import { GET_ALL_CARDS, GET_MY_CARD, AUTH_INFO } from '../actions/actions.js';

// let dataState = { data: [], loading: true };
// let cardState = { data: {}, loading: true };

const reducers = (state = {
  allCards: [],
  myCard: {
    user_id: "",
    data: {},
    css: {
      back: {},
      company: {},
      front: {},
      info: {}
    },
  },
  authInfo: {}
}, action) => {

  switch (action.type) {

    //~~~~ Cases ~~~~//
    case AUTH_INFO:
      const newAuthInfo = {
        user: action.payload
      }
      return { ...state, authInfo: newAuthInfo }

    case GET_ALL_CARDS:
      if (!action.payload) {
        return {
          ...state
        }
      } else {
        const newPayload = action.payload.map(card => {
          let parsedAllCss = {};
          for (var key in card.css) {
            parsedAllCss[key] = JSON.parse(card.css[key])
          }
          return {
            ...card,
            css: parsedAllCss
          }
        })
        return {
          ...state,
          allCards: newPayload
        }
      }

    case GET_MY_CARD:
      let parsedMyCss = {};
      for (var key in action.payload.css) {
        parsedMyCss[key] = JSON.parse(action.payload.css[key])
      }
      const myData = {
        user_id: action.payload.user_id,
        data: action.payload.data,
        css: parsedMyCss
      }
      return {
        ...state,
        myCard: myData
      }

    default:
      return state
  }
}

export default reducers;


//~~~~ MY COMPLICATED WAY ~~~~//

// const dataReducer = (state = dataState, action) => {

//   switch (action.type) {
//     case GET_ALL_CARDS:
//       state = Object.assign({}, state, { data: action.data, loading: false })
//       return state;

//     default:
//       return state
//   }
// };

// const cardReducer = (state = cardState, action) => {
//   switch (action.type) {
//     case GET_CARD:
//       state = Object.assign({}, state, { data: action.data, loading: false })
//       return state;

//     default:
//       return state;
//   }
// }

// // Combine all the reducers
// const rootReducer = combineReducers({
//   dataReducer,
//   cardReducer,
//   //[ANOTHER REDUCER], [ANOTHER REDUCER] ....
// })

// export default rootReducer;