import { appConstants } from '../constants';

const initialState: { theme: string; error: string | null } = {
  theme: 'light',
  error: null
};

function app(
  state = initialState,
  action: { type: string; data: string }
): { theme: string; error: string | null } {
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
