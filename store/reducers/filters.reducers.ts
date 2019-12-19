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
  { id: 4, name: 'Intermediate' },
  { id: 5, name: 'High School' },
  { id: 6, name: 'Not mentioned' }
];

initialState.marital = [
  { id: 1, name: 'Married' },
  { id: 2, name: 'Widow' },
  { id: 3, name: 'Divorcee' },
  { id: 4, name: 'Unmarried' },
  { id: 5, name: 'Widower' },
];

initialState.type = [
  { id: 1, name: 'Stared' },
  { id: 2, name: 'Unstarred' }
];

initialState.gender = [
  { id: 1, name: 'Female' },
  { id: 2, name: 'Male' },
  { id: 3, name: 'Other' }
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
