import { applyMiddleware, createStore, Store } from 'redux';
import ReduxThunk, { ThunkMiddleware } from 'redux-thunk';
import reducers from './reducers';
import { AppState, AppActions } from '../types';
import { composeWithDevTools } from 'redux-devtools-extension';

//Remove Redux DevTools
const initializeStore = (initialState: {} = {}): Store<AppState> =>
  createStore(
    reducers,
    initialState,
    composeWithDevTools(
      applyMiddleware(ReduxThunk as ThunkMiddleware<AppState, AppActions>)
    )
  );

export default initializeStore;
