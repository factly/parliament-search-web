import { selectedConstants } from '../constants';

function filter(list) {
  if (typeof (list) === 'string') list = [list];
  return list.map((item) => parseInt(item, 10));
}

function setAge(state) {
  return { type: selectedConstants.AGE_SET, data: state };
}
function setAll(state) {
  const localState = {};
  localState.q = state.q ? state.q.trim() : '';
  localState.states = state.states ? filter(state.states) : [];
  localState.parties = state.parties ? filter(state.parties) : [];
  localState.education = state.education ? filter(state.education) : [];
  localState.marital = state.marital ? filter(state.marital) : [];
  localState.sort = state.sort === 'new' || state.sort === 'alphabetical' ? state.sort : 'popular';
  const tempAge = (state.age && state.age.sort((a, b) => a - b).map((value) => parseInt(value, 10))) || [25, 100];
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
