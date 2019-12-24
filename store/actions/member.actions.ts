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
        date
      }
    }
  }
`;

export function getMemberById(id: number) {
  return async (dispatch: Dispatch<AppActions>): Promise<void> => {
    try {
      const variables = { mid: id };
      const { data, errors } = await client.query({
        query: memberQuery,
        variables
      });

      if (errors && errors.length > 0) {
        return dispatch({
          type: appConstants.ADD_ERROR,
          data: errors[0].message
        });
      }

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
        data: { ...data.member, popularQuestionIds }
      });
    } catch (error) {
      console.error(error.networkError.result);
    }
  };
}
