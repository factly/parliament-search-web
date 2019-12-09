import { applyMiddleware, createStore } from 'redux';
import ReduxThunk, {ThunkMiddleware} from 'redux-thunk';
import reducers, {AppState} from './reducers';
import {AppActions} from '../types';
import {composeWithDevTools} from 'redux-devtools-extension';

const initializeStore = (initialState:any) => createStore(reducers,
  initialState,
  composeWithDevTools(applyMiddleware(ReduxThunk as ThunkMiddleware < AppState , AppActions>)
  ));

export default initializeStore;
