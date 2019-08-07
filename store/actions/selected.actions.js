import { selectedConstants } from '../constants';

export const selectedActions = {
  addState,
  addParty
};

function addState(state) {
	return { type: selectedConstants.STATE_SET, data: state};
}
function addParty(state) {
	return { type: selectedConstants.PARTY_SET, data: state};
}