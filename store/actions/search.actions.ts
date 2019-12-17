import { questionsByVariablesQuery } from './question.actions';
import { client } from './client.apollo';
import { questionConstants, searchConstants, selectedConstants } from '../constants';
import { typeQuestionBox, AppActions, typeSetAllState } from '../../types';
import { Dispatch } from 'react';

export function getSearchPageQuestionsInti(query: typeSetAllState) {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      /*const variables = query;
      console.log(query)
      const { data } = await client.query({ query: questionsByVariablesQuery, variables });*/
      dispatch({
        type: selectedConstants.SET_ALL,
        data: query
      })

      /*dispatch({
          type: questionConstants.SET_QUESTIONS,
          data: data.questions.nodes
      })

      dispatch({
        type: searchConstants.SET_SEARCHPAGE_QUESTIONS,
        data: {qids: data.questions.nodes.map((each: typeQuestionBox) => each.QID), total: data.questions.total }
      });*/
    } catch (error) {
      console.error(error);
    }
  }
};

export function getSearchPageQuestions(query: typeSetAllState) {
    return async (dispatch: Dispatch<AppActions>) => {
      try {
        const variables = query;
        const { data } = await client.query({ query: questionsByVariablesQuery, variables });

        dispatch({
            type: questionConstants.SET_QUESTIONS,
            data: data.questions.nodes
        })

        dispatch({
          type: searchConstants.SET_SEARCHPAGE_QUESTIONS,
          data: {qids: data.questions.nodes.map((each: typeQuestionBox) => each.QID), total: data.questions.total }
        });
        
      } catch (error) {
        console.error(error);
      }
    }
};
