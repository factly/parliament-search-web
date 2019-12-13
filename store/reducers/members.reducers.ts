import { memberConstants } from '../constants';
import { typeMemberObject, typeMemberData } from '../../types';

const initialState: typeMemberObject = {};

function members(
  state = initialState,
  action: { type: string; data: typeMemberData }
) {
  switch (action.type) {
    case memberConstants.SET_MEMBER:
      return { ...state, [action.data.MID]: action.data };
    default:
      return state;
  }
}

export default members;
