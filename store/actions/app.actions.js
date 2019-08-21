import { appConstants } from '../constants';

function changeTheme(state) {
  return { type: appConstants.CHANGE_THEME, data: state };
}

export const appActions = {
  changeTheme,
};
