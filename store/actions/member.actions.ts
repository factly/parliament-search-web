import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { questionConstants } from '../constants';
import { questionsByVariablesQuery } from './question.actions';
import {
  typeMemberData,
  typeQuestionData,
  typeQuestionObject,
  typeQuestionBox,
  AppActions
} from '../../types';
import { Dispatch } from 'react';
import { memberConstants } from '../constants';

const memberQuery = gql`
  query($id: Int!) {
    member(id: $id) {
      MID
      name
      gender
      dob
      marital_status
      education
      profession
      expertise
      sons
      daughters
      phone
      email
      terms {
        constituency {
          CID
          name
          state
        }
        party {
          PID
          name
          abbr
        }
        house
        session
      }
    }
  }
`;
export const memberWithVariablesQuery = gql`
  query(
    $limit: Int
    $page: Int
    $q: String
    $gender: String
    $marital_status: [String]
    $education: [String]
    $profession: [String]
    $expertise: [String]
    $term: Int
    $party: [Int]
    $constituency: [Int]
    $house: [String]
    $session: [Int]
  ) {
    members(
      limit: $limit
      page: $page
      q: $q
      gender: $gender
      marital_status: $marital_status
      education: $education
      profession: $profession
      expertise: $expertise
      term: $term
      party: $party
      constituency: $constituency
      house: $house
      session: $session
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

export function getMemberById(id: number) {
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      let member: typeMemberData = { MID: 0, name: '', gender: '' };
      const variables = { id };
      const { data } = await client.query({ query: memberQuery, variables });
      member = data.member;
      if (member.MID) {
        const variables = { questionBy: [member.MID] };
        const { data } = await client.query({
          query: questionsByVariablesQuery,
          variables
        });
        member.popularQuestionIds = data.questions.nodes.map(
          (each: typeQuestionBox) => each.QID
        );
        dispatch({
          type: questionConstants.SET_QUESTIONS,
          data: data.questions.nodes
        });
      }
      dispatch({ type: memberConstants.SET_MEMBER, data: member });
    } catch (error) {
      console.error(error);
    }
  };
}
