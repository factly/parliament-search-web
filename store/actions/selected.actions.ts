import { selectedConstants } from '../constants';
import {
  SetAll,
  typeSetAllState
} from '../../types';

function setSort(state: string): SetAll {
  return { type: selectedConstants.SET_SORT, data: { sort: state, page: 1 } };
}
function setAll(state: typeSetAllState): SetAll {
  return { type: selectedConstants.SET_ALL, data: state };
}
function setPage(state: number): SetAll{
  return { type: selectedConstants.SET_PAGE, data: { page: state}}
}
export const selectedActions = {
  setAll,
  setSort,
  setPage
};
