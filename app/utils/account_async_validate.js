import axios from 'axios';
const VALIDATE_URL = '/api/accounts/validate';

export default (values) => {
	return axios.post(VALIDATE_URL, { email: values.email })
		.then(accounts => {
			if (accounts.data.length > 0) {
				throw { email: 'Email đã tồn tại' };
			}
		})
}
