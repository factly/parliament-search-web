import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { questionConstants } from '../constants';
import { memberWithVariablesQuery } from './member.actions';
import { questionsByVariablesQuery } from './question.actions';
import {
  typeConstituencyData,
  typeQuestionData,
  typeQuestionObject,
  AppActions
} from '../../types';
import { Dispatch } from 'redux';
import { constituencyConstants } from '../constants';

export const constituencyQuery = gql`
  query($cid: Int!) {
    constituency(id: $cid) {
      CID
      name
      state
      from
      to
    }
    members(
      constituency: [$cid]
    ) {
      nodes {
        MID
        name
        terms {
          party {
            PID
            name
            abbr
          }
          house
          session
        }
      }
      total
    }
    questions(
      constituency: [$cid]
    ) {
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

export function getConstituencyById(id: number) {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const variables = {
        cid : id
      };

      const { data } = await client.query({
        query: constituencyQuery,
        variables
      });

      const popularQuestionIds: number[] = data.questions.nodes.map(
        (each: typeQuestionData) => each.QID
      );

      dispatch({
        type: questionConstants.SET_QUESTIONS,
        data: data.questions.nodes
      });

      dispatch({
        type: constituencyConstants.SET_CONSTITUENCY,
        data: { ...data.constituency, members: data.members.nodes, popularQuestionIds}
      });
    } catch (error) {
      console.error(error);
    }
  };
}
