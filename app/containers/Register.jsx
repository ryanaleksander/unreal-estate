import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import RegisterForm from '../components/RegisterForm';
import asyncAccountValidate from '../utils/account_async_validate';
import accountValidate from '../utils/account_validate';
import { registerAccount, registerSuccess, registerFailure } from '../actions';

const register = (values, dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(registerAccount(values))
			.then(response => {
				let data = response.payload.data;
				if (response.payload.status != 200) {
					dispatch(registerFailure(response.payload))
					reject(data);
				} else {
					sessionStorage.setItem('jwtToken', response.payload.data.token);
					dispatch(registerSuccess(response.payload.data.account));
					resolve();
					browserHistory.push('/');
				}
			})
	}) 
}

const mapDispatchToProps = (dispatch) => {
	return {
		register 
	}
}

const mapStateToProps = (state) => {
	return {
		account: state.account
	}
}

export default connect(null, mapDispatchToProps)(reduxForm({
	form: 'registerForm',
	asyncValidate: asyncAccountValidate,
	validate: accountValidate,
	asyncBlurFieds: ['email']
}, mapStateToProps, { register })(RegisterForm));
