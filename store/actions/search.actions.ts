import { questionsByVariablesQuery } from './question.actions';
import { client } from './client.apollo';
import {
  questionConstants,
  searchConstants,
  filterConstants,
  appConstants
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
    return client
      .query({
        query: questionsByVariablesQuery,
        variables: query
      })
      .then(({ data }) => {
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
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (networkError) {
          return dispatch({
            type: appConstants.ADD_ERROR,
            data: 'NETWORK_ERROR'
          });
        }
        if (graphQLErrors) {
          return dispatch({
            type: appConstants.ADD_ERROR,
            data: 'GRAPHQL_ERROR'
          });
        }
      });
  };
}

export function searchPageInitial(query: any) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query: filtersQuery
      })
      .then(({ data }) => {
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
        if (!data.states || !data.parties) {
          return dispatch({
            type: appConstants.ADD_ERROR,
            data: 'INVALID_ID'
          });
        }
        dispatch({
          type: filterConstants.SET_STATES_AND_PARTIES_FILTER,
          data: { state, party }
        });
        dispatch(selectedActions.setAll(query));
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (networkError) {
          return dispatch({
            type: appConstants.ADD_ERROR,
            data: 'NETWORK_ERROR'
          });
        }
        if (graphQLErrors) {
          return dispatch({
            type: appConstants.ADD_ERROR,
            data: 'GRAPHQL_ERROR'
          });
        }
      });
  };
}
