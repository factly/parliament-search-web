import {questionConstants} from '../constants';
import { typeQuestionObject, typeQuestionData } from '../../types';

function setQuestion(state:typeQuestionData){
    return {type : questionConstants.GET_QUESTION_BY_ID, data : state}
}

function setPopularQuestions(state:typeQuestionObject){
    return {type : questionConstants.SET_QUESTIONS, data : state}
}

export const questionActions = {
    setQuestion,
    setPopularQuestions
}