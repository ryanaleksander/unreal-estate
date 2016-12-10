import React from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading-animation';

import { getPost } from '../actions';

class PostDetail extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.getPost(this.props.params.slug);
	}

	render() {
		if (!this.props.post )  {
			<Loading />
		}

		console.log(this.props.post);
		return (
			<div className="panel-primary">
				<div className="panel-heading">
					<h4 className="panel-title">{this.props.post.title}</h4>
				</div>
				<div className="panel-content">
					<ul className="nav nav-tabs">
						<li><a href="#" data-toggle="tab">Image</a></li>
						<li><a href="#" data-toggle="tab">Video</a></li>
						<li><a href="#" data-toggle="tab">Details</a></li>
					</ul>
				</div>
			</div>
		)
	}
}

let mapStateToProps = (state) => {
	return {post: state.post}
}


export default connect(mapStateToProps, { getPost })(PostDetail);
