import { constituencyConstants } from '../constants';
import { typeConstituencyObject, typeConstituencyData } from '../../types';

const initialState: typeConstituencyObject = {};

function constituencies(
  state = initialState,
  action: { type: string; data: typeConstituencyData }
) {
  switch (action.type) {
    case constituencyConstants.SET_CONSTITUENCY:
      return { ...state, [action.data.CID]: action.data };
    default:
      return state;
  }
}

export default constituencies;
