import { gql } from 'apollo-boost';
import { client } from './client.apollo';
import { constituencyActions, questionActions } from '../actions';
import { memberWithVariablesQuery } from './members.apollo';
import { questionsByVariablesQuery } from './question.apollo';
import { typeConstituencyData, typeQuestionData, typeQuestionObject, AppActions } from '../../types';
import { Dispatch } from 'redux';

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
            let singleConstituency:typeConstituencyData = {CID : 0, name : '', state : '' , members : [{ MID : 0 , name : '' , terms : [{ party : { PID : 0 , name : ''}, session : 0}]}] };
            const variables = {
                id 
            };
            const {data} = await client.query({query : constituencyQuery, variables});
            singleConstituency = {...data.constituency};

            if(singleConstituency.CID){
                const variables = {constituency : [id]}
                const  {data}  = await client.query({query : memberWithVariablesQuery,variables});
                singleConstituency.members = data.members.nodes;
            };

            if(singleConstituency.CID){
                let questions:typeQuestionObject = {};
                const variables = {constituency : [singleConstituency.CID]}
                const {data} = await client.query({query : questionsByVariablesQuery, variables});
                singleConstituency.popularQuestionIds = data.questions.nodes.map((each : typeQuestionData) => each.QID);
                if(singleConstituency.popularQuestionIds)
                    singleConstituency.popularQuestionIds
                        .map(( id:number ) => 
                            questions[id] = data.questions.nodes
                                .find(( each : typeQuestionData ) => 
                                    id === each.QID
                                )
                        );
                dispatch(questionActions.setPopularQuestions(questions));
            }

            dispatch(constituencyActions.setConstituency(singleConstituency))
        } catch (error) {
            console.error(error)
        }
    }
    
}