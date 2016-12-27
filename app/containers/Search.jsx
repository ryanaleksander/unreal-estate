import React from 'react';
import { connect } from 'react-redux';

class Search extends React.Component {
	constructor() {
		super();

		this.state = {
			searchType: 1,
			searchTerm: ''
		}
	}

	onTypeSelect(event) {
		this.setState({ searchType: (event.target.id == "sales" ? 1 : 2) });
	}

	onSearchChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	onSearchSubmit(event) {
		this.context.router.push(`/search/${this.state.searchType}/${this.state.searchTerm.replace(" ", "-")}`);
	}


	render() {
		return (
			<div className="search container-fluid">
				<div id="search-form" className="jumbotron">
					<form	 method="post" className="form" onSubmit={this.onSearchSubmit.bind(this)}>
						<div className="row">
							<div className={"search-type col-sm-2 " + (this.state.searchType == 1 ? "active" : "")}><p id="sales" onClick={this.onTypeSelect.bind(this)}>BÁN</p></div>
							<div className={"search-type col-sm-2 " + (this.state.searchType == 2 ? "active" : "")}><p id="rent"  onClick={this.onTypeSelect.bind(this)}>CHO THUÊ</p></div>
							<input type="hidden" value={this.state.searchType} />
						</div>
						<div className="row">
							<div className="form-group label-placeholder col-sm-8">
								<label htmlFor="search-term" className="control-label">Từ khóa tìm kiếm</label>
								<input type="text" id="search-term" className="form-control" value={this.state.searchTerm} onChange={this.onSearchChange.bind(this)}/>
							</div>
							<div className="form-group col-sm-4">
								<input type="button" value="Tìm kiếm" className="btn btn-raised btn-primary btn-lg" id="search-submit" onClick={this.onSearchSubmit.bind(this)}/>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
		return { posts: state.posts }
}

Search.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Search);
