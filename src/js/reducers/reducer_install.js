import { GET_INSTALL } from '../actions/index.js';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case GET_INSTALL:
      return action.payload.data ;
    default:
      return state;
  }
}
