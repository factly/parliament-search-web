import {partyConstants} from '../constants';
import { typePartyObject, typePartyData } from '../../types';

const initialState:typePartyObject = {};

function parties(state = initialState, action : {type : string , data : typePartyData})  {
    switch (action.type) {
      case partyConstants.SET_PARTY:
        return {...state,[action.data.PID] : action.data}; 
      default:
        return state;
    }
  }
  
  export default parties;