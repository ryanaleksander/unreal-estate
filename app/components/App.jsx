import React from 'react';
import Header from '../containers/Header';
import cookie from 'react-cookie';

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadAccountFromToken();
		}

	render() {
		return (
			<div className="app">
				<Header loadAccountFromToken={this.props.loadAccountFromToken}/>
				{this.props.children}
			</div>
		)
	}
}
