import { searchConstants } from '../constants/search.constants';
import { stat } from 'fs';

interface typeSearch {
  qids: number[];
  total: number;
}
const initialState: typeSearch = {
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
