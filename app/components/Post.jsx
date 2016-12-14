import React from 'react';
import moment from 'moment';
import numeral from 'numeral';
import { Link } from 'react-router';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="post list-group-item" key={this.props.slug}>
          <div className="row-picture">
            <img className="circle" src={`/img/${this.props.image.filename}`} alt={this.props.title} />
          </div>
          <div className="row-content">
            <h4 className="list-group-item-heading"><Link href={`/posts/${this.props._id}/${this.props.slug}`}>{this.props.title}</Link></h4>
            <p className="list-group-item-text">
              <strong><u>{this.props.accommodationType.name}</u></strong>&emsp;<strong>Phòng ngủ:</strong> {this.props.bedrooms}&emsp;<strong>Toilet:</strong>
               {this.props.toilets}&emsp;<strong>{numeral(this.props.price).format('0,0')} {this.props.unit}</strong>
               &emsp;{moment(this.props.publishedDate).format('DD-MM-YYYY')}
            </p>
          </div>
      </div>
    )
  }
}
