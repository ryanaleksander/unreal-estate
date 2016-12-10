const validate = values => {
	let errors = {};
	if (!values.email) {
		errors.email = "Email không được để trống";
	}

	if (!values.password) {
		errors.password = "Mật khẩu không được để trống";
	}

	return errors;
}

export default validate;
