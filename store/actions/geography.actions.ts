import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { questionConstants } from '../constants';
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

export function getGeographyById(id: number) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
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
