import { gql } from 'apollo-boost';
import {client} from './client.apollo';
import {partyActions} from '../actions';
import { typePartyData, typePartyMember, AppActions } from '../../types';
import { Dispatch } from 'react';
import { memberWithVariablesQuery } from './members.apollo';

const partyQuery = gql`
query ($pid: Int!, $limit: Int, $page: Int) {
  party(id: $pid) {
    PID
    name
    abbr
  }
  members(party: [$pid], limit: $limit, page: $page) {
    nodes {
      MID
      name
      terms {
        constituency {
          CID
          name
        }
      }
    }
    total
  }
}
`
export function getPartyById( pid : number, limit : number = 10, page : number = 1 , required : number = 0){
    return async (dispatch: Dispatch<AppActions>) => {
        try {
            const party:typePartyData ={ PID : 0, members : [] , name : '', abbr : '', total : 0};
            const variables = {pid , limit , page};
            const { data } = await client.query({query : partyQuery, variables});
            const { PID, name, abbr } = data.party
            party.PID = PID;
            party.name = name;
            party.abbr = abbr;
            party.total = data.members.total;
            data.members.nodes.map(( member: typePartyMember ) => party.members.push(member))
            
            dispatch(partyActions.setParty(party))
        } catch (error) {
            console.log("PARTY ERRRO")
            console.error(error.networkError.result);
            console.log(2)
        }
    }
};

export function getPartyMembers( pid : number, limit : number = 10, page : number = 1 , required : number){
  return async (dispatch: Dispatch<AppActions>) => {
    try {
      const variables = { party : [pid], limit, page };
      const { data } = await client.query({ query : memberWithVariablesQuery, variables });
      let members = [];
      if(required <= data.members.nodes.length) 
        members = data.members.nodes.slice(data.members.nodes.length - required, data.members.nodes.length + 1);
      dispatch(partyActions.setPartyMembers({ pid, members }));
    } catch (error) {
      console.log(error);
    }
  } 
}
