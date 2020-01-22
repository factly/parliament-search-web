// import constants
import { searchConstants } from '../constants/search.constants';

// import types
import { TypeSearch, TypeSetSearchPageQuestions } from '../../types';

const initialState: TypeSearch = {
  ids: [],
  total: -1
};

function search(
  state = initialState,
  action: TypeSetSearchPageQuestions
): TypeSearch {
  switch (action.type) {
    case searchConstants.SET_SEARCHPAGE:
      return action.data;
    default:
      return state;
  }
}

export default search;
