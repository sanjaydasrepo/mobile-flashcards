import {AsyncStorage} from 'react-native';
import {getNewDeck, getNewCard} from './helper';

const FLASHCARDS_KEY = 'flashcards';
const DECK_KEY = 'decks';
const CARD_KEY = 'cards';

export async function saveDeckTitle (title) {
  // AsyncStorage.removeItem (FLASHCARDS_KEY);

  const newDeck = getNewDeck (title);
  const result = await AsyncStorage.getItem (FLASHCARDS_KEY);

  if (result) {
    const resultP = JSON.parse (result);
    const newResp = {
      ...resultP,
      [DECK_KEY]: {
        ...resultP[DECK_KEY],
        [newDeck.id]: newDeck,
      },
    };

    AsyncStorage.setItem (FLASHCARDS_KEY, JSON.stringify (newResp));
  } else {
    AsyncStorage.setItem (
      FLASHCARDS_KEY,
      JSON.stringify ({
        [DECK_KEY]: {
          [newDeck.id]: newDeck,
        },
      })
    );
  } 
  return new Promise ((res, rej) => {
    setTimeout (() => {
      res ({
        [newDeck.id]: newDeck,
      });
    }, 1000);
  });
}

export async function saveCard (card) {
  const newCard = getNewCard (card);

  const result = await AsyncStorage.getItem (FLASHCARDS_KEY);

  if (result) {
    const resultP = JSON.parse (result);

    const decks = resultP[DECK_KEY];
    const cards = resultP[CARD_KEY];

    let newCards = {};

    if (typeof cards === 'undefined') {
      newCards = {
        [newCard.id]: newCard,
      };
    } else {
      newCards = {
        ...cards,
        [newCard.id]: newCard,
      };
    }

    const newDecks = {
      ...decks,
      [card.deckId]: {
        ...decks[card.deckId],
        cards: decks[card.deckId].cards.concat (newCard.id),
      },
    };

    const newResp = {
      ...resultP,
      [DECK_KEY]: newDecks,
      [CARD_KEY]: newCards,
    };

    AsyncStorage.setItem (FLASHCARDS_KEY, JSON.stringify (newResp));
  }

  return new Promise ((res, rej) => {
    setTimeout (() => {
      res ( newCard );
    }, 1000);
  });
}

export async function _updateDeck (deck) {
  const result = await AsyncStorage.getItem (FLASHCARDS_KEY);

  if (result) {
    const resultP = JSON.parse (result);
    const decks = resultP[DECK_KEY];

    const newDecks = {
      ...decks,
      [deck.id]: deck
    };

    const newResp = {
      ...resultP,
      [DECK_KEY]: newDecks
    };

    AsyncStorage.setItem (FLASHCARDS_KEY, JSON.stringify (newResp ));

  }
  return new Promise ((res, rej) => {
    setTimeout (() => {
      res ( deck );
    }, 1000);
  });
}

export async function getInitialData () {
  const res = await AsyncStorage.getItem (FLASHCARDS_KEY);
  if (res === null) return {};
  const resJ = JSON.parse (res);
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
      resolve ({
        decks: resJ[DECK_KEY] ,
        cards: resJ[CARD_KEY] ,
      });
    }, 1000);
  });
}

