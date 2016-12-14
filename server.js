import swig from 'swig';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match, browserHistory } from 'react-router';
import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import keystone from 'keystone';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import bb from 'express-busboy';

import reducers from './app/reducers';
import routes from './app/routes';

const COOKIE_SECRET = "secret";
const JWT_SECRET = "adfkadhjhq2reuio23o4u";
let app = express();
bb.extend(app, {
	upload: true,
	path: './public/img'
})
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

keystone.init({
	'name': 'Unreal Estate',
	'brand': 'Unreal Estate',
	'session': false,
	'updates': 'updates',
	'auth': true,
	'user model': 'User',
	'auto update': true,
	'cookie secret': COOKIE_SECRET,
	'admin path': 'admin',
	'wysiwyg images': true
});

keystone.import('models');

const Post = keystone.list('Post');
const Account = keystone.list('Account');
const AccommodationType = keystone.list('Accommodation');
const Article = keystone.list('Article');

app.get('/api/news/all', function(req, res, next) {
	Article.model.find()
		.exec()
		.then(articles => {
			if (articles) {
				res.json(articles);
			}
		});
});

app.get('/api/search/:type/:term', function(req, res, next) {
	let type = req.params['type'] == 1 ? 'Bán' : 'Cho thuê';

	Post.model.find({ type: type, slug: new RegExp(req.params['term'], 'i')})
		.exec()
		.then(posts => {
			res.json(posts);
		});
});

app.get('/api/news/:slug', function(req, res, next) {
	Article.model.findOne({ slug: req.params['slug']})
		.exec()
		.then(article => {
			console.log(article);
			res.status(200);
		})
})

app.get('/api/post/:slug', function(req, res, next) {
	Post.model.findOne({ slug : req.params['slug'] })
		.populate('author')
		.populate('accommodationType')
		.exec()
		.then(post => {
			if (!post) {
				res.status(404).json({ error: 'Post not found' });
			}
			post.author = getCleanUser(post.author);
			res.json(post);
		});
});

app.get('/api/accounts/:id', function(req, res, next) {
	Account.model.findOne({ _id: req.params['id'] })
		.exec()
		.then(account => {
			if (!account) {
				res.status(404).json({ error: 'Account not found' });
			}
			res.json(getCleanUser(account));
		});
})

app.post('/api/posts/new', function(req, res, next){
	console.log(req.files);
	var newPost = {};
	newPost.title = req.body.title;
	newPost.publishedDate = new Date();
	newPost.status = 'Active';
	newPost.type = req.body.type == 'sales' ? 'Bán' : 'Cho thuê';
	newPost.videoUrl = req.body.video;
	newPost.floors = req.body.floors;
	newPost.bedrooms = req.body.bedrooms;
	newPost.toilets = req.body.toiets;
	newPost.price = req.body.price;
	newPost.area = req.body.area;
	newPost.description = req.body.description;
	newPost.address = req.body.address;
	newPost.image = req.files.image;
	newPost.toilets = req.body.toilets;
	newPost.unit = req.body.unit;

	Account.model.find({ email: req.body.account })
		.exec()
		.then((account => {
			newPost.author = account[0];
			AccommodationType.model.find({ key: req.body.accommodation })
				.exec()
				.then(accommodation => {
					newPost.accommodationType = accommodation[0];
					newPost = Post.model( newPost );
					newPost.save(err => {
						if(err) {
							res.status(500);
						} else {
							res.json(newPost);
						}
					});
				})
		}));
});
app.get('/api/accommodation_types', function(req, res, next) {
	AccommodationType.model.find()
		.exec()
		.then((accommodationTypes) => {
			res.json(accommodationTypes);
		}, (err) => {
			return next(err);
		})
})

app.get('/api/posts', function(req, res, next) {
	Post.model.find()
		.exec()
		.then(function(posts) {
			res.json(posts);
		}, function(err) {
			return next(err);
		});
});

app.post('/api/accounts/validate', function(req, res, next) {
	Account.model.find({ email: req.body.email })
		.exec()
		.then(accounts => {
			res.json(accounts);
		}, err => {
			return next(err);
		});
});

app.post('/api/accounts/register', function(req, res, next) {
		let newAccount = Account.model({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			gender: req.body.gender === "male" ? "Nam" : "Nữ",
			address: req.body.address,
			phone: req.body.phone
		});

		newAccount.save(err => {
			if (err) {
				res.status(500);
			}
			res.json({
				account: getCleanUser(newAccount),
				token: generateToken(newAccount)
			});
		});
});

app.post('/api/login', function(req, res, next) {
	Account.model.findOne({ email: req.body.email })
		.exec((err, account) => {
			if (err) return res.status(500);
			if (!account) {
				return res.status(404).json({
					error: true,
					message: 'Tài khoản không tồn tại'
				});
			}
			bcrypt.compare(req.body.password, account.password, (err, valid) => {
				if (!valid) {
					return res.status(404).json({
						error: true,
						message: 'Mật khẩu không chính xác'
					});
				}
				let token = generateToken(account);
				res.json({
					account: getCleanUser(account),
					token: token
				});
			});
		});
});

app.get('/me/from/token', function(req, res, next) {
	let token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (!token) {
		return res.status(401).json({
			error: true,
			message: 'Unauthorized'
		})
	}

	jwt.verify(token, JWT_SECRET, function(err, account) {
		if (err) return res.status(500);
		Account.model.findById({ '_id': account._id }, (err, account) => {
			if (err) return res.status(500);

			res.json({
				account: getCleanUser(account),
				token: token
			});
		});
	});
});

app.use(function(req, res) {
	match({
		routes: routes,
		location: req.url
	}, function(err, redirectLocation, renderProps) {
		if (err) {
			res.status(500).send(err.message);
		} else if (redirectLocation) {
			res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
		} else if (renderProps) {
			var html = renderToString(
				<Provider store={createStoreWithMiddleware(reducers)}>
					{<RouterContext {...renderProps} />}
				</Provider>
			);
			var page = swig.renderFile('views/index.html', {
				html: html
			});
			res.status(200).send(page);
		} else {
			res.status(404).send('Page Not Found');
		}
	});
});

keystone.set('nav', {
	users: ['users', 'accounts'],
	news: 'articles',
	post: 'posts',
	categories: ['accommodations']
});
keystone.set('routes', app);


keystone.start();

const generateToken = (user) => {
	let u = {
		name: user.name,
		email: user.email,
		_id: user._id
	}

	return jwt.sign(u, JWT_SECRET, {
		expiresIn: 60 * 60 * 24
	});
}

const getCleanUser = (user) => {
	return {
		_id: user._id,
		name: user.name,
		email: user.email,
		phone: user.phone,
		address: user.address
	}
}

export default keystone;
