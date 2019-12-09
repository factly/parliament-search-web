import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { memberActions, questionActions } from '../actions';
import { questionsByVariablesQuery } from './question.apollo';
import { typeMemberData , typeQuestionData , typeQuestionObject, typeQuestionBox } from '../../types';

const memberQuery = gql`
query ($id : Int){
    member(id : $id){
        MID
        name
        gender
        dob
        marital_status
        education
        profession
        expertise
        sons
        daughters
        phone
        email
  		terms{
            constituency{
                CID
                name
                from
                to
            }
            party{
                PID
                name
            }
            house
            session
        }
    }
}
`
export const memberWithVariablesQuery = gql`
query ($limit: Int, $page: Int, $q: String, $gender: String, $marital_status: [String], $education: [String], $profession: [String], $expertise: [String], $term: Int, $party: [Int], $constituency: [Int], $house: [String], $session: [Int]) {
    members(limit: $limit, page: $page, q: $q, gender: $gender, marital_status: $marital_status, education: $education, profession: $profession, expertise: $expertise, term: $term, party: $party, constituency: $constituency, house: $house, session: $session) {
      MID
      name
      terms{
        party{
            PID
            name
        }
        house
        session
    }
    }
  }
`

export function getMemberById(id:number){
    
    return async ( dispatch:any ) => {
        try {
            let member:typeMemberData = { MID: 0, name : '', gender : '' };
            const variables = { id };
            const { data } = await client.query({ query : memberQuery, variables });
            member = data.member
            if(member.MID){
                //{ 0 : { QID : 0, subject : '', question : '', questionBy : [], type : '', ministry : '', date : '', answer : '' }}
                let questions:typeQuestionObject = {};
                const variables = {questionBy : [member.MID]}
                const {data} = await client.query({query : questionsByVariablesQuery, variables});
                member.popularQuestionIds = data.questions.map((each : typeQuestionBox) => each.QID);

                if(member.popularQuestionIds)
                  member.popularQuestionIds.map((id:number) => questions[id] = data.questions.find((each:typeQuestionData) => id === each.QID));

                dispatch(questionActions.setPopularQuestions(questions));
            }
            dispatch(memberActions.setMember(data.member));

        } catch (error) {
            console.error(error)
        }
    }
};

