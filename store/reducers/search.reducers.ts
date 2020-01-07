import { searchConstants } from '../constants/search.constants';

interface TypeSearch {
  ids: number[];
  total: number;
}
const initialState: TypeSearch = {
  ids: [],
  total: -1
};

function search(state = initialState, action: any): TypeSearch {
  switch (action.type) {
    case searchConstants.SET_SEARCHPAGE:
      return action.data;
    case searchConstants.ADD_SEARCHPAGE_QUESTIONS:
      return { ...state, ids: state.ids.concat(action.data.ids) };
    default:
      return state;
  }
}

export default search;
