import { selectedConstants } from '../constants';
import { typeSelected, typeSetAllState } from '../../types';

type actionType = {
  type: string;
  data: typeSetAllState;
};

const initialState: typeSetAllState = {
  sort : 'newest',
  page: 1
};

function selected(state = initialState, action: actionType) {
  switch (action.type) {
    case selectedConstants.SET_ALL:
      const result = { ...state, q: action.data.q, page: action.data.page ? +action.data.page : initialState.page};
      return result
    case selectedConstants.SET_SORT:
      return {
        ...state,
        sort: action.data.sort
      }
    case selectedConstants.SET_PAGE:
      return { ...state, page: action.data.page };
    default:
      return state;
  }
}

export default selected;
