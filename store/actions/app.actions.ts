import { appConstants } from '../constants';
import { ChangeTheme } from '../../types';

function changeTheme(state: string): ChangeTheme {
  return { type: appConstants.CHANGE_THEME, data: state };
}

export const appActions = {
  changeTheme
};
