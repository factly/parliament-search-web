import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { AppActions } from '../../types';
import { Dispatch } from 'react';
import { partyConstants, filterConstants } from '../constants';

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

const partyIdsQuery = gql`
  query {
    parties {
      nodes {
        name
        PID
        abbr
      }
    }
  }
`;

export function getPartyById(pid: number) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    try {
      const variables = { pid };
      const { data } = await client.query({ query: partyQuery, variables });

      dispatch({
        type: partyConstants.SET_PARTY,
        data: {
          ...data.party,
          members: data.members.nodes,
          total: data.members.total
        }
      });
    } catch (error) {
      console.error(error.networkError.result);
    }
  };
}

export function getPartyMembers(
  pid: number,
  limit = 10,
  page = 1,
  required: number
) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    try {
      const variables = { party: [pid], limit, page };
      const { data } = await client.query({
        query: memberWithVariablesQuery,
        variables
      });
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
    } catch (error) {
      console.error(error);
    }
  };
}

export function getAllPartyIds() {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    try {
      const { data } = await client.query({ query: partyIdsQuery });
      const party = data.parties.nodes.map((each: any) => {
        return { id: each.PID, name: each.abbr };
      });
      dispatch({
        type: filterConstants.SET_PARTY_FILTER,
        data: party
      });
      //dispatch({type: partyConstants.SET_PARTY, data: data.party.nodes});
    } catch (error) {
      console.error(error);
    }
  };
}
