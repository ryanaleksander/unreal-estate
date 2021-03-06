import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './posts_reducer';
import AccountReducer from './account_reducer';
import TokenReducer from './token_reducer';
import PostDataReducer from './post_data_reducer';
import PostReducer from './post_reducer';
import ArticlesReducer from './articles_reducer';
import ArticleReducer from './article_reducer';

const rootReducer = combineReducers({
	posts: PostsReducer,
	form: formReducer,
	account: AccountReducer,
	token: TokenReducer,
	postData: PostDataReducer,
	post: PostReducer,
	article: ArticleReducer,
	articles: ArticlesReducer
});

export default rootReducer;
