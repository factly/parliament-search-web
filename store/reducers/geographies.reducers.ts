// import constants
import { geographyConstants } from '../constants';

// import types
import { TypeGeographyObject, TypeGeographyData } from '../../types';

const initialState: TypeGeographyObject = {};

function geographies(
  state = initialState,
  action: { type: string; data: TypeGeographyData }
): TypeGeographyObject {
  switch (action.type) {
    case geographyConstants.SET_GEOGRAPHY:
      return { ...state, [action.data.GID]: action.data };
    default:
      return state;
  }
}

export default geographies;
