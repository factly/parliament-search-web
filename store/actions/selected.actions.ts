import { selectedConstants } from '../constants';
import { SetAll, typeSetAllSelected } from '../../types';

function setSort(state: string): SetAll {
  return { type: selectedConstants.SET_SORT, data: { sort: state } };
}
function setAll(state: typeSetAllSelected): SetAll {
  return { type: selectedConstants.SET_ALL, data: state };
}
function setPage(state: number): SetAll {
  return { type: selectedConstants.SET_PAGE, data: { page: state } };
}
function toogle(state: number, field: string) {
  return { type: selectedConstants.TOOGLE_ONE, data: { [field]: state } };
}
function setAge(state: number[]): SetAll {
  return { type: selectedConstants.SET_AGE, data: { age: state } };
}
function setTerms(state: number): SetAll {
  return { type: selectedConstants.SET_TERMS, data: { terms: state } };
}
export const selectedActions = {
  setAll,
  setSort,
  setPage,
  toogle,
  setAge,
  setTerms
};
