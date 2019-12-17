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
};

export type typeFilter = {
  [key: string]: typeId[];
};

export interface typeSetAllSelected {
  q?: string;
  states?: number[];
  education?: number[];
  parties?: number[];
  marital?: number[];
  age?: number[];
  sort?: string;
  terms?: number;
  gender?: number[];
  page?: number;
}

export interface typeQuestionGraphql {
  q?: string;
  states?: number[];
  education?: string[];
  parties?: number[];
  marital_status?: string[];
  age?: number[];
  sort?: string;
  terms?: number;
  gender?: string;
  page?: number;
}
