import {
    SET_CURRENT_DECK
  } from '../actions/deck';
  
  export default function decks (state = "", action) {
    switch (action.type) {
      
      case SET_CURRENT_DECK:
        return action.id
      default:
        return state;
    }
  }
  