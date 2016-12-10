export default values => {
	let errors = {};
	
	if (!values.title) {
		errors.title = "Tựa đề không được để trống";
	}

	if (!values.address) {
		errors.address = "Địa chỉ không được để trống";
	}

	if (!values.area) {
		errors.area = "Diện tích không được để trống";
	}

	if (!values.price) {
		errors.price = "Giá không được để trống";
	}

	if (values.price <= 0) {
		errors.price = "Giá phải là giá trị nguyên dương";
	}
	
	if (!values.floors) {
		errors.floors = "Số tầng không được để trống";
	}

	if (!values.bedrooms) {
		errors.bedrooms = "Số phòng ngủ không được để trống";
	}

	if (values.floors <= 0) {
		errors.floors = "Số tầng phải là giá trị nguyên dương";
	}

	if (values.bedrooms <= 0) {
		errors.bedrooms = "Số phòng ngủ phải là giá trị nguyên dương";
	}
	
	if (!values.description) {
		errors.description = "Mô tả không được để trống";
	}

	if (values.video && values.video != "" && !values.video.match(/^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/)) {
		errors.video = "Phải là link Youtube hợp lệ";
	}
	
	return errors;
}
