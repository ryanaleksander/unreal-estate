import { GET_POST } from '../actions';

export default (state={}, action) => {
	switch(action.type) {
		case GET_POST:
			return action.payload;
			break;
		default:
			return state;
	}
}
