import { gql } from 'apollo-boost';
import {client} from './client.apollo';
import {partyActions} from '../actions';
import { typePartyData, typePartyMember } from '../../types';

const partyQuery = gql`
query ($id: Int) {
    party(id: $id) {
      PID
      name
      abbr
    }
    members(party: [$id]) {
      MID
      name
      terms {
        constituency {
          CID
          name
        }
      }
    }
  }
`
export function getPartyById(id : number){
    return async (dispatch:any) => {
        try {
            const party:typePartyData ={ PID : 0, members : [] , name : '', abbr : ''};
            const variables = {id};
            const {data} = await client.query({query : partyQuery, variables})
            const {PID , name , abbr} = data.party
            party.PID = PID;
            party.name = name;
            party.abbr = abbr;
            data.members.map((member: typePartyMember) => party.members.push(member))
            dispatch(partyActions.setParty(party))
        } catch (error) {
            console.error(error)
        }
    }
};
