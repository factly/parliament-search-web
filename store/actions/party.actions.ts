import {partyConstants} from '../constants';
import { typePartyData } from '../../types';

function setParty(state: typePartyData){
    return {type : partyConstants.SET_PARTY, data : state}
}
function setPartyMembers(state: any) {
    return { type : partyConstants.SET_PARTY_MEMBERS , data : state}
}
export const partyActions = {
    setParty,
    setPartyMembers
}