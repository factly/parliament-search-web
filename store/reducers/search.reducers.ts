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
    default:
      return state;
  }
}

export default search;
