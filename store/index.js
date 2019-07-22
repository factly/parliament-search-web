import {applyMiddleware, createStore} from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';

export const makeStore = (initialState, options) => createStore(reducers,
  initialState,
  applyMiddleware(ReduxThunk)
);