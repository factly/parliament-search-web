import { questionsByVariablesQuery } from './question.actions';
import { client } from './client.apollo';
import {
  questionConstants,
  searchConstants,
  filterConstants,
  appConstants,
  memberConstants
} from '../constants';
import {
  TypeQuestionBox,
  AppActions,
  TypeQuestionGraphql,
  TypeMemberData,
  TypeQuestionData
} from '../../types';
import { Dispatch } from 'react';
import { gql } from 'apollo-boost';
import { selectedActions } from './selected.actions';
import { membersByVariableQuery } from './member.actions';
import { ParsedUrlQuery } from 'querystring';

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

export function getSearchPageResults(variables: TypeQuestionGraphql) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query:
          variables.category === 'questions'
            ? questionsByVariablesQuery
            : membersByVariableQuery,
        variables
      })
      .then(({ data }) => {
        const search: {
          nodes: TypeQuestionBox[] | TypeMemberData[];
          total: number;
        } =
          variables.category === 'questions'
            ? data.questions
            : variables.category === 'members'
            ? data.members
            : null;

        if (variables.category === 'questions')
          dispatch({
            type: questionConstants.SET_QUESTIONS,
            data: search.nodes as TypeQuestionData[]
          });
        else
          dispatch({
            type: memberConstants.SET_MEMBERS,
            data: search.nodes as TypeMemberData[]
          });

        dispatch({
          type: searchConstants.SET_SEARCHPAGE,
          data: {
            ids:
              variables.category === 'questions'
                ? (search.nodes as TypeQuestionData[]).map(
                    (each: TypeQuestionBox) => each.QID
                  )
                : (search.nodes as TypeMemberData[]).map(
                    (each: TypeMemberData) => each.MID
                  ),
            total: search.total
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

export function searchPageInitial(query: ParsedUrlQuery) {
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
          (each: { PID: number; name: string }) => {
            return { id: each.PID, name: each.name };
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
