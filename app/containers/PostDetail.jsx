import React from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading-animation';

import { getPost, getPostFailure, getPostSuccess } from '../actions';

class PostDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = { tab: 1 }
		this.renderPostContent = this.renderPostContent.bind(this);
	}

	componentWillMount() {
		this.props.getPost(this.props.params.slug);
	}

	onTabClick(event) {
		switch(event.target.id) {
			case 'image-tab': this.setState({ tab: 1}); break;
			case 'video-tab': this.setState({ tab: 2}); break;
			case 'details-tab': this.setState({ tab: 3 }); break;
		}
	}

	renderPostContent(post) {
		switch(this.state.tab) {
			case 1: return (
				<div className="post-content">
					<img src={`/img/${post.image.filename}`} style={{ maxWidth: "80%", maxHeight: "80%"}}/>
				</div>
			)
			case 2: return (
				<div className="post-content">
					<iframe width="640" height="480"
						src={`https://www.youtube.com/embed/${getId(post.videoUrl)}`} frameborder="0">
					</iframe>
				</div>
			)
			case 3: return (
				<div className="post-content">
					<div className="info" style={{border: "#337ab7 2px solid", width: "auto", height: "100px", marginLeft: "40px", marginRight: "40px"}}>
						<div className="account" style={{ float: "left", width: "40%", marginLeft: "40px", marginBottom: "20px", textAlign: "left"}}>
							<img className="circle" src="/img/user.png" style={{ width: "80px", height: "80px", float: "left", marginTop: "5px" }}/>
							<h3>{post.author.name}</h3>
							<h4><strong>SĐT:</strong> {post.author.phone}</h4>
						</div>
						<div className="post-info" style={{ float: "right", width: "50%", textAlign: "right", marginRight: "40px"}}>
							<br/>
							<span><strong>Diện tích:</strong> {post.area} m2</span>&emsp;
							<span><strong>Giá:</strong> {post.price} {post.unit}</span>
							<br/>
							<span><strong>Số phòng ngủ:</strong> {post.bedrooms}</span>&emsp;
							<span><strong>Số toilet:</strong> {post.toilets}</span>
							<br/>
							<span><strong>Địa chỉ:</strong> {post.address}</span>
						</div>
					</div>
					<div className="description" style={{textAlign: "justify", margin: "40px", clear: "both"}}>{post.description}</div>
				</div>
			)
		}
	}

	render() {
		if (this.props.post.error) {
			this.context.router.push('/404NotFound');
		}
		if (!this.props.post.data)  {
			return <Loading />
		}

		return (
			<div className="panel panel-primary detail-panel">
				<div className="panel-heading">
					<h3 className="panel-title">{this.props.post.data.title}</h3>
				</div>
				<div className="panel-content">
					<ul className="nav nav-tabs">
						<li className={ this.state.tab == 1 ? 'active': ''} ><a id="image-tab" onClick={this.onTabClick.bind(this)} href="#" data-toggle="tab">Hình ảnh</a></li>
						<li className={ this.state.tab == 2 ? 'active': ''} ><a id="video-tab" onClick={this.onTabClick.bind(this)} href="#" data-toggle="tab">Video</a></li>
						<li className={ this.state.tab == 3 ? 'active': ''} ><a id="details-tab" onClick={this.onTabClick.bind(this)} href="#" data-toggle="tab">Chi tiết</a></li>
					</ul>
					{this.renderPostContent(this.props.post.data)}
				</div>
			</div>
		)
	}
}

let mapStateToProps = (state) => {
	return {post: state.post}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getPost: (slug) => {
			dispatch(getPost(slug))
				.then(response => {
					if (response.payload.status != 200) {
						dispatch(getPostFailure());
					} else {
						dispatch(getPostSuccess(response.payload));
					}
				});
		}
	}
}

function getId(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
      return match[2];
  } else {
      return 'error';
  }
}

PostDetail.contextTypes = {
	router: React.PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
