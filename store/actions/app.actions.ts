import { appConstants } from '../constants';
import { TypeChangeTheme } from '../../types';
import Cookies from 'js-cookie';

function changeTheme(state: string): TypeChangeTheme {
  if (state === 'dark' || state === 'light') {
    Cookies.remove('theme');
    Cookies.set('theme', state);
    return { type: appConstants.CHANGE_THEME, data: state };
  }
  return { type: appConstants.CHANGE_THEME, data: 'light' };
}

export const appActions = {
  changeTheme
};
