import { applyMiddleware, createStore, Store } from 'redux';
import ReduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// import reducers
import reducers from './reducers';

// import types
import { AppState, AppActions } from '../types';

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
