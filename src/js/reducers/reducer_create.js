import { PUSH_CREATE } from '../actions/index.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case PUSH_CREATE:
      return action.payload;
    default:
      return state;
  }
}
