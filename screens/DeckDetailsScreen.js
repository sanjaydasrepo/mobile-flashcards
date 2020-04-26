import React, {Component} from 'react';
import {connect} from 'react-redux';

import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

import {bindActionCreators} from 'redux';
import styled from 'styled-components/native';
import {
  resetQuiz
} from '../store/actions/quiz';

const Container = styled.View`
  flex:1 ;
  align-items:center;
  justify-content:space-around;
  padding:16px;
`;
const Styledtext = styled.Text`
    font-size:35px;
    color:#000;
`;
const Card = styled.View`
  border:1px solid #eee;
`;


class DeckDetailsScreen extends Component {
  componentDidMount () {
    const {title} = this.props.deck;
    this.props.navigation.setOptions ({
      title: title === '' ? '' : title,
    });
  }

  render () {
    const {cards} = this.props.deck;
    const {navigation, resetQuiz} = this.props;
    return (
      <Container>
        <Card>
          {cards && cards.length > 0
            ? <Styledtext> {cards.length === 1 ? `${ cards.length } Card`: `${ cards.length } Cards` }  </Styledtext>
            : <Styledtext> No cards </Styledtext>}
        </Card>
        <SecondaryButton
          onPress={() => navigation.navigate ('AddCard')}
        >
          Add card
        </SecondaryButton>
        <PrimaryButton
          onPress={() => {
            resetQuiz ( cards.length );
            navigation.navigate ('Quiz');
          }}
        >
          Start quiz
        </PrimaryButton>
      </Container>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({resetQuiz}, dispatch);
}

function mapStateToProps ({decks, currentDeck }) {
  
  return {
    deck: decks && decks[ currentDeck ]
  };
}

export default connect (mapStateToProps,mapDispatchToProps) (DeckDetailsScreen);
