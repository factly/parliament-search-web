import { partyConstants } from '../constants';
import { TypePartyObject, TypePartyData } from '../../types';

const initialState: TypePartyObject = {};

function parties(
  state = initialState,
  action: {
    type: string;
    data: TypePartyData;
  }
): TypePartyObject {
  switch (action.type) {
    case partyConstants.SET_PARTY:
      return { ...state, [action.data.PID]: action.data as TypePartyData };

    case partyConstants.ADD_PARTY_MEMBERS:
      return {
        ...state,
        [action.data.PID]: {
          ...state[action.data.PID],
          members: state[action.data.PID].members.concat(action.data.members)
        }
      };
    default:
      return state;
  }
}

export default parties;
