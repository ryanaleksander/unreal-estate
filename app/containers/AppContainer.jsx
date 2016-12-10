import { connect } from 'react-redux';
import cookie from 'react-cookie';

import App from '../components/App';
import { meFromToken, meFromTokenFailure, meFromTokenSuccess, resetToken } from '../actions';

const mapDispatchToProps = (dispatch) => {
	return {
		loadAccountFromToken: () => {
			let token = cookie.load('jwtToken');
			if (!token || token === '' ) {
				return;
			}

			dispatch(meFromToken(token))
				.then((response) => {
					if (!response.error) {
						cookie.save('jwtToken', response.payload.data.token)
						dispatch(meFromTokenSuccess(response.payload));
					} else {
						cookie.remove('jwtToken');
						dispatch(meFromTokenFailure(response.payload));
					}
				});
		},
		resetMe: () => { 
			cookie.remove('jwtToken');
			dispatch(resetToken());
		}
	}
}

export default connect(null, mapDispatchToProps)(App);
