import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import {questionConstants} from '../constants';
import { memberWithVariablesQuery } from './member.actions';
import { questionsByVariablesQuery } from './question.actions';
import { typeConstituencyData, typeQuestionData, typeQuestionObject, AppActions } from '../../types';
import { Dispatch } from 'redux';
import {constituencyConstants} from '../constants';

export const constituencyQuery  = gql`
query($id : Int!){
    constituency(id: $id) {
    CID
    name
    state
    from 
    to
    }
}`    

export function getConstituencyById(id : number) {
    return async (dispatch: Dispatch<AppActions>) => {
        try {
            let constituency:typeConstituencyData = {CID : 0, name : '', state : '' , members : [{ MID : 0 , name : '' , terms : [{ party : { PID : 0 , name : '' , abbr : ''}, session : 0 , house : ''}]}] };
            const variables = {
                id 
            };
            const {data} = await client.query({query : constituencyQuery, variables});
            constituency = {...data.constituency};

            if(constituency.CID){
                const variables = {constituency : [id]}
                const  {data}  = await client.query({query : memberWithVariablesQuery,variables});
                constituency.members = data.members.nodes;
            };

            if(constituency.CID){
                let questions:typeQuestionObject = {};
                const variables = {constituency : [constituency.CID]}
                const {data} = await client.query({query : questionsByVariablesQuery, variables});
                constituency.popularQuestionIds = data.questions.nodes.map((each : typeQuestionData) => each.QID);
                if(constituency.popularQuestionIds)
                    constituency.popularQuestionIds
                        .map(( id:number ) => 
                            questions[id] = data.questions.nodes
                                .find(( each : typeQuestionData ) => 
                                    id === each.QID
                                )
                        );
                dispatch({type : questionConstants.SET_QUESTIONS, data : questions});
            }

            dispatch({type : constituencyConstants.SET_CONSTITUENCY , data : constituency})
        } catch (error) {
            console.error(error)
        }
    }
    
}