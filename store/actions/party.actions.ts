import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { typePartyData, AppActions } from '../../types';
import { Dispatch } from 'react';
import { partyConstants } from '../constants';

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
          constituency {
            CID
            name
            state
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
          constituency {
            CID
            name
            state
          }
          house
          session
        }
      }
      total
    }
  }
`;

export function getPartyById(pid: number) {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      let party: typePartyData = {
        PID: 0,
        members: [],
        name: '',
        abbr: '',
        total: 0
      };
      const variables = { pid };
      const { data } = await client.query({ query: partyQuery, variables });
      party = data.party;
      party.total = data.members.total;
      party.members = data.members.nodes;
      dispatch({ type: partyConstants.SET_PARTY, data: party });
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
  return async (dispatch: Dispatch<AppActions>) => {
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
      console.log(error);
    }
  };
}
