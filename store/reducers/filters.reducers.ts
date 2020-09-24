import { TypeFilter } from '../../types';
import { filterConstants } from '../constants';

const initialState: TypeFilter = {};
initialState.party = [];
initialState.state = [];
initialState.house = [
  { id: 1, name: 'Lok Sabha' },
  { id: 2, name: 'Rajya Sabha' }
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
initialState.topic = [
  { id: 1, name: 'Agriculture', image: "/static/images/topics/Agriculture.png" },
  { id: 2, name: 'Art & Culture', image: "/static/images/topics/Art and Culture.png" },
  { id: 3, name: 'Commerce', image: "/static/images/topics/Commerce.png" },
  { id: 4, name: 'Mining', image: "/static/images/topics/Mining.png" },
  { id: 5, name: 'Parliamentary Affairs', image: "/static/images/topics/Parliamentary Affairs.png" },
  { id: 6, name: 'Water & Sanitation', image: "/static/images/topics/Water and Sanitation.png" },
  { id: 7, name: 'Information & Communications', image: "/static/images/topics/Communications.png" },
  { id: 8, name: 'Defence', image: "/static/images/topics/Defence.png" },
  { id: 9, name: 'Economy', image: "/static/images/topics/Economy.png" },
  { id: 10, name: 'Education & Skilling', image: "/static/images/topics/Education.png" },
  { id: 11, name: 'Environment & Forest', image: "/static/images/topics/Forest.png" },
  { id: 12, name: 'Women', image: "/static/images/topics/Women.png" },
  { id: 13, name: 'Finance', image: "/static/images/topics/Finance.png" },
  { id: 14, name: 'Food', image: "/static/images/topics/Food.png" },
  { id: 15, name: 'Foreign Affairs', image: "/static/images/topics/Foreign Affairs.png" },
  { id: 16, name: 'Governance & Administration', image: "/static/images/topics/Governance and Administration.png" },
  { id: 17, name: 'Health & Family Welfare', image: "/static/images/topics/Health and Family Welfare.png" },
  { id: 18, name: 'Home Affairs, Law & Order', image: "/static/images/topics/Home Affairs, Law and Order.png" },
  { id: 19, name: 'Housing', image: "/static/images/topics.jpg" },
  { id: 20, name: 'Industries', image: "/static/images/topics/Industries.png" },
  { id: 21, name: 'Information & Broacasting', image: "/static/images/topics/Broacasting.png" },
  { id: 22, name: 'Infrastructure', image: "/static/images/topics/Infrastructure.png" },
  { id: 23, name: 'Urban', image: "/static/images/topics/Urban.png" },
  { id: 24, name: 'Labour & Employment', image: "/static/images/topics/Labour and Employment.png" },
  { id: 25, name: 'Energy', image: "/static/images/topics/Energy.png" },
  { id: 26, name: 'Rural', image: "/static/images/topics/Rural.png" },
  { id: 27, name: 'Science & Technology', image: "/static/images/topics/Science and Technology.png" },
  { id: 28, name: 'Social Development', image: "/static/images/topics.jpg" },
  { id: 29, name: 'Transport', image: "/static/images/topics/Transportation.png" },
  { id: 30, name: 'Travel & Tourism', image: "/static/images/topics/Tourism and Culture.png" },
  { id: 31, name: 'Youth', image: "/static/images/topics/Youth.png" },
  { id: 32, name: 'Sports', image: "/static/images/topics/Sports.png" }
];

function filters(
  state = initialState,
  action: { type: string; data: TypeFilter }
): TypeFilter {
  switch (action.type) {
    case filterConstants.SET_STATES_AND_PARTIES_FILTER:
      return { ...state, party: action.data.party, state: action.data.state };
    default:
      return state;
  }
}

export default filters;
