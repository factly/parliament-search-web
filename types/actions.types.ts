import { typeSetAllSelected, typeId } from './reducers.types';
import {
  typeQuestionObject,
  typePartyData,
  typeGeographyData,
  typeMemberData
} from './data.types';
import {
  geographyConstants,
  memberConstants,
  partyConstants,
  questionConstants,
  filterConstants
} from '../store/constants';
import { searchConstants } from '../store/constants/search.constants';

export const appConstants = {
  CHANGE_THEME: 'CHANGE_THEME_SUCCESS'
};

export const selectedConstants = {
  AGE_SET: 'AGE_SET_SUCCESS',
  SET_ALL: 'SET_ALL_SUCCESS',
  SET_SORT: 'SET_SORT_SUCCESS',
  SET_TERMS: 'SET_TERMS_SUCCESS',
  TOOGLE_ONE: 'SET_ANY_SUCCESS'
};

export interface ChangeTheme {
  type: typeof appConstants.CHANGE_THEME;
  data: string;
}

export interface SetAge {
  type: typeof selectedConstants.AGE_SET;
  data: number[];
}

export interface SetTerms {
  type: typeof selectedConstants.SET_TERMS;
  data: number;
}

export interface SetAll {
  type: typeof selectedConstants.SET_ALL;
  data: typeSetAllSelected;
}

export interface SetSort {
  type: typeof selectedConstants.SET_SORT;
  data: string;
}

export interface Toogle {
  type: typeof selectedConstants.TOOGLE_ONE;
  data: number;
  field: string;
}

export interface SetGeography {
  type: typeof geographyConstants.SET_GEOGRAPHY;
  data: typeGeographyData;
}

export interface SetMember {
  type: typeof memberConstants.SET_MEMBER;
  data: typeMemberData;
}

export interface SetParty {
  type: typeof partyConstants.SET_PARTY;
  data: typePartyData;
}

export interface SetQuestion {
  type: typeof questionConstants.SET_QUESTION;
  data: typeQuestionObject;
}
export interface SetPopularQuestions {
  type: typeof questionConstants.SET_QUESTIONS;
  data: typeQuestionObject;
}

export interface SetPartyMembers {
  type: typeof partyConstants.ADD_PARTY_MEMBERS;
  data: {
    pid: number;
    members: typeMemberData;
  };
}

export interface SetPartyFilter {
  type: typeof filterConstants.SET_PARTY_FILTER;
  data: typeId[];
}

export interface setStatesFilter {
  type: typeof filterConstants.SET_STATES_FILTER;
  data: typeId[];
}

export interface SetSearchPageQuestions {
  type: typeof searchConstants.SET_SEARCHPAGE_QUESTIONS;
  data: {
    qids: number[];
    total: number;
  };
}

export type Actions =
  | ChangeTheme
  | SetAge
  | SetSort
  | Toogle
  | SetAll
  | SetTerms
  | SetGeography
  | SetMember
  | SetParty
  | SetPopularQuestions
  | SetQuestion
  | SetPartyMembers
  | SetSearchPageQuestions
  | SetPartyFilter
  | setStatesFilter;

export type AppActions = Actions;
