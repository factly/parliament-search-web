import { selectedConstants } from '../constants';

const initialState = {};
initialState['states'] = []
initialState['parties'] = []
initialState['education'] = []
initialState['age'] = [25, 100]
initialState['genders'] = ["all"]
initialState['marital'] = []

export function selected(state = initialState, action) {
  switch (action.type) {
    case selectedConstants.STATE_SET:
      var newStates = state.states
      const currentStateIndex = newStates.indexOf(action.data);
      
      if (currentStateIndex === -1) {
        newStates.push(action.data);
      } else {
        newStates.splice(currentStateIndex, 1);
      }
      return {
        ...state,
        states: newStates
      }
    case selectedConstants.PARTY_SET:
      var newParties = state.parties
      const currentPartyIndex = newParties.indexOf(action.data);
      
      if (currentPartyIndex === -1) {
        newParties.push(action.data);
      } else {
        newParties.splice(currentPartyIndex, 1);
      }
      return {
        ...state,
        parties: newParties
      }
    case selectedConstants.EDUCATION_SET:
      var newEducation = state.education
      const currentEducationIndex = newEducation.indexOf(action.data);
      
      if (currentEducationIndex === -1) {
        newEducation.push(action.data);
      } else {
        newEducation.splice(currentEducationIndex, 1);
      }
      return {
        ...state,
        education: newEducation
      }
    case selectedConstants.AGE_SET:
      return {
        ...state,
        age: action.data
      }
    case selectedConstants.GENDER_SET:
      var newGender = []
      newGender[0] = action.data
      return {
        ...state,
        genders: newGender
      }
    case selectedConstants.MARITAL_SET:
      var newMarital = state.marital
      const currentMaritalIndex = newMarital.indexOf(action.data);
      
      if (currentMaritalIndex === -1) {
        newMarital.push(action.data);
      } else {
        newMarital.splice(currentMaritalIndex, 1);
      }
      return {
        ...state,
        marital: newMarital
      }
    default:
      return state
  }
}