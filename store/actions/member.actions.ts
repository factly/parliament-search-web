import {memberConstants} from '../constants';
import { typeMemberData } from '../../types';

function setMember(state:typeMemberData){
    return {type : memberConstants.SET_MEMBER, data : state}
}


export const memberActions = {
    setMember,
}