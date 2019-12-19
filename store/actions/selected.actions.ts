import { selectedConstants } from '../constants';
import { SetAll, typeSetAllSelected } from '../../types';
function urlParser(param: string | string []){
  if(typeof param === 'string') return [+param]
  else if(typeof param === 'object') return param.map((each: string) => +each)
}
function setAll(query: any) {
  const setQuery: typeSetAllSelected = {}
  if(query.q && query.q.trim() != '') setQuery.q = query.q;
  if(query.page && +query.page > 1) setQuery.page = +query.page;
  if(query.education && query.education.length > 0) setQuery.education = urlParser(query.education)
  if(query.marital && query.marital.length > 1) setQuery.marital = urlParser(query.marital);
  if(query.member && query.member.length > 1) setQuery.questionBy = urlParser(query.member);
  if(query.party && query.party.length > 1) setQuery.party = urlParser(query.party);
  if(query.state && query.state.length > 1) setQuery.state = urlParser(query.state);
  if(query.gender && query.gender.length > 1) setQuery.gender = urlParser(query.gender);

  return { type: selectedConstants.SET_ALL, data: setQuery };
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
