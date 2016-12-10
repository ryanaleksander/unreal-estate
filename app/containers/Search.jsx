import React from 'react';

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

	render() {
		return (
			<div className="search container-fluid">
				<div id="search-form" className="jumbotron">
					<form	 method="post" className="form">
						<div className="row">
							<div className={"search-type col-sm-2 " + (this.state.searchType == 1 ? "active" : "")}><p id="sales" onClick={this.onTypeSelect.bind(this)}>BÁN</p></div>
							<div className={"search-type col-sm-2 " + (this.state.searchType == 2 ? "active" : "")}><p id="rent"  onClick={this.onTypeSelect.bind(this)}>CHO THUÊ</p></div>
							<input type="hidden" value={this.state.searchType} />
						</div>
						<div className="row">
							<div className="form-group label-placeholder col-sm-8">
								<label htmlFor="search-term" className="control-label">Từ khóa tìm kiếm</label>
								<input type="text" id="search-term" className="form-control" value={this.state.searchTerm} onChange={this.onSearchChange.bind(this)} />
							</div>
							<div className="form-group col-sm-4">
								<input type="submit" value="Tìm kiếm" className="btn btn-raised btn-primary btn-lg" id="search-submit"/>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default Search;
