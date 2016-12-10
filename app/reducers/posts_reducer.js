import { FETCH_POSTS, GET_POST } from '../actions';

export default (state=[], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
      break;
    default:
      return state;
  }
}
