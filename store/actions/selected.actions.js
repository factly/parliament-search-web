import { selectedConstants } from '../constants';
import { func } from 'prop-types';

export const selectedActions = {
  addState,
  addParty,
  addEducation,
  setAge,
  setGender,
  addMarital
};

function addState(state) {
	return { type: selectedConstants.STATE_SET, data: state};
}
function addParty(state) {
	return { type: selectedConstants.PARTY_SET, data: state};
}
function addEducation(state){
  return { type: selectedConstants.EDUCATION_SET, data: state};
}
function setAge(state){
  return { type: selectedConstants.AGE_SET, data: state};
}
function setGender(state){
  return { type: selectedConstants.GENDER_SET, data: state};
}
function addMarital(state){
  return { type: selectedConstants.MARITAL_SET, data: state};
}