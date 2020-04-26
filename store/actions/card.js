export const RECEIVE_CARDS = 'RECEIVE_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const GET_CARD = 'GET_CARD';
export const DELETE_CARD = 'DELETE_CARD';
import {saveCard} from '../../utils/api';
import { addCardToDeck, setCurrentDeck } from './deck';

export function receiveCards (cards) {
  return {
    type: RECEIVE_CARDS,
    cards,
  };
}
export function addCard (card) {
  return {
    type: ADD_CARD,
    card,
  };
}
export function handleAddCard (card) {
  return async dispatch => {
    const result = await saveCard (card);
    console.log ('cc ', result , card);
    if (result) {
      dispatch (addCard (result));
      dispatch (addCardToDeck ( card.deckId , result.id ));
    }
  };
}
export function getCard (id) {
  return {
    type: GET_CARD,
    id,
  };
}

export function deleteCard (id) {
  return {
    type: DELETE_CARD,
    id,
  };
}
