import { selectedConstants } from '../constants';
import { TypeSetAll, TypeSetAllSelected } from '../../types';
function urlParser(param: string | string[]): number[] {
  if (typeof param === 'object')
    return param
      .filter((each: string) => each.trim() !== '')
      .map((each: string) => +each);
  return param.trim() !== '' ? [+param] : [];
}
function setAll(query: any): TypeSetAll {
  const setQuery: TypeSetAllSelected = {};
  if (query.q && query.q.trim() != '') setQuery.q = query.q;
  if (query.page && +query.page > 1) setQuery.page = +query.page;
  if (query.education) setQuery.education = urlParser(query.education);
  if (query.marital) setQuery.marital = urlParser(query.marital);
  if (query.member) setQuery.questionBy = urlParser(query.member);
  if (query.party) setQuery.party = urlParser(query.party);
  if (query.state) setQuery.state = urlParser(query.state);
  if (query.gender) setQuery.gender = urlParser(query.gender);
  if (query.topic) setQuery.topic = urlParser(query.topic);
  if (query.ageMin) setQuery.ageMin = +query.ageMin;
  if (query.ageMax) setQuery.ageMax = +query.ageMax;
  return { type: selectedConstants.SET_ALL, data: setQuery };
}

function setSort(state: string): TypeSetAll {
  return { type: selectedConstants.SET_SORT, data: { sort: state } };
}
function setPage(state: number): TypeSetAll {
  return { type: selectedConstants.SET_PAGE, data: { page: state } };
}
function toogle(state: number, field: string): TypeSetAll {
  return { type: selectedConstants.TOOGLE_ONE, data: { [field]: state } };
}
function setAge(state: number[]): TypeSetAll {
  return {
    type: selectedConstants.SET_AGE,
    data: { ageMin: state[0], ageMax: state[1] }
  };
}
function setTerms(state: number): TypeSetAll {
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
