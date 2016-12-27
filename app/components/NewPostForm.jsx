import React from 'react';
import { Field } from 'redux-form';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import FileInput from './FileInput';

class NewPostForm extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.getAccommodationTypes();
		if (!cookie.load('jwtToken')) {
			this.context.router.push('/login');
		}
	}

	renderField({ input, type, placeholder, id, className, required, meta: {asyncValidating, touched, error}}){
		return (
			<div className={asyncValidating ? 'asyncValidating' : ''}>
				<input {...input} type={type} placeholder={placeholder} id={id} className={className} required={required} />
				{ touched && error && <span className="text-danger">{error}</span> }
			</div>
		);
	}

	renderTextArea({ input, rows, placeholder, id, className, required, meta: {asyncValidating, touched, error}}){
		return (
			<div className={(asyncValidating ? 'asyncValidating' : '') + (error ? ' has-error' : '')}>
				<textarea {...input} rows={rows} placeholder={placeholder} id={id} className={className} required={required} />
				{ touched && error && <span className="text-danger">{error}</span> }
			</div>
		);
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		return (
			<div className="new-post-form panel panel-primary">
				<div className="panel-heading">
					<h4 className="panel-title">Bài đăng mới</h4>
				</div>
				<div className="panel-content">
					<form onSubmit={handleSubmit(this.props.post.bind(this))} className="form-horizontal" id="register-form" encType="multipart/form-data">
						<fieldset>
							<legend>Thông tin cần thiết</legend>
							<div className="row">
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-title">Tựa đề</label>
									<div className="col-md-9">
										<Field component={ this.renderField } className="form-control" type="text" id="input-title" placeholder="Tựa đề" name="title" required="true"/>
									</div>
								</div>
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-address">Địa chỉ</label>
									<div className="col-md-9">
										<Field component={ this.renderField } className="form-control" type="text" id="input-address" placeholder="Địa chỉ" name="address" required="true"/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-area">Diện tích</label>
									<div className="col-md-9">
										<Field component={ this.renderField } className="form-control" type="number" id="input-area" placeholder="Diện tích" name="area" required="true"/>
									</div>
								</div>
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-accommodation">Loại nhà đất</label>
									<div className="col-md-9">
										<Field component="select" className="form-control" id="input-accommodation" name="accommodation">
											{ this.props.accommodationTypes.map(type => <option key={type.key} value={type._id}>{type.name}</option>) }
										</Field>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-price">Giá</label>
									<div className="col-md-9">
										<Field component={ this.renderField } className="form-control" type="number" id="input-price" placeholder="Giá" name="price"/>
									</div>
								</div>
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-unit">Đơn vị</label>
									<div className="col-md-9">
										<Field component="select" className="form-control"id="input-unit" name="unit">
											{ this.props.units.map(unit => <option key={unit} value={unit}>{unit}</option>) }
										</Field>
									</div>
								</div>
							</div>
							<br/>
							<div className="row">
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-floors">Số tầng</label>
									<div className="col-md-9">
										<Field component={ this.renderField } className="form-control" type="number" id="input-floors" placeholder="Số tầng" name="floors" required="true"/>
									</div>
								</div>
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-toilets">Số toilet</label>
									<div className="col-md-9">
										<Field component={ this.renderField } className="form-control" type="number" id="input-toilets" placeholder="Số toilet" name="toilets" required="true"/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-bedrooms">Số phòng ngủ</label>
									<div className="col-md-9">
										<Field component={ this.renderField } className="form-control" type="number" id="input-bedrooms" placeholder="Số phòng ngủ" name="bedrooms" required="true"/>
									</div>
								</div>
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label">Loại bài đăng</label>
									<div className="col-md-9">
										<div className="radio radio-primary">
											<label>
												<Field component="input" type="radio" name="type" id="sales-radio" value="sales" required/>
												Nhà đất bán
											</label>
										</div>
										<div className="radio radio-primary">
											<label>
												<Field component="input" type="radio" name="type" id="rent-radio" value="rent" />
												Nhà đất cho thuê
											</label>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-image">Hình ảnh</label>
									<Field type="file" name="image" component={FileInput} />
									<div className="input-group col-md-9">
										<input type="text" readOnly="" className="form-control" placeholder="Hình ảnh" />
										<span className="input-group-btn input-group-sm">
											<button type="button" className="btn btn-fab btn-fab-mini">
												<i className="material-icons">attach_file</i>
											</button>
										</span>
									</div>
								</div>
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-video">Video</label>
									<div className="col-md-9">
										<Field component={ this.renderField } className="form-control" type="text" id="input-video" placeholder="video" name="video" required="false"/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="form-group col-md-6">
									<label className="col-md-3 control-label" htmlFor="input-description">Mô tả</label>
									<div className="col-md-9">
										<Field component={ this.renderTextArea } className="form-control" rows="5" id="input-description" placeholder="Mô tả" name="description" required="true"/>
									</div>
								</div>
								<div className="form-group col-md-6">
									<div className="col-md-2 col-md-offset-8">
										<button type="submit" className="btn btn-raised btn-primary" disabled={ pristine || submitting }>Đăng bài</button>
									</div>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		)
	}
}

NewPostForm.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default NewPostForm;
