import { GET_ARTICLE } from '../actions';

export default (state={}, action) => {
  switch (action.type) {
    case GET_ARTICLE: return action.payload.data;
    default: return state;
  }
}
