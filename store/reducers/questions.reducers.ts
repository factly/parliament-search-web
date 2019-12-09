import {questionConstants} from '../constants';
import { typeQuestionObject } from '../../types';

const initialState:typeQuestionObject = {};

function questions(state = initialState, action : {type : string , data : any})  {
    switch (action.type) {
      case questionConstants.GET_QUESTION_BY_ID:
        return {...state,[action.data.QID] : action.data};
      case questionConstants.SET_QUESTIONS:
        Object.keys(action.data).map(function (key , value) {
          action.data[+key] = state[+key] && state[+key].answer ? state[+key] : action.data[+key]
        })
        return {...state , ...action.data};  
      default:
        return state;
    }
  }
  
  export default questions;