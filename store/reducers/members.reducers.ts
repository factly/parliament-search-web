// import constants
import { memberConstants } from '../constants';

// import types
import { TypeMemberObject, TypeMemberData } from '../../types';

const initialState: TypeMemberObject = {};

function members(
  state = initialState,
  action: { type: string; data: TypeMemberData[] }
): TypeMemberObject {
  switch (action.type) {
    case memberConstants.SET_MEMBER:
      return { ...state, [action.data[0].MID]: action.data[0] };

    case memberConstants.SET_MEMBERS: {
      const newMembers: TypeMemberObject = {};

      action.data.forEach((each: TypeMemberData) => {
        if (!state[+each.MID]) newMembers[+each.MID] = each;

        return null;
      });
      return { ...state, ...newMembers };
    }
    default:
      return state;
  }
}

export default members;
