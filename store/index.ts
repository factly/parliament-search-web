import { applyMiddleware, createStore } from 'redux';
import ReduxThunk, {ThunkMiddleware} from 'redux-thunk';
import reducers, {AppState} from './reducers';
import {AppActions} from '../types';

const initializeStore = (initialState:any) => createStore(reducers,
  initialState,
  applyMiddleware(ReduxThunk as ThunkMiddleware < AppState , AppActions>));

export default initializeStore;
