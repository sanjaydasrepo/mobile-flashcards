import {
  RESET_QUIZ,
  CORRECT_ANSWER,
  WRONG_ANSWER,
} from '../actions/quiz';

const initState = {
  numOfQuestions: 0,
  currentQuestion: 0,
  score: {
    correct: 0,
    wrong: 0,
    percentage: 0,
  },
};

export default function quiz (state = initState, action) {
  switch (action.type) {
    case RESET_QUIZ:
      return {
        numOfQuestions:action.numOfQuestions,
        currentQuestion: 0,
        score: {
          correct: 0,
          wrong: 0,
          percentage: 0,
        },
      };
    case CORRECT_ANSWER:
      let per = Math.round( ( (state.score.correct + 1) / state.numOfQuestions )* 100 , 0 );

      if (state.currentQuestion !== state.numOfQuestions - 1) {
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          score: {
            ...state.score,
            correct: state.score.correct + 1,
            percentage:per
          },
        };
      } else if (state.score.correct + state.score.wrong !== state.numOfQuestions) {
        return {
          ...state,
          score: {
            ...state.score,
            correct: state.score.correct + 1,
            percentage:per
          },
        };
      }
      return state;
    case WRONG_ANSWER:

     per = Math.round( ( (state.score.correct ) / state.numOfQuestions )* 100 ,0);

      if (state.currentQuestion !== state.numOfQuestions - 1) {
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          score: {
            ...state.score,
            wrong: state.score.wrong + 1,
            percentage: per
          },
        };
      } else if (state.score.correct + state.score.wrong !== state.numOfQuestions) {
        return {
          ...state,
          score: {
            ...state.score,
            wrong: state.score.wrong + 1,
            percentage:per
          },
        };
      }
      return state;
    default:
      return state;
  }
}
