import { STORE_TOKEN, REMOVE_TOKEN } from '../actions';

const INITIAL_STATE = { 'token': null };

export default function(state=INITIAL_STATE, action) {
	switch(action.type) {
		case STORE_TOKEN: return { 'token': action.payload }
		case REMOVE_TOKEN: return { 'token': null }
		default: return state;
	}
}
