import { searchConstants } from '../constants/search.constants';

interface TypeSearch {
  qids: number[];
  total: number;
}
const initialState: TypeSearch = {
  qids: [],
  total: 0
};

function search(state = initialState, action: any) {
  switch (action.type) {
    case searchConstants.SET_SEARCHPAGE_QUESTIONS:
      return action.data;
    case searchConstants.ADD_SEARCHPAGE_QUESTIONS:
      return { ...state, qids: state.qids.concat(action.data.qids) };
    default:
      return state;
  }
}

export default search;
