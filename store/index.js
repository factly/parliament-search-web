import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

export const initializeStore = (initialState) => createStore(reducers,
  initialState,
  applyMiddleware(ReduxThunk));
