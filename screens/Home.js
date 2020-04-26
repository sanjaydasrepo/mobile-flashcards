import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';
import DeckScreen from './DeckScreen';
import AddDeckScreen from './AddDeckScreen';
const Tab = createBottomTabNavigator ();

function Home () {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Decks"
        component={DeckScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add Deck"
        component={AddDeckScreen}
        options={{
          tabBarLabel: 'Add deck',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default Home;
