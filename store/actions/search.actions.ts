import { questionsByVariablesQuery } from './question.actions';
import { client } from './client.apollo';
import {
  questionConstants,
  searchConstants,
  filterConstants
} from '../constants';
import { TypeQuestionBox, AppActions, TypeQuestionGraphql } from '../../types';
import { Dispatch } from 'react';
import { gql } from 'apollo-boost';
import { selectedActions } from '.';

const filtersQuery = gql`
  query {
    parties {
      nodes {
        name
        PID
        abbr
      }
    }
    states {
      nodes {
        name
        GID
      }
    }
  }
`;

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

export function searchPageInitial(query: any) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    try {
      const { data } = await client.query({
        query: filtersQuery
      });
      const state = data.states.nodes.map(
        (each: { GID: number; name: string }) => {
          return { id: each.GID, name: each.name };
        }
      );
      const party = data.parties.nodes.map(
        (each: { GID: number; name: string }) => {
          return { id: each.GID, name: each.name };
        }
      );
      dispatch({
        type: filterConstants.SET_STATES_AND_PARTIES_FILTER,
        data: { state, party }
      });
      dispatch(selectedActions.setAll(query));
    } catch (error) {
      console.error(error);
    }
  };
}
