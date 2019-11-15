import { combineReducers } from 'redux';
import filters from './filters.reducers';
import selected from './selected.reducers';
import app from './app.reducers';
import marks from './marks.reducers';

const rootReducer = combineReducers({
  filters,
  selected,
  app,
  marks
});

export type AppState = ReturnType<typeof rootReducer > ;

export default rootReducer;
