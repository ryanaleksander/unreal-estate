import {
	LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, REGISTER_ACCOUNT, REGISTER_FAILURE, REGISTER_SUCCESS,
	ME_FROM_TOKEN, ME_FROM_TOKEN_FAILURE, ME_FROM_TOKEN_SUCCESS, RESET_TOKEN
} from '../actions';

const INITIAL_STATE = { account: null, error: null }

export default function(state=INITIAL_STATE, action) {
	let error;
	switch (action.type) {
		case ME_FROM_TOKEN: return {...state, account: null, error: null }
		case ME_FROM_TOKEN_SUCCESS: return { ...state, account: action.payload.data.account, error: null }
		case ME_FROM_TOKEN_FAILURE:
			error = action.payload.data || {message: action.payload.message}
			return { ...state, account: null, error: error }
		case RESET_TOKEN: return {...state, account: null, error: null}
		case REGISTER_ACCOUNT: return {...state, account: null, error: null }
		case REGISTER_SUCCESS: return {...state, account: action.payload, error: null }
		case REGISTER_FAILURE: 
			error = action.payload.data || { message: action.payload.message }
			return { ...state, account: null, error: error }
		case LOGIN_REQUEST: return {...state, account: null, error: null }
		case LOGIN_SUCCESS: return {...state, account: action.payload, error: null }
		case LOGIN_FAILURE:
			error = action.payload.data || { message: action.payload.message }
			return { ...state, account: null, error: error }
		default: return state
	}
}
