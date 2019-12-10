import {questionConstants} from '../constants';
import { typeQuestionObject } from '../../types';

function setQuestion(state:typeQuestionObject){
    return {type : questionConstants.SET_QUESTION, data : state}
}

function setPopularQuestions(state:typeQuestionObject){
    return {type : questionConstants.SET_QUESTIONS, data : state}
}

export const questionActions = {
    setQuestion,
    setPopularQuestions
}