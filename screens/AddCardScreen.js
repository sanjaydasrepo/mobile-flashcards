import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {handleAddCard} from '../store/actions/card';
import styled from 'styled-components/native';
import PrimaryButton from '../components/PrimaryButton';
const Container = styled.KeyboardAvoidingView`
  flex:1 ;
  padding:16px;
`;

const Card = styled.View`
    flex:1;
    padding:16px;
  background:#fff;
  justify-content:space-around;
  min-height:200px;
  align-items:center;
`;
const StyledInput = styled.TextInput`
    border:1px solid #000;
    padding:8px;
    width:100%;
    color:#000;
`;
const FormControl = styled.View`
    width:100%;
`;
const FormLabel = styled.Text`
    font-size:16px;
    margin-bottom:16px;
`;
const StyledText = styled.Text`
    font-size:24px;

`;

class AddCardScreen extends Component {
  state = {
    question: '',
    answer: '',
  };

  handleChange = (name, value) => {
    this.setState (() => ({
      [name]: value || '',
    }));
    // console.log (name, value);
  };

  handleSave = async () => {
    const {question, answer} = this.state;
    const { id} = this.props.deck;

    const deckId = id ;

    const {handleAddCard} = this.props;

    if (question && answer) {
      const card = {
        question,
        answer,
        deckId,
      };
      await handleAddCard (card);
      this.props.navigation.navigate ('Details');
    }
  };

  render () {
    const {title} = this.props.deck;
    return (
      <Container>
        <Card>
          <StyledText> Deck {title} </StyledText>
          <FormControl>
            <FormLabel> Enter question </FormLabel>
            <StyledInput
              name="question"
              onChangeText={text => this.handleChange ('question', text)}
            />
          </FormControl>
          <FormControl>
            <FormLabel> Enter answer </FormLabel>
            <StyledInput
              name="answer"
              onChangeText={text => this.handleChange ('answer', text)}
            />
          </FormControl>

          <PrimaryButton onPress={this.handleSave}> Save </PrimaryButton>
        </Card>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({handleAddCard}, dispatch);
};

const mapStateToProps = ({cards,decks,currentDeck}) => {
  return {
    cards,
    deck: decks && decks[ currentDeck ]
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (AddCardScreen);
