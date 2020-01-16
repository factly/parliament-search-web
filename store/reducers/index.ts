import { combineReducers } from 'redux';
import filters from './filters.reducers';
import selected from './selected.reducers';
import app from './app.reducers';
import geographies from './geographies.reducers';
import members from './members.reducers';
import parties from './parties.reducers';
import questions from './questions.reducers';
import search from './search.reducers';
import ministries from './ministries.reducers';
import { AppState } from '../../types';

const rootReducer = combineReducers<AppState>({
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

export default rootReducer;
