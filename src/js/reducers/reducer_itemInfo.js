import { GET_FULL_INFO } from '../actions/index.js';

const INITIAL_STATE = null;

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case GET_FULL_INFO:
      return action.payload.data.results;
    default:
      return state;
  }
}
