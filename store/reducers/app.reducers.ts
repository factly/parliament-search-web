import { appConstants } from '../constants';
import { TypeApp } from '../../types';

const initialState: TypeApp = {
  theme: 'light',
  error: null
};

function app(
  state = initialState,
  action: { type: string; data: string }
): TypeApp {
  switch (action.type) {
    case appConstants.CHANGE_THEME:
      return {
        ...state,
        theme: action.data
      };
    case appConstants.ADD_ERROR:
      return {
        ...state,
        error: action.data
      };
    default:
      return state;
  }
}

export default app;
