import { selectedConstants } from '../constants';

function filter(list, min, max) {
  if (typeof (list) === 'string') list = [list];
  return list
    .filter((value) => value.trim() && value >= min && value <= max)
    .map((item) => parseInt(item, 10));
}

function setAge(state) {
  return { type: selectedConstants.AGE_SET, data: state };
}
function setAll(state) {
  const localState = {};
  localState.q = state.q ? state.q.trim() : '';
  localState.states = state.states ? filter(state.states, 1, 34) : [];
  localState.parties = state.parties ? filter(state.parties, 1, 60) : [];
  localState.education = state.education ? filter(state.education, 1, 6) : [];
  localState.marital = state.marital ? filter(state.marital, 1, 6) : [];
  localState.sort = state.sort === 'new' || state.sort === 'alphabetical' ? state.sort : 'popular';
  let tempAge = state.age.sort((a, b) => a - b).map((value) => parseInt(value, 10))
  localState.age = state.age && tempAge.length === 2 && tempAge[0] >= 25 && tempAge[1] <= 100 ? tempAge : [25, 100];
  return { type: selectedConstants.SET_ALL, data: localState };
}
function setSort(state) {
  return { type: selectedConstants.SET_SORT, data: state };
}
function toogle(state, field) {
  return { type: selectedConstants.TOOGLE_ONE, data: state, field };
}
export const selectedActions = {
  setAge,
  setAll,
  setSort,
  toogle,
};
