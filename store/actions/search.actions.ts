import { questionsByVariablesQuery } from './question.actions';
import { client } from './client.apollo';
import { questionConstants, searchConstants } from '../constants';
import { typeQuestionBox, AppActions, typeQuestionGraphql } from '../../types';
import { Dispatch } from 'react';

export function getSearchPageQuestions(query: typeQuestionGraphql) {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const variables = query;
      const { data } = await client.query({
        query: questionsByVariablesQuery,
        variables
      });

      dispatch({
        type: questionConstants.SET_QUESTIONS,
        data: data.questions.nodes
      });

      dispatch({
        type: searchConstants.SET_SEARCHPAGE_QUESTIONS,
        data: {
          qids: data.questions.nodes.map((each: typeQuestionBox) => each.QID),
          total: data.questions.total
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}
