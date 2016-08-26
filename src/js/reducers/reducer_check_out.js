import { PUSH_CHECK_OUT } from '../actions/index.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case PUSH_CHECK_OUT:
      return action.payload;
    default:
      return state;
  }
}
