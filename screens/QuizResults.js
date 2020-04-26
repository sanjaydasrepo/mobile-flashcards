import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styled from 'styled-components/native';
import {resetQuiz} from '../store/actions/quiz';
import SecondaryButton from '../components/SecondaryButton';

const QuizResultsView = styled.View`
    flex:1;
    padding:8px;
    align-items:center;
    justify-content:center;
`;
const PraiseText = styled.Text`
  font-size:32px;
`;
const Subtext = styled.Text`
  font-size:24px;
`;

const PerView = styled.View`
  background:#3700b3;
  height:100px;
  width:100px;
  border-radius:50px;
  justify-content:center;
  align-items:center;
  color:#fff;
  margin-top:80px;
`;

const PerText = styled.Text`
    font-size:24px;
  color:white;
`;
const DeckText = styled.Text`
    font-size:24px;
    margin-top:20px;
`;

const StatViewWrapper = styled.View`
    flex:1;
    width:100%;
    padding:16px;
`;

const StatView = styled.View`
    flex:1;
    width:100%;
    padding:16px;
    justify-content:center;
    background:#018786;
    align-items:center;
    color:#fff;
`;
const StatText = styled.Text`
    color:white;
    font-size:24px;
`;
const ActionView = styled.View`
    flex-direction:row;
    justify-content:space-around;

`;

class QuizResults extends Component {
  // componentDidMount () {
  //   const {deck: {title, id, cards}} = this.props;
  //   const {navigation, resetQuiz} = this.props;

  //   handleAndroidBackButton (() => {
  //     resetQuiz (cards.length);
  //     navigation.navigate ('Quiz', {
  //       id,
  //       title,
  //     });
  //   });
  // }
  // componentWillUnmount () {
  //   removeAndroidBackButtonHandler ();
  // }
  render () {
    const {quiz: {score}, deck: {title, id, cards}} = this.props;
    const {navigation, resetQuiz} = this.props;

    return (
      <QuizResultsView>
        <PraiseText>
          Well done !{' '}
        </PraiseText>
        <Subtext>
          You have scored{' '}
        </Subtext>
        <PerView>
          <PerText> {score.percentage} % </PerText>

        </PerView>
        <DeckText>
          in {title}
        </DeckText>
        <StatViewWrapper>
          <StatView>
            <StatText> Correct {score.correct} </StatText>
            <StatText> Wrong {score.wrong} </StatText>

          </StatView>
        </StatViewWrapper>
        <ActionView>
          <SecondaryButton
            onPress={() => {
              resetQuiz (cards.length);
              navigation.navigate ('Quiz', {
                id,
                title,
              });
            }}
          >
            Restart Quiz
          </SecondaryButton>
          <SecondaryButton
            onPress={() => navigation.navigate ('Details', {id, title})}
          >
            Back to Deck
          </SecondaryButton>

        </ActionView>
      </QuizResultsView>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({resetQuiz}, dispatch);
}

function mapStateToProps ({decks, quiz}, {route}) {
  const {id} = route.params;

  const deck = decks && decks[id];

  return {
    id,
    deck,
    quiz,
  };
}

export default connect (mapStateToProps, mapDispatchToProps) (QuizResults);
