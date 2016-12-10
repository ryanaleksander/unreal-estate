import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_POSTS = 'FETCH_POSTS';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_ACCOUNT = 'REGISTER_ACCOUNT';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';
export const STORE_TOKEN = 'STORE_TOKEN'; 
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const GET_ACCOMMODATION_TYPES = 'GET_ACCOMMODATION_TYPES';
export const NEW_POST_REQUEST = 'NEW_POST_REQUEST';
export const NEW_POST_FAILURE = 'NEW_POST_FAILURE';
export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS';
export const GET_POST = 'GET_POST';

const REGISTER_URL = '/api/accounts/register';
const LOGIN_URL = '/api/login';
const GET_POSTS_URI = '/api/posts';
const GET_ACCOMMODATION_TYPES_URL = '/api/accommodation_types';
const NEW_POST_URL = '/api/posts/new';
const GET_POST_URL = '/api/post/';

export const getPost = (slug) => {
	let post = axios.get(GET_POST_URL + slug)

	return {
		type: GET_POST,
		payload: post
	}
}

export const fetchPosts = () => {
	let posts = axios.get(GET_POSTS_URI);
	return {
		type: FETCH_POSTS,
		payload: posts
	}
}

export const registerAccount = (account) => {
	let data = axios.post(REGISTER_URL, account);
	return {
		type: REGISTER_ACCOUNT,
		payload: data
	}
}

export const registerFailure = (error) => {
	return {
		type: REGISTER_FAILURE,
		payload: error
	}
}

export const registerSuccess = (account) => {
	return {
		type: REGISTER_SUCCESS,
		payload: account
	}
}

export const loginAccount = (values) => {
	let data = axios.post(LOGIN_URL, values);
	return {
		type: LOGIN_REQUEST,
		payload: data
	}
}

export const loginSuccess = (account) => {
	return {
		type: LOGIN_SUCCESS,
		payload: account
	}
}

export const loginFailure = (error) => {
	return {
		type: LOGIN_FAILURE,
		payload: error
	}
}

export const meFromToken = (tokenFromStorage) => {
	const request = axios.get(`/me/from/token?token=${tokenFromStorage}`);

	return {
		type: ME_FROM_TOKEN,
		payload: request
	}
}

export const meFromTokenSuccess = (currentAccount) => {
	return {
		type: ME_FROM_TOKEN_SUCCESS,
		payload: currentAccount
	}
}

export const meFromTokenFailure = (error) => {
	return {
		type: ME_FROM_TOKEN_FAILURE,
		payload: error
	}
}

export const resetToken = () => {
	return {
		type: RESET_TOKEN
	}
}

export const storeToken = (token) => {
	return {
		type: STORE_TOKEN,
		payload: token
	}
}

export const removeToken = () => {
	return {
		type: REMOVE_TOKEN
	}
}

export const getAccommodationTypes = () => {
	let data = axios.get(GET_ACCOMMODATION_TYPES_URL);

	return {
		type: GET_ACCOMMODATION_TYPES,
		payload: data
	} 
}

export const submitNewPost = (post) => {
	let form = new FormData();
	console.log(post);
	form.append('title', post.title);
	form.append('image', post.image);
	form.append('address', post.address);
	form.append('price', post.price);
	form.append('toilets', post.toilets);
	form.append('floors', post.floors);
	form.append('unit', post.unit);
	form.append('description', post.description);
	form.append('bedrooms', post.bedrooms);
	form.append('accommodation', post.accommodation);
	form.append('type', post.type);
	form.append('account', post.account.email);
	form.append('area', post.area);
	let data = axios.post(NEW_POST_URL, form);
	return {
		type: NEW_POST_REQUEST,
		payload: data
	} 
}

export const newPostSuccess = (post) => {
	return { 
		type: NEW_POST_SUCCESS,
		payload: post
	}
}

export const newPostFailure = () => {
	return {
		type: NEW_POST_FAILURE
	}
}
