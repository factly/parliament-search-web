import {constituencyConstants} from '../constants';
import { typeConstituencyData } from '../../types';

function setConstituency(state:typeConstituencyData) {
    return {type : constituencyConstants.SET_CONSTITUENCY , data : state}
}

export const constituencyActions ={
    setConstituency
}