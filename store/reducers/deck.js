import {
  ADD_DECK,
  GET_DECK,
  RECEIVE_DECKS,
  ADD_CARD_TO_DECK,
  UPDATE_DECK
} from '../actions/deck';

export default function decks (state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case GET_DECK:
      return state;
    case RECEIVE_DECKS:
      return {
        ...state ,
        ...action.decks
      };
    case ADD_CARD_TO_DECK:
      return {...state , 
        [action.id]:{
          ...state[action.id] ,
          cards:state[action.id].cards.concat( [action.cardId] )
        }
      };
    case UPDATE_DECK:
      return {...state ,
        [action.deck.id]:action.deck
      };
    default:
      return state;
  }
}
