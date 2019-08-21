import { combineReducers } from 'redux';
import filters from './filters.reducers';
import selected from './selected.reducers';
import app from './app.reducers';

const rootReducer = combineReducers({
  filters,
  selected,
  app,
});

export default rootReducer;
