import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import { loginAccount, loginFailure, loginSuccess } from '../actions';
import LoginForm from '../components/LoginForm';
import loginValidate from '../utils/login_validate';

const login = (values, dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch(loginAccount(values))
			.then((response) => {
				let data = response.payload.data;
				if (response.payload.status != 200) {
					dispatch(loginFailure(response.payload));
					reject(data);
				} else {
					cookie.save('jwtToken', response.payload.data.token);
					dispatch(loginSuccess(response.payload.data.account));
					browserHistory.push('/');
					resolve();
				}
			});
	});
}

const mapDispatchToProps = (dispatch) => {
	return { login }
}

const mapStateToProps = (state) => {
	return {
		account: state.account
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'loginForm',
	fields: ['email', 'password'],
	validate: loginValidate
})(LoginForm));
