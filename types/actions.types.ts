import {typeState} from './reducers.types';

export const appConstants = {
    CHANGE_THEME: 'CHANGE_THEME_SUCCESS',
  };

export const selectedConstants = {
    AGE_SET: 'AGE_SET_SUCCESS',
    SET_ALL: 'SET_ALL_SUCCESS',
    SET_SORT: 'SET_SORT_SUCCESS',
    SET_TERMS : 'SET_TERMS_SUCCESS',
    TOOGLE_ONE: 'SET_ANY_SUCCESS'
};


export interface ChangeTheme{
    type : typeof appConstants.CHANGE_THEME;
    data : string;
};

export interface SetAge {
    type : typeof selectedConstants.AGE_SET;
    data: number[] ;
};

export interface SetTerms {
    type : typeof selectedConstants.SET_TERMS;
    data: number;
};


export interface SetAll{
    type : typeof selectedConstants.SET_ALL;
    data: typeState
}

export interface SetSort{
    type : typeof selectedConstants.SET_SORT;
    data : any
}

export interface Toogle{
    type : typeof selectedConstants.TOOGLE_ONE;
    data : number;
    field : string
}

export type Actions = ChangeTheme | SetAge | SetSort | Toogle | SetAll | SetTerms;

export type AppActions = Actions;