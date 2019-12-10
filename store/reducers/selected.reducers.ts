import { selectedConstants } from '../constants';
import {typeSelected} from '../../types';

type actionType = {
  type: string;
  data: any;
  field: string;
}
let q = '';
let states: number[] = [];
let parties: number[] = [];
let education: number[]= [];
let age: number[] = [25, 100];
let marital: number[] = [];
let sort: string = 'popular';
let gender : number[] = [];
let terms : number = 1 ;
let type : number[] = [];

const initialState: typeSelected = {
  'q' : q,
  'states' : states,
  'parties' : parties,
  'education' : education,
  'age' : age,
  'marital' : marital,
  'sort' : sort,
  'terms': terms,
  'type': gender,
  'gender': type
};


function toogleList(list : number [], element : number) : number[] {
  const currentIndex = list.indexOf(element);

  if (currentIndex === -1) {
    list.push(element);
  } else {
    list.splice(currentIndex, 1);
  }
  return list;
}

function selected(state = initialState, action : actionType) {
  switch (action.type) {
    case selectedConstants.SET_ALL:
      return action.data;
    case selectedConstants.AGE_SET:
      return {
        ...state,
        age: action.data,
      };
    case selectedConstants.SET_SORT:
      return {
        ...state,
        sort: action.data,
      };
    case selectedConstants.SET_TERMS:
      return {
        ...state,
        terms: action.data,
      };  
    case selectedConstants.TOOGLE_ONE:
      return {
        ...state,
        [action.field]: toogleList(state[action.field], action.data),
      };
    default:
      return state;
  }
}

export default selected;
