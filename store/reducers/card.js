import {ADD_CARD, GET_CARD,RECEIVE_CARDS, DELETE_CARD} from '../actions/card';

export default function cards (state = {}, action) {
  switch (action.type) {
    case RECEIVE_CARDS:
      return {
        ...state,
        ...action.cards,
      };
    case ADD_CARD:
      return {
        ...state,
        [action.card.id]:action.card,
      };
    case GET_CARD:
      return state;
    case DELETE_CARD:
      return {
        ...state ,
        state:state.filter( s => s.cardId !== action.id )
      };
    default:
      return state;
  }
}
