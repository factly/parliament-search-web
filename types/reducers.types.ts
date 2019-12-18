export interface typeId {
  id: number;
  name: string;
}

export interface typeMarks {
  value: number;
  label: string;
}

export interface typeSelectedFilter {
  [key: string]: number[];
}

export type typeSelected = {
  q: string;
  education: number[];
  marital: number[];
  age: number[];
  sort: string;
  page: number;
  gender: number[];
  terms: number;
  questionBy: number[];
  geography: number[];
  party: number[];
  state: number[];
};

export type typeFilter = {
  [key: string]: typeId[];
};

export interface typeSetAllSelected {
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
  geography?: number[];
  member?: string | string[];
  constituency?: string | string[];
}

export interface typeQuestionGraphql {
  q?: string;
  education?: string[];
  party?: number[];
  marital_status?: string[];
  age?: number[];
  sort?: string;
  terms?: number;
  gender?: string;
  page?: number;
  questionBy?: number[];
  geography?: number[];
}
