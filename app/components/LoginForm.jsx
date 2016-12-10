import React from 'react';
import { Field } from 'redux-form';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
	}

	renderField({ input, type, placeholder, id, className, meta: {asyncValidating, touched, error}}) {
		return (
			<div>
				<input {...input} type={type} placeholder={placeholder} id={id} className={className} required />
				{ touched && error && <span className="text-danger">{error}</span> }
			</div>
		);
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<div className="login-form panel panel-primary">
				<div className="panel-heading">
					<h4 className="panel-title">Đăng nhập</h4>
				</div>
				<div className="panel-content">
					<form onSubmit={handleSubmit(this.props.login.bind(this))} className="form-horizontal" id="login-form">
						<div className="form-group">
							<label htmlFor="email-input" className="control-label col-md-2">Email</label>
							<div className="col-md-10">
								<Field component={this.renderField}className="form-control" type="email" name="email" id="email-input"/>
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="password-input" className="control-label col-md-2">Mật Khẩu</label>
							<div className="col-md-10">
								<Field component={this.renderField} className="form-control" type="password" name="password" id="password-input"/>
							</div>
						</div>
						<div className="form-group">
							<div className="col-md-2 col-md-offset-8">
								<button type="submit" className="btn btn-raised btn-primary" disabled={ pristine || submitting }>Đăng Nhập</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default LoginForm;
