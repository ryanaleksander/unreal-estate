import React from 'react';
import { Link } from 'react-router';

export default class Page404 extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="error-template">
							<h1>
								Oops!</h1>
							<h2>
								404 Not Found</h2>
							<div className="error-details">
                Có lỗi xảy ra, trang bạn tìm kiềm không tồn tại
							</div>
							<div className="error-actions">
								<Link href="/" className="btn btn-primary btn-raised btn-lg">
                  Quay về trang chủ
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
