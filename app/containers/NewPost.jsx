import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import NewPostForm from '../components/NewPostForm';
import postValidate from '../utils/post_validate';
import { getAccommodationTypes, submitNewPost } from '../actions';

const mapStateToProps = (state) => {
	return {
		accommodationTypes: state.postData.accommodationTypes,
		units: state.postData.units,
		account: state.account.account,
		initialValues: { account: state.account.account, type: 'sales' }
	}
}

const mapDispatchToProps = (dispatch) => {
	return { 
		post: (post) => {
			dispatch(submitNewPost(post));
		},
		getAccommodationTypes: () => { dispatch(getAccommodationTypes()); }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'newPostForm',
	validate: postValidate
})(NewPostForm));

