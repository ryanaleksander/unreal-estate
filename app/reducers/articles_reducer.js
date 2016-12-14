import { GET_ARTICLE_LIST } from '../actions';

export default (state=[], action) => {
  switch (action.type) {
    case GET_ARTICLE_LIST: return action.payload;
    default: return state;
  }
}
