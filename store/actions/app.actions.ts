import { appConstants } from '../constants';
import { TypeChangeTheme } from '../../types';

function changeTheme(state: string): TypeChangeTheme {
  return { type: appConstants.CHANGE_THEME, data: state };
}

export const appActions = {
  changeTheme
};
