import {memberConstants} from '../constants';
import { typeMemberData } from '../../types';

function setMember(state:typeMemberData){
    return {type : memberConstants.GET_MEMBER_BY_ID, data : state}
}


export const memberActions = {
    setMember,
}