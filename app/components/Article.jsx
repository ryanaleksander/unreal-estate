import React from 'react';
import { Link } from 'react-router';

export default class Article extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="article list-group-item" key={this.props.slug} style={{ marginTop: "10px"}}>
        <div className="row-content">
          <h4 className="list-group-item-heading"><Link href={`/news/${this.props.slug}`}>{this.props.title}</Link></h4>
          <p className="list-group-item-text">
            <div dangerouslySetInnerHTML={{__html: this.props.content.brief}} class="brief"/>
          </p>
        </div>
      </div>
    )
  }
}
