import { GET_ACCOMMODATION_TYPES } from '../actions';

const INITIAL_STATE = { accommodationTypes: [], units: ['VND', 'VND/tháng', 'VND/m2'] }

export default (state=INITIAL_STATE, action) => {
	switch(action.type) {
		case GET_ACCOMMODATION_TYPES: return { ...state, accommodationTypes: action.payload.data }
		default: return state;
	}
}
