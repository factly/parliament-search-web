import {questionConstants} from '../constants';
import { typeQuestionObject, typeQuestionData } from '../../types';

const initialState:typeQuestionObject = {};

function questions(state = initialState, action : {type : string , data : typeQuestionData[]})  {
    switch (action.type) {
      case questionConstants.SET_QUESTIONS:
        let newQuestions: typeQuestionObject = {};
        action.data.forEach((each: typeQuestionData) => {
          if(!state[+each.QID] || !state[+each.QID].answer) 
            newQuestions[+each.QID] = each

          return null
        })
        return {...state , ...newQuestions};  
      default:
        return state;
    }
  }
  
  export default questions;