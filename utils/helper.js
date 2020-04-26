import {AsyncStorage} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

const NOTIFICATION_KEY = 'flashcard:notificaions';

export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function getNewDeck (title) {
  return {
    id: generateUID (),
    title,
    cards: [],
    score: {},
    created:Date.now()
  };
}
export function getNewCard (card) {
  card.id = generateUID ();
  return card;
}
export function getCardsByDeck (cards, deck) {
  const selected = deck.cards.map (d => cards[d]);
  return selected;
}
export function generateUID () {
  return (
    Math.random ().toString (36).substring (2, 15) +
    Math.random ().toString (36).substring (2, 15)
  );
}

export function clearNotification () {
  return AsyncStorage.removeItem (NOTIFICATION_KEY).then (
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification () {
  return {
    title: 'Study time !',
    body: 'You have not studied anything today.Pick something.',
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setlocalNotification () {
  AsyncStorage.getItem (NOTIFICATION_KEY).then (JSON.parse).then (data => {
    if (data === null) {
      Permissions.askAsync (Permissions.NOTIFICATIONS).then (status => {
        if (status.status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync ();

          let tommorrow = new Date ();
          tommorrow.setDate (tommorrow.getDate () + 1 );
          tommorrow.setHours (8);
          tommorrow.setMinutes (0);

          Notifications.scheduleLocalNotificationAsync (createNotification (), {
            time: tommorrow,
            repeat: 'day',
          });

          AsyncStorage.setItem (NOTIFICATION_KEY, JSON.stringify (true));
        }
      });
    }
  });
}
