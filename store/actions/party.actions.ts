import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { AppActions } from '../../types';
import { Dispatch } from 'react';
import { partyConstants, appConstants } from '../constants';

const partyQuery = gql`
  query($PID: Int!, $limit: Int, $page: Int) {
    party(id: $PID) {
      PID
      name
      abbr
    }
    members(party: [$PID], limit: $limit, page: $page) {
      nodes {
        MID
        name
        gender
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
        gender
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

export function getPartyById(PID: number) {
  return (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query: partyQuery,
        variables: { PID }
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
  PID: number,
  limit = 10,
  page = 1,
  required: number
) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query: memberWithVariablesQuery,
        variables: { party: [PID], limit, page }
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
          data: { PID, members }
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
