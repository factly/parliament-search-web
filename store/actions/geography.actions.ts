import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { questionConstants, appConstants } from '../constants';
import { TypeQuestionData, AppActions } from '../../types';
import { Dispatch } from 'redux';
import { geographyConstants } from '../constants';
import { questionNodesQuery } from './question.actions';

export const geographyQuery = gql(String.raw`
  query($gid: Int!) {
    geography(id: $gid) {
      GID
      name
      type
      parent {
        name
      }
      from
      to
    }
    members(constituency: [$gid]) {
      nodes {
        MID
        name
        gender
        terms {
          party {
            PID
            name
            abbr
          }
          house {
            name
          }
          session
        }
      }
      total
    }
    questions(constituency: [$gid], state: [$gid]) {
      nodes{
        ${questionNodesQuery}
      }
    }
  }
`);

export function getGeographyById(gid: number) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query: geographyQuery,
        variables: {
          gid
        }
      })
      .then(({ data }) => {
        if (data.geography === null) {
          dispatch({
            type: appConstants.ADD_ERROR,
            data: 'INVALID_ID'
          });
        } else {
          const popularQuestionIds: number[] = data.questions.nodes.map(
            (each: TypeQuestionData) => each.QID
          );
          dispatch({
            type: questionConstants.SET_QUESTIONS,
            data: data.questions.nodes
          });

          dispatch({
            type: geographyConstants.SET_GEOGRAPHY,
            data: {
              ...data.geography,
              members: data.members.nodes,
              popularQuestionIds
            }
          });
        }
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (networkError) {
          dispatch({
            type: appConstants.ADD_ERROR,
            data: 'NETWORK_ERROR'
          });
        }
        if (graphQLErrors) {
          dispatch({
            type: appConstants.ADD_ERROR,
            data: 'GRAPHQL_ERROR'
          });
        }
        if (!networkError && !graphQLErrors) {
          dispatch({
            type: appConstants.ADD_ERROR,
            data: 'SOMETHING_WENT_WRONG'
          });
        }
      });
  };
}
