import { selectedConstants } from '../constants';

const initialState = {};
initialState.q = '';
initialState.states = [];
initialState.parties = [];
initialState.education = [];
initialState.age = [25, 100];
initialState.marital = [];
initialState.sort = 'popular';

function toogleList(list, element) {
  const currentIndex = list.indexOf(element);

  if (currentIndex === -1) {
    list.push(element);
  } else {
    list.splice(currentIndex, 1);
  }
  return list;
}

function selected(state = initialState, action) {
  switch (action.type) {
    case selectedConstants.SET_ALL:
      return action.data;
    case selectedConstants.AGE_SET:
      return {
        ...state,
        age: action.data,
      };
    case selectedConstants.SET_SORT:
      return {
        ...state,
        sort: action.data,
      };
    case selectedConstants.TOOGLE_ONE:
      return {
        ...state,
        [action.field]: toogleList(state[action.field], action.data),
      };
    default:
      return state;
  }
}

export default selected;
