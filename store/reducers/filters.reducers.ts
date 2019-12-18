import { typeFilter } from '../../types';
import { filterConstants } from '../constants';

const initialState: typeFilter = {};
initialState.topics = [
  {
    id: 1,
    name: 'Agriculture'
  },
  {
    id: 2,
    name: 'Art & Culture'
  }
];

initialState.education = [
  { id: 1, name: 'Doctorate' },
  { id: 2, name: 'Post Graduate' },
  { id: 3, name: 'Graduation' },
  { id: 4, name: 'Diploma' },
  { id: 5, name: 'Intermediate' },
  { id: 6, name: 'Matriculate' },
  { id: 7, name: 'High School' }
];

initialState.marital = [
  { id: 1, name: 'Single' },
  { id: 2, name: 'Married' },
  { id: 3, name: 'Widowed' },
  { id: 4, name: 'Divorced' }
];

initialState.type = [
  { id: 1, name: 'Stared' },
  { id: 2, name: 'Unstarred' }
];

initialState.gender = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' }
];
initialState.party = [];
initialState.state = [];
/*const initialState: typeFilter = {
  topics,
  gender,
  education,
  marital,
  type
};
*/
function filters(
  state = initialState,
  action: { type: string; data: { id: number; name: string }[] }
) {
  switch (action.type) {
    case filterConstants.SET_PARTY_FILTER:
      return { ...state, party: action.data };
    case filterConstants.SET_STATES_FILTER:
      return { ...state, state: action.data };
    default:
      return state;
  }
}

export default filters;
