import React, {Component} from 'react';
import {FlatList,Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components/native';
import {loadInitialData} from '../store/actions/shared';
import Deck from '../components/Deck';
import { setCurrentDeck } from '../store/actions/deck';

const Container = styled.View`
  flex:1 ;
  align-items:center;
  background:#fff;
  justify-content:center;
`;
const DeckList = styled.View`
  width:100%;
  padding:16px;
`;

class DeckScreen extends Component {
  componentDidMount () {
    const {loadInitialData} = this.props;
    loadInitialData ();
  }
 
  handleDispatch( id ){
    const { setCurrentDeck ,navigation } = this.props ;
    setCurrentDeck( id );
    navigation.navigate('Details');
  }

  render () {
    
    const {decks, navigation } = this.props;

    if( decks.length === 0 ){
      return(
        <Container>
          <Text> No decks </Text>
        </Container>
      )

    }

    return (
      <Container>
        <DeckList>
          <FlatList
            keyExtractor={item => item.id}
            data={decks}
            renderItem={({item}) => (
              <Deck item={item} navigation={navigation} handleDispatch={this.handleDispatch.bind( this ) } />
            )}
          />
        </DeckList>
      </Container>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators (
    {setCurrentDeck,loadInitialData},
    dispatch
  );
}

function mapStatetoProps({decks}) {
  const decksArr = [];
  decks && Object.keys (decks).map (key => decksArr.push (decks[key]));
  return {
    decks: decksArr.sort((a,b)=> b.created - a.created),
  };
}
export default connect (mapStatetoProps, mapDispatchToProps) (DeckScreen);
