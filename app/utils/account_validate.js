const validate = values => {
	const errors = {};
	if (!values.name) {
		errors.name = "Tên không được để trống";
	}

	if (!values.email) {
		errors.email = "Email không được để trống";
	} else if (!values.email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
		errors.email = "Email không hợp lệ";
	}
	if (!values.phone) {
		errors.phone = "Số điện thoại không được để trống";
	}

	if (!values.password) {
		errors.password = "Mật khẩu không được để trống";
	} else if (!values.password.match(/^(?!.* ).{8,}/)) {
		errors.password = "Mật khẩu phải dài ít nhất 8 ký tự và không chứa khoảng trắng";
	}

	if (!(values.password === values.confirm)) {
		errors.confirm = "Mật khẩu xác nhận không khớp";
	}

	if (!values.address) {
		errors.address = "Địa chỉ không được để trống";
	}
	return errors;
}

export default validate;
