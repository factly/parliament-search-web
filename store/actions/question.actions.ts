import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { AppActions } from '../../types';
import { Dispatch } from 'react';
import { questionConstants, appConstants } from '../constants';

export const questionNodesQuery = `
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
house {
  name
}
date
`;

export const questionQuery = gql(String.raw`
  query($id: Int!) {
    question(id: $id) {
      ${questionNodesQuery}
      question
      answer
      englishPdf
      hindiPdf
    }
  }
`);

export const questionsByVariablesQuery = gql(String.raw`
  query(
    $limit: Int
    $page: Int
    $q: String
    $type: String
    $ministry: [Int]
    $questionBy: [Int]
    $gender: [Int]
    $maritalStatus: [Int]
    $education: [Int]
    $profession: [String]
    $expertise: [String]
    $terms: Int
    $party: [Int]
    $constituency: [Int]
    $sort: String
    $state: [Int]
    $ageMin: Float
    $ageMax: Float
    $house: [Int]
  ) {
    questions(
      limit: $limit
      page: $page
      q: $q
      house: $house
      questionType: $type
      ministry: $ministry
      questionBy: $questionBy
      gender: $gender
      maritalStatus: $maritalStatus
      education: $education
      profession: $profession
      expertise: $expertise
      terms: $terms
      party: $party
      constituency: $constituency
      state: $state
      sort: $sort
      ageMin: $ageMin
      ageMax: $ageMax
      questionHouse: $house
    ) {
      nodes {
        ${questionNodesQuery}
      }
      total
    }
  }
`);

export function getQuestionById(id: number) {
  return (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query: questionQuery,
        variables: { id }
      })
      .then(({ data }) => {
        if (data.question === null) {
          return dispatch({
            type: appConstants.ADD_ERROR,
            data: 'INVALID_ID'
          });
        }
        dispatch({
          type: questionConstants.SET_QUESTIONS,
          data: [data.question]
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
