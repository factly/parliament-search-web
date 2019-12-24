import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { AppActions } from '../../types';
import { Dispatch } from 'react';
import { questionConstants, appConstants } from '../constants';

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
      ministry {
        name
      }
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
        ministry {
          name
        }
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
      const { data, errors } = await client.query({
        query: questionQuery,
        variables
      });

      if (errors && errors.length > 0) {
        return dispatch({
          type: appConstants.ADD_ERROR,
          data: errors[0].message
        });
      }

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
    } catch (error) {
      console.error(error);
    }
  };
}
