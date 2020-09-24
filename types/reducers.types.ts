import {
  TypeGeographyObject,
  TypeMemberObject,
  TypePartyObject,
  TypeQuestionObject
} from './data.types';

export interface TypeCheckBoxFilter {
  id: number;
  name: string;
  image?: string;
}

export interface TypeSelectedFilter {
  [key: string]: number[];
}

export interface TypeMinistries {
  [key: number]: number[];
}

export interface TypeSelected {
  q: string;
  education: number[];
  marital: number[];
  sort: string;
  page: number;
  gender: number[];
  ageMin: number;
  ageMax: number;
  terms: number;
  questionBy: number[];
  party: number[];
  state: number[];
  constituency: number[];
  topic: number[];
  house: number[];
  category: string;
}

export interface TypeFilter {
  [key: string]: TypeCheckBoxFilter[];
}

export interface TypeSetAllSelected {
  q?: string;
  state?: number[];
  education?: number[];
  party?: number[];
  marital?: number[];
  sort?: string;
  terms?: number;
  gender?: number[];
  ageMin?: number;
  ageMax?: number;
  page?: number;
  questionBy?: number[];
  member?: string | string[];
  constituency?: number[];
  topic?: number[];
  house?: number[];
  category?: string;
}

export interface TypeQuestionGraphql {
  q?: string;
  education?: string[];
  party?: number[];
  maritalStatus?: string[];
  ageMin?: number;
  ageMax?: number;
  sort?: string;
  terms?: number;
  gender?: string;
  page?: number;
  questionBy?: number[];
  constituency?: number[];
  state?: number[];
  topic?: number[];
  house?: number[];
  category?: string;
}

export interface TypeSearch {
  ids: number[];
  total: number;
}

export interface TypeApp {
  theme: string;
  error: string | null;
}

//App State
export interface AppState {
  app: TypeApp;
  filters: TypeFilter;
  geographies: TypeGeographyObject;
  members: TypeMemberObject;
  ministries: TypeMinistries;
  parties: TypePartyObject;
  questions: TypeQuestionObject;
  search: TypeSearch;
  selected: TypeSelected;
}
