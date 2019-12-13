import { typeSetAllState } from './reducers.types';
import { typeQuestionObject, typePartyData, typeConstituencyData , typeMemberData} from './data.types';
import { constituencyConstants, memberConstants, partyConstants, questionConstants} from '../store/constants';
 
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
    data: typeSetAllState
}

export interface SetSort{
    type : typeof selectedConstants.SET_SORT;
    data : string
}

export interface Toogle{
    type : typeof selectedConstants.TOOGLE_ONE;
    data : number;
    field : string
}

export interface SetConstituency {
    type : typeof constituencyConstants.SET_CONSTITUENCY,
    data: typeConstituencyData
}

export interface SetMember {
    type : typeof memberConstants.SET_MEMBER, 
    data : typeMemberData
}

export interface SetParty {
    type : typeof partyConstants.SET_PARTY,
    data : typePartyData
}

export interface setQuestion{
    type : typeof questionConstants.SET_QUESTION,
    data : typeQuestionObject
}
export interface SetPopularQuestions{
    type : typeof questionConstants.SET_QUESTIONS,
    data : typeQuestionObject
}

export interface setPartyMembers{
    type : typeof partyConstants.ADD_PARTY_MEMBERS , 
    data : {
        pid : number,
        members : typeMemberData
    }
}

export type Actions = ChangeTheme | SetAge | SetSort | Toogle | SetAll | SetTerms | SetConstituency | SetMember | SetParty | SetPopularQuestions | setQuestion | setPartyMembers;

export type AppActions = Actions;