export const RESET_QUIZ='RESET_QUIZ';
export const CORRECT_ANSWER='CORRECT';
export const WRONG_ANSWER='WRONG';


export function resetQuiz(numOfQuestions){
    return{
        type:RESET_QUIZ ,
        numOfQuestions
    }
}
export function correctAnswer(){
    return{
        type:CORRECT_ANSWER
    }
}
export function wrongAnswer(){
    return{
        type:WRONG_ANSWER
    }
}