import {partyConstants} from '../constants';
import { typePartyData } from '../../types';

function setParty(state: typePartyData){
    return {type : partyConstants.GET_PARTY_BY_ID, data : state}
}
export const partyActions = {
    setParty,
}