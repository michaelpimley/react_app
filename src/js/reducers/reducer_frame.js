import { GET_FRAME } from '../actions/index.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case GET_FRAME:
      return action.payload.data ;
    default:
      return state;
  }
}
