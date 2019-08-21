import { appConstants } from '../constants';

const initialState = {};
initialState.theme = 'light';

function app(state = initialState, action) {
  switch (action.type) {
    case appConstants.CHANGE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
}

export default app;
