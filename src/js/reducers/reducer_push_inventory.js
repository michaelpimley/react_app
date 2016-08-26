import { PUSH_INVENTORY } from '../actions/index.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case PUSH_INVENTORY:
      return action.payload;
    default:
      return state;
  }
}
