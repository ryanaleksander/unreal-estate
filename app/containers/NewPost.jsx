import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { browserHistory } from 'react-router'

import NewPostForm from '../components/NewPostForm';
import postValidate from '../utils/post_validate';
import { getAccommodationTypes, submitNewPost, newPostFailuer, newPostSuccess } from '../actions';

const mapStateToProps = (state) => {
	return {
		accommodationTypes: state.postData.accommodationTypes,
		units: state.postData.units,
		account: state.account.account,
		initialValues: { account: state.account.account, type: 'sales', accommodation: "580ffa216763d3100896f4d4", unit: "VND" }
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		post: (post, dispatch) => {
			return new Promise((resolve, reject) => {
				dispatch(submitNewPost(post))
					.then((response) => {
						console.log(response.payload)
						if (response.payload.status != 200) {
							dispatch(newPostFailure())
							reject(response.payload.data)
						} else {
							console.log(response.payload)
							dispatch(newPostSuccess(response.payload.data))
							browserHistory.push(`/posts/${response.payload.data._id}/${response.payload.data.slug}`)
							resolve()
						}
					})
				});
		},
		getAccommodationTypes: () => { dispatch(getAccommodationTypes()); }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: 'newPostForm',
	validate: postValidate
})(NewPostForm));
