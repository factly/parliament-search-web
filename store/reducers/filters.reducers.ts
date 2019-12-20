import { TypeFilter } from '../../types';
import { filterConstants } from '../constants';

const initialState: TypeFilter = {};
initialState.topic = [
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
  { id: 5, name: 'Widower' }
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
initialState.topic = [
  { id: 1, name: 'Agriculture' },
  { id: 2, name: 'Art & Culture' },
  { id: 3, name: 'Commerce' },
  { id: 4, name: 'Mining' },
  { id: 5, name: 'Parliamentary Affairs' },
  { id: 6, name: 'Water & Sanitation' },
  { id: 7, name: 'Information & Communications' },
  { id: 8, name: 'Defence' },
  { id: 9, name: 'Economy' },
  { id: 10, name: 'Education & Skilling' },
  { id: 11, name: 'Environment & Forest' },
  { id: 12, name: 'Water Resources' },
  { id: 13, name: 'Finance' },
  { id: 14, name: 'Food' },
  { id: 15, name: 'Foreign Affairs' },
  { id: 16, name: 'Governance & Administration' },
  { id: 17, name: 'Health & Family Welfare' },
  { id: 18, name: 'Home Affairs, Law & Order' },
  { id: 19, name: 'Housing' },
  { id: 20, name: 'Industries' },
  { id: 21, name: 'Information & Broacasting' },
  { id: 22, name: 'Infrastructure' },
  { id: 23, name: 'Urban' },
  { id: 24, name: 'Labour & Employment' },
  { id: 25, name: 'Energy' },
  { id: 26, name: 'Rural' },
  { id: 27, name: 'Science & Technology' },
  { id: 28, name: 'Social Development' },
  { id: 29, name: 'Transport' },
  { id: 30, name: 'Travel & Tourism' },
  { id: 31, name: 'Youth' },
  { id: 32, name: 'Sports' },
  { id: 33, name: 'Women' }
];

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
