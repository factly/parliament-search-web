import { gql } from 'apollo-boost';
import { client } from './client.apollo';

import { Dispatch } from 'redux';

// import constants
import { questionConstants, appConstants, memberConstants } from '../constants';

// import types
import { TypeQuestionBox, AppActions } from '../../types';

// import actions
import { questionNodesQuery } from './question.actions';

export const memberNodesQuery = `
MID
name
gender
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
`;

const memberQuery = gql(String.raw`
  query($mid: Int!) {
    member(id: $mid) {
      ${memberNodesQuery}
      gender
      dob
      maritalStatus
      education
      profession
      expertise
      sons
      daughters
      phone
      email
    }
    questions(questionBy: [$mid]) {
      nodes {
        ${questionNodesQuery}
      } 
    }
  }
`);

export const membersByVariableQuery = gql(String.raw`
  query(
    $limit: Int
    $page: Int
    $q: String
    $gender: [Int]
    $ageMin: Float
    $ageMax: Float
    $maritalStatus: [Int]
    $sons: [Int]
    $daughters: [Int]
    $education: [Int]
    $profession: [String]
    $expertise: [String]
    $terms: Int
    $party: [Int]
    $constituency: [Int]
    $state: [Int]
    $house: [Int]
    $session: [Int]
  ) {
    members(
      limit: $limit
      page: $page
      q: $q
      gender: $gender
      ageMin: $ageMin
      ageMax: $ageMax
      maritalStatus: $maritalStatus
      sons: $sons
      daughters: $daughters
      education: $education
      profession: $profession
      expertise: $expertise
      terms: $terms
      party: $party
      constituency: $constituency
      state: $state
      house: $house
      session: $session
    ) {
      nodes {
        ${memberNodesQuery} 
        gender
        dob
        education
      }
      total
    }
  }
`);

export function getMemberById(mid: number) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query: memberQuery,
        variables: { mid }
      })
      .then(({ data }) => {
        if (data.member === null) {
          dispatch({
            type: appConstants.ADD_ERROR,
            data: 'INVALID_ID'
          });
        } else {
          const popularQuestionIds: number[] = data.questions.nodes.map(
            (each: TypeQuestionBox) => each.QID
          );

          dispatch({
            type: questionConstants.SET_QUESTIONS,
            data: data.questions.nodes
          });

          dispatch({
            type: memberConstants.SET_MEMBER,
            data: [{ ...data.member, popularQuestionIds }]
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
