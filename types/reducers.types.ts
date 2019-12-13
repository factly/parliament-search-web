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

export type typeSelected = {
  [key: string]: any;
};

export type typeFilter = {
  [key: string]: typeId[];
};

export interface typeSetAllState {
  q: string;
  states: number[];
  education: number[];
  parties: number[];
  marital: number[];
  age: number[];
  sort: string;
  terms: number;
  type: number[];
  gender: number[];
}
