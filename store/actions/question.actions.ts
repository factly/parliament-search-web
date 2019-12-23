import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { AppActions } from '../../types';
import { Dispatch } from 'react';
import { questionConstants } from '../constants';

export const questionQuery = gql`
  query($id: Int!) {
    question(id: $id) {
      QID
      subject
      type
      question
      questionBy {
        MID
        name
      }
      answer
      ministry
      date
    }
  }
`;
export const questionsByVariablesQuery = gql`
  query(
    $limit: Int
    $page: Int
    $q: String
    $house: String
    $type: String
    $ministry: [String]
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
  ) {
    questions(
      limit: $limit
      page: $page
      q: $q
      house: $house
      type: $type
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
      total
    }
  }
`;

export function getQuestionById(id: number) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    try {
      const variables = { id };
      const { data } = await client.query({ query: questionQuery, variables });
      dispatch({
        type: questionConstants.SET_QUESTIONS,
        data: [data.question]
      });
    } catch (error) {
      console.error(error);
    }
  };
}
