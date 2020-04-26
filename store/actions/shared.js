import { receiveCards } from './card';
import { receiveDecks } from './deck'

import { getInitialData } from '../../utils/api'

export function loadInitialData(){
    return async ( dispatch ) =>{
        const data = await getInitialData();
        dispatch( receiveCards( data.cards ) )
        dispatch( receiveDecks( data.decks ) )
    }
}