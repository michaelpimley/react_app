import { GET_GEOCODE } from '../actions/index.js';

const INITIAL_STATE = [];

export default function(state = INITIAL_STATE, action){
  switch(action.type) {
    case GET_GEOCODE:
      return action.payload.data ;
    default:
      return state;
  }
}
