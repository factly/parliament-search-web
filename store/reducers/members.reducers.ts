import { memberConstants } from '../constants';
import { TypeMemberObject, TypeMemberData } from '../../types';

const initialState: TypeMemberObject = {};

function members(
  state = initialState,
  action: { type: string; data: TypeMemberData }
) {
  switch (action.type) {
    case memberConstants.SET_MEMBER:
      return { ...state, [action.data.MID]: action.data };
    default:
      return state;
  }
}

export default members;
