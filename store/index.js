import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const initializeStore = (initialState) => createStore(
  reducers,
  initialState,
  applyMiddleware(ReduxThunk)
);

export default initializeStore;
