import { POST_MATCH } from '../actions/index.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case POST_MATCH:
      return action.payload.data ;
    default:
      return state;
  }
}
