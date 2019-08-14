import { selectedConstants } from '../constants';

const initialState = {};
initialState.q = '';
initialState.states = [];
initialState.parties = [];
initialState.education = [];
initialState.age = [25, 100];
initialState.marital = [];
initialState.sort = 'popular';

function newList(list, element) {
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
      if (action.data.q) initialState.q = action.data.q.trim();
      if (action.data.states) {
        let tempStates = action.data.states;
        if (typeof (tempStates) === 'string') tempStates = [tempStates];
        initialState.states = tempStates
          .filter((value) => value.trim() && value > 0 && value < 35)
          .map((item) => parseInt(item, 10));
      }
      if (action.data.parties) {
        let tempParties = action.data.parties;
        if (typeof (tempParties) === 'string') tempParties = [tempParties];
        initialState.parties = tempParties
          .filter((value) => value.trim() && value > 0 && value < 61)
          .map((item) => parseInt(item, 10));
      }
      if (action.data.education) {
        let tempEducation = action.data.education;
        if (typeof (tempEducation) === 'string') tempEducation = [tempEducation];
        initialState.education = tempEducation
          .filter((value) => value.trim() && value > 0 && value < 7)
          .map((item) => parseInt(item, 10));
      }
      if (action.data.marital) {
        let tempMarital = action.data.marital;
        if (typeof (tempMarital) === 'string') tempMarital = [tempMarital];
        initialState.marital = tempMarital
          .filter((value) => value.trim() && value > 0 && value < 7)
          .map((item) => parseInt(item, 10));
      }
      if (
        action.data.sort === 'popular'
        || action.data.sort === 'new'
        || action.data.sort === 'alphabetical'
      ) initialState.sort = action.data.sort;
      if (
        action.data.age
        && action.data.age.length === 2
        && action.data.age.sort()[0] >= 25 && action.data.age.sort[1] <= 100
      ) {
        initialState.age = action.data.age.sort();
      }
      return initialState;
    case selectedConstants.STATE_SET:
      return {
        ...state,
        states: newList(state.states, action.data),
      };
    case selectedConstants.PARTY_SET:
      return {
        ...state,
        parties: newList(state.parties, action.data),
      };
    case selectedConstants.EDUCATION_SET:
      return {
        ...state,
        education: newList(state.education, action.data),
      };
    case selectedConstants.AGE_SET:
      return {
        ...state,
        age: action.data,
      };
    case selectedConstants.MARITAL_SET:
      return {
        ...state,
        marital: newList(state.marital, action.data),
      };
    default:
      return state;
  }
}

export default selected;
