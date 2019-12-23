/* eslint-disable no-case-declarations */
import { selectedConstants } from '../constants';
import { TypeSelected, TypeSetAllSelected } from '../../types';

type actionType = {
  type: string;
  data: TypeSetAllSelected;
};

const initialState: TypeSelected = {
  q: '',
  sort: 'newest',
  page: 1,
  education: [],
  marital: [],
  age: [25, 100],
  gender: [],
  terms: 0,
  questionBy: [],
  party: [],
  state: [],
  constituency: [],
  topic: []
};

function toogleList(list: number[], element: number): number[] {
  const currentIndex = list.indexOf(element);

  if (currentIndex === -1) {
    list.push(element);
  } else {
    list.splice(currentIndex, 1);
  }
  return list;
}

function selected(state = initialState, action: actionType): TypeSelected {
  switch (action.type) {
    case selectedConstants.SET_ALL:
      return {
        ...initialState,
        q: action.data.q ? action.data.q : initialState.q,
        sort: action.data.sort ? action.data.sort : initialState.sort,
        terms:
          action.data.terms && action.data.terms > 1
            ? action.data.terms
            : initialState.terms,
        education:
          action.data.education && action.data.education.length > 0
            ? action.data.education
            : initialState.education,
        marital:
          action.data.marital && action.data.marital.length > 0
            ? action.data.marital
            : initialState.marital,
        gender:
          action.data.gender && action.data.gender.length > 0
            ? action.data.gender
            : initialState.gender,
        party:
          action.data.party && action.data.party.length > 0
            ? action.data.party
            : initialState.party,
        state:
          action.data.state && action.data.state.length > 0
            ? action.data.state
            : initialState.state,
        constituency:
          action.data.constituency && action.data.constituency.length > 0
            ? action.data.constituency
            : initialState.constituency,
        topic:
          action.data.topic && action.data.topic.length > 0
            ? action.data.topic
            : initialState.topic,
        questionBy:
          action.data.questionBy && action.data.questionBy.length > 0
            ? action.data.questionBy
            : initialState.questionBy
      };
    case selectedConstants.SET_SORT:
      return {
        ...state,
        sort: action.data.sort ? action.data.sort : initialState.sort,
        page: initialState.page
      };
    case selectedConstants.SET_PAGE:
      return {
        ...state,
        page: action.data.page ? action.data.page : initialState.page
      };
    case selectedConstants.SET_AGE:
      return {
        ...state,
        age: action.data.age ? action.data.age : initialState.age,
        page: initialState.page
      };
    case selectedConstants.SET_TERMS:
      return {
        ...state,
        terms: action.data.terms ? action.data.terms : initialState.terms,
        page: initialState.page
      };
    case selectedConstants.TOOGLE_ONE:
      const fieldKey: keyof TypeSelected = Object.keys(
        action.data
      )[0] as keyof TypeSelected;
      return {
        ...state,
        [fieldKey]: toogleList(
          state[fieldKey] as number[],
          action.data[fieldKey] as number
        ),
        page: initialState.page
      };
    default:
      return state;
  }
}

export default selected;
