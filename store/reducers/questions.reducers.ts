/* eslint-disable no-case-declarations */
import { questionConstants } from '../constants';
import { TypeQuestionObject, TypeQuestionData } from '../../types';

const initialState: TypeQuestionObject = {};

function questions(
  state = initialState,
  action: { type: string; data: TypeQuestionData[] }
): TypeQuestionObject {
  switch (action.type) {
    case questionConstants.SET_QUESTIONS:
      const newQuestions: TypeQuestionObject = {};
      action.data.forEach((each: TypeQuestionData) => {
        if (!state[+each.QID] || !state[+each.QID].answer)
          newQuestions[+each.QID] = each;

        return state;
      });
      return { ...state, ...newQuestions };
    default:
      return state;
  }
}

export default questions;
