import React from 'react';
import {Route, IndexRoute} from 'react-router';

import AppContainer from './containers/AppContainer';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import NewPost from './containers/NewPost';
import PostDetail from './containers/PostDetail';

export default (
	<Route path='/' component={AppContainer}>
		<IndexRoute component={Home} />
		<Route path='/register' component={Register} />
		<Route path='/login' component={Login} />
		<Route path='/posts/new' component={NewPost} />
		<Route path='/posts/:slug' component={PostDetail} />
	</Route>
);
