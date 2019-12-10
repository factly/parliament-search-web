import {questionConstants} from '../constants';
import { typeQuestionObject } from '../../types';

const initialState:typeQuestionObject = {};

function questions(state = initialState, action : {type : string , data : typeQuestionObject})  {
    switch (action.type) {
      case questionConstants.SET_QUESTION:
        return {...state, ...action.data};
      case questionConstants.SET_QUESTIONS:
        Object.keys(action.data).map(function (key , value) {
          action.data[+key] = state[+key] && state[+key].answer ? state[+key] : action.data[+key]
        });
        return {...state , ...action.data};  
      default:
        return state;
    }
  }
  
  export default questions;