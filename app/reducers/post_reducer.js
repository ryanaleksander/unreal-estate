import { GET_POST, GET_POST_FAILURE, GET_POST_SUCCESS } from '../actions';

const INITIAL_STATE = { status: null, data: null, error: null}

export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_POST:
			return { status: "requesting", data: null, error: null};
		case GET_POST_FAILURE: return { status: "failure", data: null, error: '404'};
		case GET_POST_SUCCESS: return { status: "success", data: action.payload.data, error: null};
		default:
			return state;
	}
}
