import React from 'react';
import Loading from 'react-loading-animation';
import { connect } from 'react-redux';
import { fetchPosts, getArticleList } from '../actions';
import Search from './Search';
import PostList from './PostList';
import ArticleList from './ArticleList';

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchPosts();
		this.props.getArticleList();
	}
	renderPostLists() {
		if (!this.props.posts.data || !this.props.articles.data) {
			return <Loading />;
		}
		return (
			<div>
				<PostList type="sales" title="Nhà đất bán" posts={this.props.posts.data.filter(post => post.type == "Bán")}/>
				<PostList type="rents" title="Nhà đất cho thuê" posts={this.props.posts.data.filter(post => post.type == "Cho thuê")}/>
				<ArticleList articles={this.props.articles.data} />
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

const mapStateToProps = ({posts, articles}) => {
	return { posts, articles }
}

export default connect(mapStateToProps, { fetchPosts, getArticleList })(Home);
