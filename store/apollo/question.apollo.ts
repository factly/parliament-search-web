import { gql } from 'apollo-boost';
import {client} from './client.apollo';
import {questionActions} from '../actions';

export const questionQuery = gql`
query ($id : Int!){
    question(id : $id){
        QID 
        subject
        type
        question
        questionBy{
            MID
            name
        }
        answer
        ministry
        date
    }
}
`
export const questionsByVariablesQuery = gql`
query ($limit: Int, $page: Int, $q: String, $house: String, $type: String, $ministry: [String], $questionBy: [Int], $gender: String, $marital_status: [String], $education: [String], $profession: [String], $expertise: [String], $term: Int, $party: [Int], $constituency: [Int]) {
    questions(limit: $limit, page: $page, q: $q, house: $house, type: $type, ministry: $ministry, questionBy: $questionBy, gender: $gender, marital_status: $marital_status, education: $education, profession: $profession, expertise: $expertise, term: $term, party: $party, constituency: $constituency) {
        QID 
        subject
        type
        questionBy{
            MID
            name
        }
        ministry
        date
    }
}`

export function getQuestionById(id : number){
    return async (dispatch:any) => {
        try {
            const variables = {id}
            const {data} = await client.query({query : questionQuery, variables});
            console.log("data : " , data)
            dispatch(questionActions.setQuestion(data.question))
        } catch (error) {
            console.error(error)
        }
    }
};



      