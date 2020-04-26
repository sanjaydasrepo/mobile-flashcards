export const ADD_DECK = 'ADD_DECK';
export const GET_DECK = 'GET_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const UPDATE_DECK = 'UPDATE_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const SET_CURRENT_DECK = 'SET_CURRENT_DECK';
export const GET_CURRENT_DECK = 'GET_CURRENT_DECK';

import {saveDeckTitle, _updateDeck} from '../../utils/api';

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function addDeckHandler (title) {
  return async dispatch => {
    const result = await saveDeckTitle (title);
    dispatch (addDeck (result));
    dispatch( setCurrentDeck( Object.keys(result)[0] ) )
  };
}

export function getDeck (id) {
  return {
    type: GET_DECK,
    id,
  };
}
export function getCurrentDeck () {
  return {
    type: GET_CURRENT_DECK
  };
}
export function setCurrentDeck (id) {
  return {
    type: SET_CURRENT_DECK,
    id,
  };
}


export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}
export function updateDeck (deck) {
  return {
    type: UPDATE_DECK,
    deck,
  };
}
export function handleUpdateDeck (deck) {
  return async dispatch => {
    dispatch ( updateDeck( deck ));
    await _updateDeck (deck);
  };
}
export function addCardToDeck (id, cardId) {
  return {
    type: ADD_CARD_TO_DECK,
    id,
    cardId,
  };
}
