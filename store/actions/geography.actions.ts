import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { questionConstants, filterConstants } from '../constants';
import { TypeQuestionData, AppActions } from '../../types';
import { Dispatch } from 'redux';
import { geographyConstants } from '../constants';

export const geographyQuery = gql`
  query($gid: Int!) {
    geography(id: $gid) {
      GID
      name
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
    questions(constituency: [$gid]) {
      nodes {
        QID
        subject
        type
        questionBy {
          MID
          name
        }
        ministry
        date
      }
    }
  }
`;

const statesQuery = gql`
  {
    states {
      nodes {
        name
        GID
      }
      total
    }
  }
`;

export function getGeographyById(id: number) {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const variables = {
        gid: id
      };

      const { data } = await client.query({
        query: geographyQuery,
        variables
      });

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
    } catch (error) {
      console.error(error);
    }
  };
}

export function getStates() {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const { data } = await client.query({
        query: statesQuery
      });
      const states = data.states.nodes.map(
        (each: { GID: number; name: string }) => {
          return { id: each.GID, name: each.name };
        }
      );
      dispatch({
        type: filterConstants.SET_STATES_FILTER,
        data: states
      });
    } catch (error) {
      console.error(error);
    }
  };
}
