import { selectedConstants } from '../constants';
import { typeSelected, typeSetAllSelected } from '../../types';

type actionType = {
  type: string;
  data: typeSetAllSelected;
};

const initialState: typeSelected = {
  q: '',
  sort: 'newest',
  page: 1,
  education: [],
  marital: [],
  age: [25, 100],
  gender: [],
  terms: 0,
  questionBy: [],
  geography: [],
  party: [],
  state: [],
  constituency: []
};

function toogleList(list: number[], element: number) {
  const currentIndex = list.indexOf(element);

  if (currentIndex === -1) {
    list.push(element);
  } else {
    list.splice(currentIndex, 1);
  }
  return list;
}

function selected(state = initialState, action: actionType) {
  switch (action.type) {
    case selectedConstants.SET_ALL:
      const result = {
        ...state,
        q: action.data.q ? action.data.q : initialState.q,
        page: action.data.page ? +action.data.page : initialState.page,
        questionBy: action.data.questionBy
          ? action.data.questionBy
          : initialState.questionBy,
        constituency: action.data.constituency
          ? action.data.constituency
          : initialState.constituency
      };
      return result;
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
      const fieldKey: keyof typeSelected = Object.keys(
        action.data
      )[0] as keyof typeSelected;
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
