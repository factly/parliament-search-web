export interface TypeCheckBoxFilter {
  id: number;
  name: string;
}

export interface TypeSelectedFilter {
  [key: string]: number[];
}

export interface TypeMinistries {
  [key: number]: string[];
}

export interface TypeSelected {
  q: string;
  education: number[];
  marital: number[];
  age: number[];
  sort: string;
  page: number;
  gender: number[];
  terms: number;
  questionBy: number[];
  party: number[];
  state: number[];
  constituency: number[];
  topic: number[];
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
  age?: number[];
  sort?: string;
  terms?: number;
  gender?: number[];
  page?: number;
  questionBy?: number[];
  member?: string | string[];
  constituency?: number[];
  topic?: number[];
}

export interface TypeQuestionGraphql {
  q?: string;
  education?: string[];
  party?: number[];
  maritalStatus?: string[];
  age?: number[];
  sort?: string;
  terms?: number;
  gender?: string;
  page?: number;
  questionBy?: number[];
  constituency?: number[];
  state?: number[];
  topic?: number[];
}
