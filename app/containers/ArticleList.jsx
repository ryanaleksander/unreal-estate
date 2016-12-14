import React from 'react';

import Article from '../components/Article';

export default class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  		currentArticles: this.props.articles,
  	  page: 1,
  		pages: Math.floor(this.props.articles.length / 5)  + 1
	  }
  }

  renderArticles() {
    return this.state.currentArticles.map(article => {
      return (
        <div className="article-item" key={article.slug}>
          <Article {...article} />
          <div className="list-group-separator" />
        </div>
      )
    });
  }

	onPageClick(event) {
		let page = Number(event.target.text);
		this.setState({ page });
		this.setState({
			articles: this.props.articles.slice(5 * (page - 1), 5 * (page - 1) + 5)
		})
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
      <div className="article-list container">
        <div className="panel panel-primary post-list-panel">
					<div className="panel-heading">
						<h3 className="panel-title">Tin nhà đất</h3>
					</div>
					<div className="panel-content posts-panel">
						<div className="list-group">
							{this.renderArticles()}
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
