import React from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading-animation';

import { searchPost } from '../actions';
import Post from '../components/Post';
import NoResult from '../components/NoResult';

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      title: this.props.params.type == 1 ? 'Nhà đất bán' : 'Nhà đất cho thuê'
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
    this.props.searchPost(this.props.params.type, this.props.params.term);
	}

	renderPagination() {
		let rows = [];
		for (var i=1; i <= this.state.pages; i++) {
			rows.push(<li className={ this.state.page==i ? "active": "" } key={i}><a href="javascript:void(0)" onClick={this.onPageClick.bind(this)}>{i}</a></li>);
		}

		return rows;
	}

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
  		this.setState({
  			posts: nextProps.posts.slice(5 * (this.state.page - 1), 5 * (this.state.page - 1) + 5),
        currentPosts: this.props.posts,
  		  page: 1,
  			pages: Math.floor(nextProps.posts.length / 5)  + 1
  		})
    }
  }
  render() {
    if(!this.state.posts) {
      return <Loading />
    }

    if (this.props.posts.length <= 0) {
      return <NoResult />
    }

    return (
      <div className="search-list container" style={{ marginTop: "30px"}}>
        <div className="panel panel-primary post-list-panel">
					<div className="panel-heading">
						<h3 className="panel-title">{this.state.title}</h3>
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

const mapStateToProps = (state) => {
  return {
    posts: state.posts.data
  }
}

export default connect(mapStateToProps, { searchPost })(SearchResult);
