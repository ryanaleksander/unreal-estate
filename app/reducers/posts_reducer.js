import { FETCH_POSTS, SEARCH_POST } from '../actions';

export default (state=[], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case SEARCH_POST:
      return action.payload
    default:
      return state;
  }
}
