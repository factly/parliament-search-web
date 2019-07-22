import { combineReducers } from 'redux';
import { filters } from './filters.reducers';
 
const rootReducer = combineReducers({
  filters
});

export default rootReducer;