import React from 'react';
import { Field } from 'redux-form';

class RegisterForm extends React.Component {
	constructor(props) {
		super(props);
	}
	renderField({ input, type, placeholder, id, className, meta: {asyncValidating, touched, error}}){
		return (
			<div className={asyncValidating ? 'asyncValidating' : ''}>
				<input {...input} type={type} placeholder={placeholder} id={id} className={className} required />
				{ touched && error && <span className="text-danger">{error}</span> }
			</div>
		);
	}
	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<div className="register-form panel panel-primary">
				<div className="panel-heading">
					<h4 className="panel-title">Đăng ký</h4>
				</div>
				<div className="panel-content">
					<form onSubmit={handleSubmit(this.props.register.bind(this))} className="form-horizontal" id="register-form">
						<fieldset>
							<legend>Thông tin cần thiết</legend>
							<div className="form-group">
								<label className="col-md-2 control-label" htmlFor="input-name">Tên</label>
								<div className="col-md-10">
									<Field component={ this.renderField } className="form-control" type="text" id="input-name" placeholder="Tên" name="name"/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-2 control-label" htmlFor="input-email">Email</label>
								<div className="col-md-10">
									<Field component={ this.renderField } className="form-control" type="email" id="input-email" placeholder="Email" name="email"/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-2 control-label" htmlFor="input-phone">Số điện thoại</label>
								<div className="col-md-10">
									<Field component={ this.renderField } className="form-control" type="text" id="input-phone" placeholder="Số điện thoại" name="phone"/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-2 control-label" htmlFor="input-password">Mật khẩu</label>
								<div className="col-md-10">
									<Field component={ this.renderField } className="form-control" type="password" id="input-password" placeholder="Mật khẩu" name="password"/>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-2 control-label" htmlFor="input-confirm">Xác nhận mật khẩu</label>
								<div className="col-md-10">
									<Field component={ this.renderField } className="form-control" type="password" id="input-confirm" placeholder="Xác nhận mật khẩu" name="confirm"/>
								</div>
							</div>
							<br/>
							<legend>Thông tin bổ sung</legend>
							<div className="form-group">
								<label className="col-md-2 control-label">Giới tính</label>
								<div className="col-md-10">
									<div className="radio radio-primary">
										<label>
											<Field component="input" type="radio" name="gender" id="male-radio" value="male" required/>
											Nam
										</label>
									</div>
									<div className="radio radio-primary">
										<label>
											<Field component="input" type="radio" name="gender" id="female-radio" value="female" />
											Nữ
										</label>
									</div>
								</div>
							</div>
							<div className="form-group">
								<label className="col-md-2 control-label" htmlFor="input-address">Địa chỉ</label>
								<div className="col-md-10">
									<Field component={ this.renderField } className="form-control" type="text" id="input-address" placeholder="Địa chỉ" name="address"/>
								</div>
							</div>
							<div className="form-group">
								<div className="col-md-2 col-md-offset-8">
									<button type="submit" className="btn btn-raised btn-primary" disabled={ pristine || submitting }>Đăng ký</button>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		);
	}
}

export default RegisterForm;
