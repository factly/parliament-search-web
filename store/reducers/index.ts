import { combineReducers } from 'redux';
import filters from './filters.reducers';
import selected from './selected.reducers';
import app from './app.reducers';
import marks from './marks.reducers';
import constituencies from './constituencies.reducers';
import members from './members.reducers';
import parties from './parties.reducers';
import questions from './questions.reducers';

const rootReducer = combineReducers({
  filters,
  selected,
  app,
  marks,
  constituencies,
  members,
  parties,
  questions
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
