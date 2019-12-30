import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { questionConstants, appConstants } from '../constants';
import { TypeQuestionBox, AppActions } from '../../types';
import { Dispatch } from 'react';
import { memberConstants } from '../constants';

const memberQuery = gql`
  query($mid: Int!) {
    member(id: $mid) {
      MID
      name
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
      terms {
        geography {
          GID
          name
          parent {
            name
          }
        }
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
    questions(questionBy: [$mid]) {
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
        house {
          name
        }
        date
      }
    }
  }
`;

export const membersByVariableQuery = gql`
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
        MID
        name
        gender
        dob
        education
        terms {
          geography {
            GID
            name
            parent {
              name
            }
          }
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
  }
`;

export function getMemberById(mid: number) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    return client
      .query({
        query: memberQuery,
        variables: { mid }
      })
      .then(({ data }) => {
        if (data.member === null) {
          return dispatch({
            type: appConstants.ADD_ERROR,
            data: 'INVALID_ID'
          });
        }

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
