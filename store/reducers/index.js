import cards from './card';
import decks from './deck';
import quiz from './quiz';
import currentDeck from './currentDeck'

import { combineReducers } from 'redux';

export default combineReducers({
    cards ,
    decks ,
    quiz ,
    currentDeck
})
