import { selectedConstants } from '../constants';

function addState(state) {
  return { type: selectedConstants.STATE_SET, data: state };
}
function addParty(state) {
  return { type: selectedConstants.PARTY_SET, data: state };
}
function addEducation(state) {
  return { type: selectedConstants.EDUCATION_SET, data: state };
}
function setAge(state) {
  return { type: selectedConstants.AGE_SET, data: state };
}
function addMarital(state) {
  return { type: selectedConstants.MARITAL_SET, data: state };
}
function setAll(state) {
  return { type: selectedConstants.SET_ALL, data: state };
}
function setSort(state) {
  return { type: selectedConstants.SET_SORT, data: state };
}

export const selectedActions = {
  addState,
  addParty,
  addEducation,
  setAge,
  addMarital,
  setAll,
  setSort,
};
