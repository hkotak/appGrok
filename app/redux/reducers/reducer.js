// import { combineReducers } from 'redux';

import { GET_ALL_CARDS, GET_MY_CARD } from '../actions/actions.js';

// let dataState = { data: [], loading: true };
// let cardState = { data: {}, loading: true };

const reducers = (state = {
  allCardsData: [],
  allCardsCSS: [],
  myCardData: {},
  myCardCSS: {}
}, action) => {

  switch (action.type) {

    //~~~~ Cases ~~~~//
    case GET_ALL_CARDS:
      action.payload.forEach(card => {
        state.allCardsData.push(card.data)
        state.allCardsCSS.push(card.css)
      });
      return { ...state, allCards: action.payload }

    case GET_MY_CARD:
      return { ...state, myCardData: action.payload.data, myCardCSS: action.payload.css }

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