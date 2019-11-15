import {typeMarks} from '../../types';

const initialState: typeMarks = {
    marksAge : [],
    marksTerm : []
};

initialState.marksAge = [
    {
    value: 25,
    label: 'Min',
    },
    {
    value: 40,
    label: '40',
    },
    {
    value: 60,
    label: '60',
    },
    {
    value: 80,
    label: '80',
    },
    {
    value: 100,
    label: 'Max',
    },
];

initialState.marksTerm = [
    {
        value: 1,
        label: '1',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 5,
        label: '5',
    },
    {
        value: 7,
        label: '7',
    },
    {
        value: 9,
        label: '9',
    }
]

function marks(state = initialState, action : {type : string}) {
    switch (action.type) {
      default:
        return state;
    }
  }
  
  export default marks;