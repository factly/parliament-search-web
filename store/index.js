import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

export const initializeStore = (initialState, options) => createStore(reducers,
  initialState,
  applyMiddleware(ReduxThunk)
);