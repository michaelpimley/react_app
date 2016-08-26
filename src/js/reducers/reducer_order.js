import { GET_ORDER } from '../actions/index.js';

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case GET_ORDER:
      return action.payload.data ;
    default:
      return state;
  }
}
