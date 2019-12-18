import { geographyConstants } from '../constants';
import { typeGeographyObject, typeGeographyData } from '../../types';

const initialState: typeGeographyObject = {};

function geographies(
  state = initialState,
  action: { type: string; data: typeGeographyData }
) {
  switch (action.type) {
    case geographyConstants.SET_GEOGRAPHY:
      return { ...state, [action.data.GID]: action.data };
    default:
      return state;
  }
}

export default geographies;
