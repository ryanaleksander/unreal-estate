import React from 'react';
import {Route, IndexRoute} from 'react-router';

import AppContainer from './containers/AppContainer';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import NewPost from './containers/NewPost';
import PostDetail from './containers/PostDetail';
import Page404 from './components/Page404';
import SearchResult from './containers/SearchResult';

export default (
	<Route path='/' component={AppContainer}>
		<IndexRoute component={Home} />
		<Route path='/search/:type/:term' component={SearchResult} />
		<Route path='/register' component={Register} />
		<Route path='/login' component={Login} />
		<Route path='/posts/new' component={NewPost} />
		<Route path='/posts/:id/:slug' component={PostDetail} />
		<Route path='/404NotFound' component={Page404} />
		<Route path='*' component={Page404} />
	</Route>
);
