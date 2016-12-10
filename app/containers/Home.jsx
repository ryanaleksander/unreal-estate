import React from 'react';
import Loading from 'react-loading-animation';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import Search from './Search';
import PostList from './PostList';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchPosts();
	}
	renderPostLists() {
		if (!this.props.posts.data) {
			return <Loading />;
		}
		return (
				<div>
					<PostList type="sales" title="Nhà đất bán" posts={this.props.posts.data.filter(post => post.type == "Bán")}/>
					<PostList type="rents" title="Nhà đất cho thuê" posts={this.props.posts.data.filter(post => post.type == "Cho thuê")}/>
				</div>
		);
	}
	render() {
		return (
			<div className="">
					<Search />
					{this.renderPostLists()}
			</div>
		)
	}
}

const mapStateToProps = ({posts}) => {
	return { posts }
}

export default connect(mapStateToProps, { fetchPosts })(Home);
