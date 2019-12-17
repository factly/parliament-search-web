import { typeFilter } from '../../types';

const topics = [
  {
    id: 1,
    name: 'Agriculture'
  },
  {
    id: 2,
    name: 'Art & Culture'
  }
];

const education = [
  { id: 1, name: 'Doctrate' },
  { id: 2, name: 'Post Graduate' },
  { id: 3, name: 'Graduation' },
  { id: 4, name: 'Diploma' },
  { id: 5, name: 'Intermediate' },
  { id: 6, name: 'Matriculate' },
  { id: 7, name: 'High School' }
];

const marital = [
  { id: 1, name: 'Single' },
  { id: 2, name: 'Married' },
  { id: 3, name: 'Widowed' },
  { id: 4, name: 'Divorced' }
];

const type = [
  { id: 1, name: 'Stared' },
  { id: 2, name: 'Unstarred' }
];

const gender = [
  { id: 1, name: 'Male' },
  { id: 2, name: 'Female' }
];

const initialState: typeFilter = {
  topics,
  gender,
  education,
  marital,
  type
};

function filters(state = initialState, action: { type: string }) {
  switch (action.type) {
    default:
      return state;
  }
}

export default filters;
