export interface typeId {
  id: number;
  name: string;
}

export interface marks {
  value: number;
  label: string;
}

export interface typeMarks {
  marksAge: marks[];
  marksTerm: marks[];
}

export interface typeSelectedFilter {
  [ key : string ]: number[],
}

export type typeSelected = {
  filters : typeSelectedFilter,
  q?: string,
  terms? : number,
  sort? : string
};

export type typeFilter = {
  [key: string]: typeId[];
};

export interface typeSetAllState {
  q?: string;
  states?: number[];
  education?: number[];
  parties?: number[];
  marital?: number[];
  age?: number[];
  sort?: string;
  terms?: number;
  type?: number[];
  gender?: number[];
  page: number;
};

