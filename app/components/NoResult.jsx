import React from 'react';
import { Link } from 'react-router';

export default class NoResult extends React.Component {
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
								Không tìm thấy kết quả nào</h2>
							<div className="error-details">
								Xin vui lòng thử từ khóa khác
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
