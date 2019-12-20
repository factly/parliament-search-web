import { questionsByVariablesQuery } from './question.actions';
import { client } from './client.apollo';
import { questionConstants, searchConstants } from '../constants';
import { TypeQuestionBox, AppActions, TypeQuestionGraphql } from '../../types';
import { Dispatch } from 'react';

export function getSearchPageQuestions(query: TypeQuestionGraphql) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
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
          qids: data.questions.nodes.map((each: TypeQuestionBox) => each.QID),
          total: data.questions.total
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
}
