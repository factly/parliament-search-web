import { combineReducers } from 'redux';
import filters from './filters.reducers';
import selected from './selected.reducers';
import app from './app.reducers';
import geographies from './geographies.reducers';
import members from './members.reducers';
import parties from './parties.reducers';
import questions from './questions.reducers';
import search from './search.reducers';
import ministries from './ministies.reducers';

const rootReducer = combineReducers({
  filters,
  selected,
  app,
  geographies,
  members,
  parties,
  questions,
  search,
  ministries
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
