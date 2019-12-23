import { TypeSetAllSelected, TypeFilter } from './reducers.types';
import {
  TypeQuestionObject,
  TypePartyData,
  TypeGeographyData,
  TypeMemberData
} from './data.types';
import {
  geographyConstants,
  memberConstants,
  partyConstants,
  questionConstants,
  filterConstants,
  searchConstants,
  selectedConstants,
  appConstants
} from '../store/constants';

export interface TypeChangeTheme {
  type: typeof appConstants.CHANGE_THEME;
  data: string;
}

export interface TypeSetAge {
  type: typeof selectedConstants.SET_AGE;
  data: number[];
}

export interface TypeSetTerms {
  type: typeof selectedConstants.SET_TERMS;
  data: number;
}

export interface TypeSetAll {
  type: typeof selectedConstants.SET_ALL;
  data: TypeSetAllSelected;
}

export interface TypeSetSort {
  type: typeof selectedConstants.SET_SORT;
  data: string;
}

export interface TypeToogle {
  type: typeof selectedConstants.TOOGLE_ONE;
  data: number;
  field: string;
}

export interface TypeSetGeography {
  type: typeof geographyConstants.SET_GEOGRAPHY;
  data: TypeGeographyData;
}

export interface TypeSetMember {
  type: typeof memberConstants.SET_MEMBER;
  data: TypeMemberData;
}

export interface TypeSetParty {
  type: typeof partyConstants.SET_PARTY;
  data: TypePartyData;
}

export interface TypeSetQuestion {
  type: typeof questionConstants.SET_QUESTION;
  data: TypeQuestionObject;
}
export interface TypeSetPopularQuestions {
  type: typeof questionConstants.SET_QUESTIONS;
  data: TypeQuestionObject;
}

export interface TypeSetPartyMembers {
  type: typeof partyConstants.ADD_PARTY_MEMBERS;
  data: {
    pid: number;
    members: TypeMemberData;
  };
}

export interface TypeSetFilters {
  type: typeof filterConstants.SET_STATES_AND_PARTIES_FILTER;
  data: TypeFilter;
}

export interface TypeSetSearchPageQuestions {
  type: typeof searchConstants.SET_SEARCHPAGE_QUESTIONS;
  data: {
    qids: number[];
    total: number;
  };
}

export type Actions =
  | TypeChangeTheme
  | TypeSetAge
  | TypeSetSort
  | TypeToogle
  | TypeSetAll
  | TypeSetTerms
  | TypeSetGeography
  | TypeSetMember
  | TypeSetParty
  | TypeSetPopularQuestions
  | TypeSetQuestion
  | TypeSetPartyMembers
  | TypeSetSearchPageQuestions
  | TypeSetFilters;

export type AppActions = Actions;
