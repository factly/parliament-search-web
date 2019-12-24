import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { questionConstants, appConstants } from '../constants';
import { TypeQuestionData, AppActions } from '../../types';
import { Dispatch } from 'redux';
import { geographyConstants } from '../constants';

export const geographyQuery = gql`
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
    members(geography: [$gid]) {
      nodes {
        MID
        name
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
      nodes {
        QID
        subject
        type
        questionBy {
          MID
          name
        }
        ministry {
          name
        }
        date
      }
    }
  }
`;

export function getGeographyById(gid: number) {
  return async (dispatch: Dispatch<AppActions>) => {
    return client
      .query({
        query: geographyQuery,
        variables: {
          gid
        }
      })
      .then(({ data }) => {
        if (data.geography === null) {
          return dispatch({
            type: appConstants.ADD_ERROR,
            data: 'INVALID_ID'
          });
        }
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
