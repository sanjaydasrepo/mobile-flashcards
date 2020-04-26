// import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createStore} from 'redux';
import reducer from './store/reducers';
import middleware from './store/middleware';
import DeckDetailsScreen from './screens/DeckDetailsScreen';
import AddCardScreen from './screens/AddCardScreen';
import QuizScreen from './screens/QuizScreen';
import QuizResults from './screens/QuizResults';
import { setlocalNotification , clearNotification } from './utils/helper';
import Home from './screens/Home'
const store = createStore (reducer, middleware);

const Stack = createStackNavigator ();

export default class App extends React.Component {

  componentDidMount(){
    setlocalNotification();
  }

  render () {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Decks">

            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Details" component={DeckDetailsScreen} />
            <Stack.Screen
              name="AddCard"
              component={AddCardScreen}
              options={{title: 'Add card'}}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{title: 'Quiz'}}
            />
            <Stack.Screen
              name="Results"
              component={QuizResults}
              options={{title: 'Quiz results', headerLeft: null}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
