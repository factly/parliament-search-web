import { selectedConstants } from '../constants';
import { SetAll, typeSetAllSelected } from '../../types';

function setAll(query: typeSetAllSelected) {
  if (query.member) {
    query.questionBy =
      typeof query.member !== 'string' && query.member.length > 0
        ? query.member.map((each: string) => +each)
        : [+query.member];
    delete query.member;
  }
  if (query.constituency) {
    query.geography =
      typeof query.constituency !== 'string' && query.constituency.length > 0
        ? query.constituency.map((each: string) => +each)
        : [+query.constituency];
    delete query.constituency;
  }
  return { type: selectedConstants.SET_ALL, data: query };
}

function setSort(state: string): SetAll {
  return { type: selectedConstants.SET_SORT, data: { sort: state } };
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
  setSort,
  setPage,
  toogle,
  setAge,
  setTerms,
  setAll
};
