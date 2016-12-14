import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import { resetToken } from '../actions';

class Header extends React.Component {
	constructor() {
		super();
	}

	renderUser() {
		if (!this.props.account.account) {
			return (
				<li className="dropdown">
					<Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
					>User<b className="caret"></b></Link>
					<ul className="dropdown-menu">
						<li>
							<Link to="/register">Đăng ký</Link>
							<Link to="/login">Đăng nhập</Link>
						</li>
					</ul>
				</li>
			)
		} else {
			return (
				<li className="dropdown">
					<Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
					>{this.props.account.account.name}<b className="caret"></b></Link>
					<ul className="dropdown-menu">
						<li>
							<Link to="#" onClick={this.props.resetMe.bind(this)}>Đăng xuất</Link>
							<Link to="/posts/new">Đăng bài mới</Link>
						</li>
					</ul>
				</li>
			)
		}
	}

	render() {
		return (
			<div className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse"
								data-target=".navbar-responsive-collapse" >
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/">Unreal Estate</Link>
					</div>
					<div className="collapse navbar-collapse navbar-responsive-collapse">
						<ul className="nav navbar-nav">
							<li className="dropdown">
								<Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
										>Nhà bán<b className="caret"></b></Link>
								<ul className="dropdown-menu">
									<li>
										<Link to="#">Bán biệt thự</Link>
										<Link to="#">Bán căn hộ chung cư</Link>
										<Link to="#">Bán nhà riêng</Link>
										<Link to="#">Bán đất nền</Link>
										<Link to="#">Bán các loại bất động sản khác</Link>
									</li>
								</ul>
							</li>
							<li className="dropdown">
								<Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
										>Nhà cho thuê<b className="caret"></b></Link>
								<ul className="dropdown-menu">
									<li>
										<Link to="#">Cho thuê căn hộ chung cư</Link>
										<Link to="#">Cho thuê nhà riêng</Link>
										<Link to="#">Cho thuê nhà trọ</Link>
										<Link to="#">Cho thuê văn phòng</Link>
										<Link to="#">Cho thuê các loại bất động sản khác</Link>
									</li>
								</ul>
							</li>
							<li className="dropdown">
								<Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
										>Tin tức<b className="caret"></b></Link>
								<ul className="dropdown-menu">
									<li>
										<Link to="#">Tin thị trường</Link>
										<Link to="#">Tin quy hoạch</Link>
										<Link to="#">Chính sách - Quy định</Link>
									</li>
								</ul>
							</li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							{this.renderUser()}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		account: state.account
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		resetMe: () => {
			cookie.remove('jwtToken');
			dispatch(resetToken());
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
