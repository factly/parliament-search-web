import {partyConstants} from '../constants';
import { typePartyData } from '../../types';

function setParty(state: typePartyData){
    return {type : partyConstants.SET_PARTY, data : state}
}
export const partyActions = {
    setParty,
}