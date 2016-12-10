import React from 'react';
import Post from '../components/Post';

export default class PostList extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			currentPosts: this.props.posts,
		  page: 1,
			pages: Math.floor(this.props.posts.length / 5)  + 1
	  }
  }

  renderPosts() {
    return this.state.posts.map(post => {
      return (
        <div className="post-item" key={post.slug}>
          <Post {...post} />
          <div className="list-group-separator" />
        </div>
      )
    });
  }

	onPageClick(event) {
		let page = Number(event.target.text);
		this.setState({ page });
		this.setState({
			posts: this.props.posts.slice(5 * (page - 1), 5 * (page - 1) + 5)
		})
	}

	componentWillMount() {
		this.setState({
			posts: this.props.posts.slice(5 * (this.state.page - 1), 5 * (this.state.page - 1) + 5)
		})

		console.log(this.props.posts);
	}

	renderPagination() {
		let rows = [];
		for (var i=1; i <= this.state.pages; i++) {
			rows.push(<li className={ this.state.page==i ? "active": "" } key={i}><a href="javascript:void(0)" onClick={this.onPageClick.bind(this)}>{i}</a></li>);
		}

		return rows;
	}
  render() {
    return (
      <div className="post-list container">
        <div className="panel panel-primary post-list-panel">
					<div className="panel-heading">
						<h3 className="panel-title">{this.props.title}</h3>
					</div>
					<div className="panel-content posts-panel">
						<div className="list-group">
							{this.renderPosts()}
						</div>
						<ul className="pagination posts-pagination">
							<li className={this.state.page == 1 ? "disabled" : ""}><a href="javascript:void(0)">«</a></li>
							{this.renderPagination()}
							<li className={this.state.page == this.state.pages ? "disabled" : ""}><a href="javascript:void(0)">»</a></li>
						</ul>
					</div>
				</div>
			</div>
	)
}
}

