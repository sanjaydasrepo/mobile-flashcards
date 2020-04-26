import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import {getCardsByDeck} from '../utils/helper';
import {handleUpdateDeck} from '../store/actions/deck';
import {resetQuiz, correctAnswer, wrongAnswer} from '../store/actions/quiz';
import {setlocalNotification, clearNotification} from '../utils/helper';
import SecondaryButton from '../components/SecondaryButton';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryVariantButton from '../components/SecondaryVariantButton';

const Container = styled.View`
  flex:1 ;
  align-items:center;
  padding:16px;
`;
const CardCount = styled.View`
    background:#000;
    padding:8px;
    margin-bottom:8px;
`;
const CardCountText = styled.Text`
    color:#fff;
`;

const CardView = styled.View`
    background:#fff;
    padding:8px;
    width:100%;
    flex:1;
    justify-content:space-between;
`;
const CardQuestionView = styled.View`
    flex:1;
    background:${props => (props.viewAnswer ? 'tomato' : '#eee')}
    align-items:center;
    justify-content:center;
`;
const CardQuestionAction = styled.View`
    flex-direction:row;
    justify-content:space-around;
    align-items:center;
    flex:1;
`;
const QuestionText = styled.Text `
  font-size:24px;

`

class QuizScreen extends Component {
  state = {
    viewAnswer: false,
  };

  toggleAnswerView () {
    this.setState (state => ({
      ...state,
      viewAnswer: !state.viewAnswer,
    }));
  }

  async handleSubmit (answer) {
    const {
      correctAnswer,
      wrongAnswer,
      quiz: {score, numOfQuestions},
      navigation ,
      deck
    } = this.props;
    setlocalNotification ();

    if (answer === 'correct') {
      correctAnswer ();
    } else {
      wrongAnswer ();
    }

    if (score.correct + score.wrong === numOfQuestions - 1 ) {
      navigation.navigate ('Results', {
        id: deck.id,
      });
    }
  }

  componentDidMount () {
    const {cards, resetQuiz} = this.props;
    cards && resetQuiz (cards.length);
    clearNotification ();
  }

  render () {
    const {cards, navigation} = this.props;
    const {id, title} = this.props.deck;
    const {numOfQuestions, currentQuestion} = this.props.quiz;
    const {viewAnswer} = this.state;

    if (cards && cards.length === 0) {
      return (
        <Container>
          <Text> No Cards added </Text>
          <PrimaryButton
            onPress={() => navigation.navigate ('AddCard')}
          >
            Add card
          </PrimaryButton>
        </Container>
      );
    }

    return (
      <Container>

        <CardCount>
          <CardCountText>
            { (numOfQuestions - currentQuestion  )} / {numOfQuestions}
          </CardCountText>
        </CardCount>
        <CardView>
          <CardQuestionView viewAnswer={viewAnswer}>
            <QuestionText>
              {viewAnswer
                ? cards[currentQuestion].answer
                : cards[currentQuestion].question}

            </QuestionText>
          </CardQuestionView>
          <CardQuestionAction>
            <SecondaryButton onPress={this.toggleAnswerView.bind (this)}>
              {viewAnswer ? `View question` : `View Answer`}
            </SecondaryButton>
          </CardQuestionAction>
          <CardQuestionAction>
            <Fragment>
              <SecondaryVariantButton onPress={() => this.handleSubmit ('correct')}>
                Correct
              </SecondaryVariantButton>
              <SecondaryVariantButton onPress={() => this.handleSubmit ('wrong')}>
                Wrong
              </SecondaryVariantButton>
            </Fragment>

          </CardQuestionAction>

        </CardView>

      </Container>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators (
    {handleUpdateDeck, resetQuiz, correctAnswer, wrongAnswer},
    dispatch
  );
}

function mapStateToProps ({decks, cards, quiz , currentDeck}) {
  const id = currentDeck ;
  const deck = decks && decks[id];
  return {
    deck: deck,
    cards: deck && cards && getCardsByDeck (cards, deck),
    quiz: quiz,
  };
}
export default connect (mapStateToProps, mapDispatchToProps) (QuizScreen);
