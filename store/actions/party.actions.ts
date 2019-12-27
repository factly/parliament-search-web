import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { AppActions } from '../../types';
import { Dispatch } from 'react';
import { partyConstants, appConstants } from '../constants';

const partyQuery = gql`
  query($pid: Int!, $limit: Int, $page: Int) {
    party(id: $pid) {
      PID
      name
      abbr
    }
    members(party: [$pid], limit: $limit, page: $page) {
      nodes {
        MID
        name
        terms {
          geography {
            GID
            name
            parent {
              name
            }
          }
        }
      }
      total
    }
  }
`;

const memberWithVariablesQuery = gql`
  query($limit: Int, $page: Int, $party: [Int]) {
    members(limit: $limit, page: $page, party: $party) {
      nodes {
        MID
        name
        terms {
          party {
            PID
            name
            abbr
          }
          geography {
            GID
            name
            parent {
              name
            }
          }
          house {
            name
          }
          session
        }
      }
      total
    }
  }
`;

export function getPartyById(pid: number) {
  return (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query: partyQuery,
        variables: { pid }
      })
      .then(({ data }) => {
        if (data.party === null) {
          return dispatch({
            type: appConstants.ADD_ERROR,
            data: 'INVALID_ID'
          });
        }
        dispatch({
          type: partyConstants.SET_PARTY,
          data: {
            ...data.party,
            members: data.members.nodes,
            total: data.members.total
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

export function getPartyMembers(
  pid: number,
  limit = 10,
  page = 1,
  required: number
) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query: memberWithVariablesQuery,
        variables: { party: [pid], limit, page }
      })
      .then(({ data }) => {
        let members = [];
        if (required <= data.members.nodes.length)
          members = data.members.nodes.slice(
            data.members.nodes.length - required,
            data.members.nodes.length + 1
          );

        dispatch({
          type: partyConstants.ADD_PARTY_MEMBERS,
          data: { pid, members }
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
