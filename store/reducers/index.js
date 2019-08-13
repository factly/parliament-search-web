import { combineReducers } from 'redux';
import filters from './filters.reducers';
import selected from './selected.reducers';

const rootReducer = combineReducers({
  filters,
  selected,
});

export default rootReducer;
