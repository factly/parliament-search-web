import { selectedConstants } from '../constants';

const initialState = {};
initialState['states'] = []
initialState['parties'] = []

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
    default:
      return state
  }
}